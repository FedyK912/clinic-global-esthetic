import {
  motifLabel,
  timeslotLabel,
  type ReservationPayload,
} from "@/lib/reservation";
import { CONTACT, SITE_URL } from "@/lib/site";

/**
 * Construction des e-mails transactionnels : notification interne au cabinet
 * et accusé de réception client (FR/EN). HTML en tableaux avec styles inline,
 * seule mise en page fiable dans les clients e-mail.
 */

const LOGO_URL = `${SITE_URL}/images/logo-email.png`;

/* Palette des e-mails, alignée sur le design system du site */
const INK = "#2B2621";
const INK_SOFT = "#5D554A";
const INK_FAINT = "#8A7F70";
const PAPER = "#FDFBF8";
const PAPER_DIM = "#F4EEE3";
const LINE = "#E6DECF";
const GOLD = "#AD8A55";
const GOLD_TEXT = "#7A5E33";

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

function formatDateEn(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* Tableau récapitulatif partagé entre l'e-mail interne et l'accusé client */
function summaryTable(rows: [string, string][]): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; font-family:Arial,Helvetica,sans-serif; font-size:14px; background:${PAPER_DIM}; border:1px solid ${LINE}; border-radius:6px;">
      <tr><td style="padding:6px 18px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%;">
          ${rows
            .map(
              ([k, v], i) => `<tr>
            <td style="padding:10px 16px 10px 0; color:${INK_FAINT}; font-size:12px; letter-spacing:0.4px; text-transform:uppercase; white-space:nowrap; vertical-align:top; ${i ? `border-top:1px solid ${LINE};` : ""}">${k}</td>
            <td style="padding:10px 0; color:${INK}; ${i ? `border-top:1px solid ${LINE};` : ""}">${escapeHtml(v).replace(/\n/g, "<br>")}</td>
          </tr>`,
            )
            .join("")}
        </table>
      </td></tr>
    </table>`;
}

/* Signature commune : logo + coordonnées */
function signatureBlock(): string {
  return `
    <div style="border-top:1px solid ${LINE}; margin:30px 0 24px;"></div>
    <img src="${LOGO_URL}" alt="Clinic Global Esthetic · Meyrin, Genève" width="300" style="display:block; width:300px; max-width:100%; height:auto;">
    <p style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${INK_FAINT}; margin:14px 0 0; line-height:1.7;">
      Av. Louis-Casaï 71, 1216 Meyrin ·
      <a href="tel:${CONTACT.phone}" style="color:${GOLD_TEXT}; text-decoration:none;">${CONTACT.phoneDisplay}</a><br>
      <a href="${SITE_URL}" style="color:${GOLD_TEXT}; text-decoration:none;">globalaesthetic.ch</a>
    </p>`;
}

/* Enveloppe générale : fond crème, carte papier centrée */
function emailShell(inner: string): string {
  return `
  <div style="background:${PAPER_DIM}; padding:32px 12px; margin:0;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:580px; width:100%; margin:0 auto; background:${PAPER}; border:1px solid ${LINE}; border-radius:10px;">
      <tr><td style="padding:36px 38px 32px;">${inner}</td></tr>
    </table>
  </div>`;
}

/* ---------- Notification interne au cabinet ---------- */

export function buildEmail(data: ReservationPayload) {
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

  const html = emailShell(`
    <p style="font-family:'Courier New',monospace; font-size:12px; letter-spacing:2px; color:${GOLD_TEXT}; text-transform:uppercase; margin:0 0 6px;">Nouvelle demande de rendez-vous</p>
    <div style="height:2px; background:${GOLD}; width:48px; margin-bottom:22px;"></div>
    ${summaryTable(rows)}
    <p style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${INK_FAINT}; margin:18px 0 0;">Demande envoyée depuis le formulaire du site. Répondre à cet e-mail écrit directement à la cliente ou au client.</p>
    ${signatureBlock()}`);

  return { text, html };
}

/* ---------- Accusé de réception client (FR/EN) ---------- */

const MOTIF_EN: Record<string, string> = {
  consultation: "Free consultation",
  laser: "Laser hair removal",
  visage: "Facial treatment",
  corps: "Body treatment",
};
const TIMESLOT_EN: Record<string, string> = {
  indifferent: "No preference",
  matin: "Morning (9am–12pm)",
  midi: "Midday (12pm–2pm)",
  "apres-midi": "Afternoon (2pm–5pm)",
  "fin-de-journee": "End of day (5pm–7pm)",
};

export function buildAckEmail(payload: ReservationPayload) {
  const en = payload.locale === "en";
  const firstName = payload.name.trim();
  const motif = en ? (MOTIF_EN[payload.motif] ?? payload.motif) : motifLabel(payload.motif);

  const rows: [string, string][] = [[en ? "Reason" : "Motif", motif]];
  if (payload.service?.trim()) rows.push([en ? "Treatment" : "Soin souhaité", payload.service.trim()]);
  if (payload.date)
    rows.push([
      en ? "Preferred date" : "Date souhaitée",
      en ? formatDateEn(payload.date) : formatDateFr(payload.date),
    ]);
  if (payload.timeslot)
    rows.push([
      en ? "Preferred time" : "Créneau souhaité",
      en ? (TIMESLOT_EN[payload.timeslot] ?? payload.timeslot) : timeslotLabel(payload.timeslot),
    ]);

  const subject = en
    ? "Your appointment request | Clinic Global Esthetic"
    : "Votre demande de rendez-vous | Clinic Global Esthetic";

  const intro = en
    ? `We have received your request and thank you for your trust. We will get back to you personally within one business day to confirm a time together.`
    : `Nous avons bien reçu votre demande et vous remercions de votre confiance. Nous revenons vers vous personnellement sous un jour ouvré pour confirmer un horaire ensemble.`;

  const note = en
    ? `Please note: this request is not yet a confirmed appointment. For an immediate answer, feel free to call us during opening hours.`
    : `À noter : cette demande ne vaut pas encore confirmation de rendez-vous. Pour une réponse immédiate, vous pouvez nous appeler pendant les heures d'ouverture.`;

  const html = emailShell(`
    <p style="font-family:'Courier New',monospace; font-size:12px; letter-spacing:2px; color:${GOLD_TEXT}; text-transform:uppercase; margin:0 0 6px;">${en ? "Appointment request" : "Demande de rendez-vous"}</p>
    <div style="height:2px; background:${GOLD}; width:48px; margin-bottom:24px;"></div>
    <h1 style="font-family:Georgia,'Times New Roman',serif; font-weight:normal; font-size:24px; color:${INK}; margin:0 0 16px;">${en ? "Thank you" : "Merci"}, ${escapeHtml(firstName)}.</h1>
    <p style="font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.7; color:${INK_SOFT}; margin:0 0 24px;">${intro}</p>
    ${summaryTable(rows)}
    <p style="font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.7; color:${INK_FAINT}; margin:22px 0 0;">${note}</p>
    ${signatureBlock()}`);

  const text = en
    ? `Thank you, ${firstName}.\n\n${intro}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${note}\n\nClinic Global Esthetic\nAv. Louis-Casaï 71, 1216 Meyrin\n${CONTACT.phoneDisplay}\n${SITE_URL}`
    : `Merci, ${firstName}.\n\n${intro}\n\n${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${note}\n\nClinic Global Esthetic\nAv. Louis-Casaï 71, 1216 Meyrin\n${CONTACT.phoneDisplay}\n${SITE_URL}`;

  return { subject, text, html };
}
