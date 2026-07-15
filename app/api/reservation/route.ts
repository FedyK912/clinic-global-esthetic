import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  motifLabel,
  timeslotLabel,
  validateReservation,
  type ReservationPayload,
} from "@/lib/reservation";

export const runtime = "nodejs";

const CLINIC_EMAIL = process.env.RESERVATION_TO ?? "contact@clinicglobalestheticgeneva.ch";

// Limite anti-abus : 5 demandes / 10 minutes / IP (instance unique).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const PURGE_THRESHOLD = 500;
const hits = new Map<string, number[]>();

// Dernier élément de X-Forwarded-For : ajouté par le proxy de confiance le
// plus proche, contrairement au premier qui est forgeable par le client.
function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (!xff) return "local";
  const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] ?? "local";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > PURGE_THRESHOLD) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateFr(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("fr-CH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildEmail(data: ReservationPayload) {
  const rows: [string, string][] = [
    ["Motif", motifLabel(data.motif)],
    ["Soin souhaité", data.service?.trim() || "—"],
    ["Nom", data.name.trim()],
    ["E-mail", data.email.trim()],
    ["Téléphone", data.phone?.trim() || "—"],
    ["Date souhaitée", data.date ? formatDateFr(data.date) : "—"],
    ["Créneau souhaité", data.timeslot ? timeslotLabel(data.timeslot) : "—"],
    ["Message", data.message?.trim() || "—"],
  ];

  const text = rows.map(([k, v]) => `${k} : ${v}`).join("\n");

  const html = `
  <div style="font-family:Georgia,serif; color:#2E2A25; max-width:560px;">
    <p style="font-family:monospace; font-size:12px; letter-spacing:2px; color:#8C6E3F; text-transform:uppercase; margin:0 0 6px;">Clinic Global Esthetic — Demande de rendez-vous</p>
    <div style="height:2px; background:#AD8A55; width:48px; margin-bottom:18px;"></div>
    <table style="border-collapse:collapse; width:100%; font-family:Arial,sans-serif; font-size:14px;">
      ${rows
        .map(
          ([k, v]) => `<tr>
        <td style="padding:9px 14px 9px 0; color:#726A5F; white-space:nowrap; vertical-align:top; border-bottom:1px solid #E6DECF;">${k}</td>
        <td style="padding:9px 0; border-bottom:1px solid #E6DECF;">${escapeHtml(v).replace(/\n/g, "<br>")}</td>
      </tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif; font-size:12px; color:#A79C8D; margin-top:18px;">Demande envoyée depuis le formulaire du site.</p>
  </div>`;

  return { text, html };
}

export async function POST(request: Request) {
  let data: Partial<ReservationPayload>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot : un bot qui remplit ce champ reçoit un faux succès.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const errors = validateReservation(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }
  const payload = data as ReservationPayload;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // SMTP non configuré (voir .env.example) — le client bascule sur le repli mailto.
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 501 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const { text, html } = buildEmail(payload);
  const from = process.env.RESERVATION_FROM ?? SMTP_USER;

  try {
    await transporter.sendMail({
      from: `"Site Clinic Global Esthetic" <${from}>`,
      to: CLINIC_EMAIL,
      replyTo: payload.email.trim(),
      subject: `Demande de rendez-vous — ${motifLabel(payload.motif)} — ${payload.name.trim()}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[reservation] échec d'envoi SMTP:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // Accusé de réception au client, dans sa langue — sans faire échouer la
  // demande si indisponible.
  const ackLocale = payload.locale === "en" ? "en" : "fr";
  const MOTIF_EN: Record<string, string> = {
    consultation: "Free consultation",
    laser: "Laser hair removal",
    visage: "Facial treatment",
    corps: "Body treatment",
  };
  const ack =
    ackLocale === "en"
      ? {
          subject: "Your appointment request — Clinic Global Esthetic",
          text: `Hello ${payload.name.trim()},\n\nWe have received your appointment request (${
            MOTIF_EN[payload.motif] ?? payload.motif
          }). We will get back to you as soon as possible to confirm your slot.\n\nThis request is not yet a confirmed appointment.\n\nClinic Global Esthetic\nAv. Louis-Casaï 71, 1216 Meyrin\n(+41) 078 346 42 01`,
        }
      : {
          subject: "Votre demande de rendez-vous — Clinic Global Esthetic",
          text: `Bonjour ${payload.name.trim()},\n\nNous avons bien reçu votre demande de rendez-vous (${motifLabel(
            payload.motif,
          )}). Nous revenons vers vous dans les meilleurs délais pour confirmer le créneau.\n\nCette demande ne vaut pas confirmation.\n\nClinic Global Esthetic\nAv. Louis-Casaï 71, 1216 Meyrin\n(+41) 078 346 42 01`,
        };
  try {
    await transporter.sendMail({
      from: `"Clinic Global Esthetic" <${from}>`,
      to: payload.email.trim(),
      subject: ack.subject,
      text: ack.text,
    });
  } catch {
    // l'accusé de réception est optionnel
  }

  return NextResponse.json({ ok: true });
}
