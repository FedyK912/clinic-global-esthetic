import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildAckEmail, buildEmail } from "@/lib/email";
import { motifLabel, validateReservation, type ReservationPayload } from "@/lib/reservation";
import { CONTACT } from "@/lib/site";

export const runtime = "nodejs";

const CLINIC_EMAIL = process.env.RESERVATION_TO ?? CONTACT.email;

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
    // SMTP non configuré (voir .env.example) : le client bascule sur le repli mailto.
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
      subject: `Demande de rendez-vous · ${motifLabel(payload.motif)} · ${payload.name.trim()}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[reservation] échec d'envoi SMTP:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // Accusé de réception au client, dans sa langue, sans faire échouer la
  // demande si indisponible.
  const ack = buildAckEmail(payload);
  try {
    await transporter.sendMail({
      from: `"Clinic Global Esthetic" <${from}>`,
      to: payload.email.trim(),
      subject: ack.subject,
      text: ack.text,
      html: ack.html,
    });
  } catch {
    // l'accusé de réception est optionnel
  }

  return NextResponse.json({ ok: true });
}
