export const MOTIF_KEYS = ["consultation", "laser", "visage", "corps"] as const;
export type MotifKey = (typeof MOTIF_KEYS)[number];

/** Libellés français pour l'e-mail envoyé au cabinet. */
export const MOTIF_LABELS_FR: Record<MotifKey, string> = {
  consultation: "Consultation gratuite",
  laser: "Épilation laser",
  visage: "Soin du visage",
  corps: "Traitement du corps",
};

export const TIMESLOT_VALUES = [
  "indifferent",
  "matin",
  "midi",
  "apres-midi",
  "fin-de-journee",
] as const;
export type TimeslotValue = (typeof TIMESLOT_VALUES)[number];

/** Libellés français pour l'e-mail envoyé au cabinet. */
export const TIMESLOT_LABELS_FR: Record<TimeslotValue, string> = {
  indifferent: "Indifférent",
  matin: "Matin (9h–12h)",
  midi: "Midi (12h–14h)",
  "apres-midi": "Après-midi (14h–17h)",
  "fin-de-journee": "Fin de journée (17h–19h)",
};

export type ReservationPayload = {
  motif: MotifKey;
  name: string;
  email: string;
  phone?: string;
  date?: string;
  timeslot?: string;
  service?: string;
  message?: string;
  locale?: string; // "fr" | "en" : langue de l'accusé de réception
  website?: string; // honeypot anti-spam, doit rester vide
};

export function motifLabel(key: string): string {
  return MOTIF_LABELS_FR[key as MotifKey] ?? key;
}

export function timeslotLabel(value: string): string {
  return TIMESLOT_LABELS_FR[value as TimeslotValue] ?? value;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validation partagée client/serveur. Renvoie une map champ → clé d'erreur
 * (localisée côté client via le dictionnaire i18n). Les valeurs sont traitées
 * comme inconnues : un JSON arbitraire (nombre, tableau…) doit produire une
 * erreur 422, jamais un crash.
 */
export function validateReservation(
  data: Partial<Record<keyof ReservationPayload, unknown>>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  const isStr = (v: unknown): v is string => typeof v === "string";
  const isBlank = (v: unknown) => v === undefined || v === null || v === "";

  if (!isStr(data.motif) || !MOTIF_KEYS.includes(data.motif as MotifKey)) {
    errors.motif = "motif";
  }
  if (!isStr(data.name) || data.name.trim().length < 2 || data.name.trim().length > 120) {
    errors.name = "name";
  }
  if (!isStr(data.email) || !EMAIL_RE.test(data.email.trim()) || data.email.length > 254) {
    errors.email = "email";
  }
  if (!isBlank(data.phone) && (!isStr(data.phone) || data.phone.trim().length > 30)) {
    errors.phone = "phone";
  }
  if (!isBlank(data.date)) {
    const d = isStr(data.date) ? new Date(`${data.date}T12:00:00`) : new Date(NaN);
    if (Number.isNaN(d.getTime())) {
      errors.date = "date";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (d < today) errors.date = "date";
    }
  }
  if (
    !isBlank(data.timeslot) &&
    (!isStr(data.timeslot) || !TIMESLOT_VALUES.includes(data.timeslot as TimeslotValue))
  ) {
    errors.timeslot = "timeslot";
  }
  if (!isBlank(data.service) && (!isStr(data.service) || data.service.length > 80)) {
    errors.service = "service";
  }
  if (!isBlank(data.message) && (!isStr(data.message) || data.message.length > 2000)) {
    errors.message = "message";
  }

  return errors;
}
