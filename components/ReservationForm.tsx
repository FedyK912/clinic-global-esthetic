"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import {
  MOTIF_KEYS,
  TIMESLOT_VALUES,
  validateReservation,
  type MotifKey,
} from "@/lib/reservation";
import { CONTACT } from "@/lib/site";

const CLINIC_EMAIL = CONTACT.email;
const WHATSAPP = CONTACT.whatsapp;

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_ORDER = ["rdv-service", "rdv-date", "rdv-slot", "rdv-name", "rdv-email", "rdv-phone", "rdv-message"];

export default function ReservationForm({
  locale,
  t,
}: {
  locale: Locale;
  t: Dict["booking"];
}) {
  const [motif, setMotif] = useState<MotifKey | null>(null);
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeslot, setTimeslot] = useState("indifferent");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<string>("");
  const formSection = useRef<HTMLElement>(null);

  const today = new Date().toISOString().slice(0, 10);

  // Pré-sélection via l'URL (ex. /rendez-vous?motif=visage&service=HydraFacial)
  // pour les CTA contextuels des pages de soins.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("motif");
    if (m && (MOTIF_KEYS as readonly string[]).includes(m)) {
      setMotif(m as MotifKey);
      const s = params.get("service");
      if (s) setService(s);
    }
  }, []);

  const motifLabelLocal = (key: MotifKey) => t.motifs[key].label;

  const serviceOptions =
    motif === "visage" ? t.servicesVisage : motif === "corps" ? t.servicesCorps : null;

  const selectMotif = (key: MotifKey) => {
    setMotif(key);
    setService("");
    // guide l'utilisateur vers l'étape suivante
    requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      formSection.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const errMsg = (key: string) =>
    t.errors[key as keyof typeof t.errors] ?? t.errors.message;

  /** Props d'accessibilité d'un champ : erreur signalée et décrite. */
  const invalid = (key: string, id: string) =>
    errors[key]
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` }
      : {};

  const summaryText = () =>
    [
      motif && `${t.rail[0]} : ${motifLabelLocal(motif)}`,
      service && `${t.serviceLabel.replace(/ \(.*\)$/, "")} : ${service}`,
      `${t.nameLabel.replace(" *", "")} : ${name}`,
      `${t.emailLabel.replace(" *", "")} : ${email}`,
      phone && `${t.phoneLabel.replace(/ \(.*\)$/, "")} : ${phone}`,
      date && `${t.dateLabel} : ${date}`,
      timeslot !== "indifferent" && `${t.slotLabel} : ${t.slots[timeslot as keyof typeof t.slots]}`,
      message && `${t.messageLabel.replace(/ \(.*\)$/, "")} : ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

  const mailtoFallback = () =>
    `mailto:${CLINIC_EMAIL}?subject=${encodeURIComponent(
      `${t.mailSubject} — ${motif ? motifLabelLocal(motif) : ""}`,
    )}&body=${encodeURIComponent(`${summaryText()}\n`)}`;

  const whatsappFallback = () =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      `${t.whatsappIntro} ${motif ? motifLabelLocal(motif) : ""}.\n${summaryText()}`,
    )}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      motif: motif ?? undefined,
      service: service || undefined,
      name,
      email,
      phone: phone || undefined,
      date: date || undefined,
      timeslot,
      message: message || undefined,
      website,
      locale,
    };
    const clientErrors = validateReservation(payload);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      // amène le focus sur le premier champ en erreur
      const first = FIELD_ORDER.find((id) =>
        clientErrors[id.replace("rdv-", "")] !== undefined,
      );
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const body = await res.json().catch(() => ({}));
      setErrorKind(body?.error ?? "send_failed");
      if (body?.fields) setErrors(body.fields);
      setStatus("error");
    } catch {
      setErrorKind("network");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="rdv-flow">
        <div className="wrap">
          <div className="rdv-success">
            <div className="eyebrow">{t.sentEyebrow}</div>
            <h2>{t.sentTitle}</h2>
            <div className="form-status ok" role="status" style={{ marginTop: 20 }}>
              <p>{t.sentText1}</p>
              <p style={{ marginBottom: 0 }}>
                {t.sentText2} {email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const railState = (i: number): string => {
    if (i === 0) return motif ? "done" : "on";
    return motif ? "on" : "";
  };

  return (
    <>
      {/* ============ ÉTAPE 01 — MOTIF ============ */}
      <section className="rdv-flow" id="demande">
        <div className="wrap">
          <ol className="rdv-rail">
            {t.rail.map((label, i) => (
              <li key={label} className={railState(i)}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </li>
            ))}
          </ol>

          <h2 className="booking-step-title" style={{ marginBottom: 20 }}>
            {t.step1}
          </h2>
          <div className="rdv-motifs">
            {MOTIF_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`rdv-motif${motif === key ? " selected" : ""}`}
                onClick={() => selectMotif(key)}
                aria-pressed={motif === key}
              >
                <span className="check" aria-hidden="true">✓</span>
                <span className="t">
                  {t.motifs[key].label}
                  {key === "consultation" && <em className="free-tag">{t.freeTag}</em>}
                </span>
                <span className="d">{t.motifs[key].desc}</span>
              </button>
            ))}
          </div>
          {errors.motif && !motif && (
            <p className="field-error" role="alert" style={{ marginTop: 14, textAlign: "center" }}>
              {errMsg("motif")}
            </p>
          )}
          {!motif && <p className="waiting-hint">{t.waitingHint}</p>}
        </div>
      </section>

      {/* ============ ÉTAPES 02 & 03 — FORMULAIRE ============ */}
      <section
        ref={formSection}
        className={`section-alt rdv-form-section${motif ? "" : " waiting"}`}
        inert={!motif}
      >
        <div className="wrap">
          <form className="form-shell" onSubmit={submit} noValidate>
            <h2 className="booking-step-title">{t.step2}</h2>
            <div className="form-grid">
              {serviceOptions && (
                <div className="field full">
                  <label htmlFor="rdv-service">{t.serviceLabel}</label>
                  <select
                    id="rdv-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    {...invalid("service", "rdv-service")}
                  >
                    <option value="">{t.serviceAny}</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="field-error" id="rdv-service-error">{errMsg("service")}</span>
                  )}
                </div>
              )}
              <div className="field">
                <label htmlFor="rdv-date">{t.dateLabel}</label>
                <input
                  id="rdv-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  {...invalid("date", "rdv-date")}
                />
                {errors.date && (
                  <span className="field-error" id="rdv-date-error">{errMsg("date")}</span>
                )}
              </div>
              <div className="field">
                <label htmlFor="rdv-slot">{t.slotLabel}</label>
                <select
                  id="rdv-slot"
                  value={timeslot}
                  onChange={(e) => setTimeslot(e.target.value)}
                >
                  {TIMESLOT_VALUES.map((value) => (
                    <option key={value} value={value}>
                      {t.slots[value]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h2 className="booking-step-title" style={{ marginTop: 40 }}>
              {t.step3}
            </h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="rdv-name">{t.nameLabel}</label>
                <input
                  id="rdv-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  {...invalid("name", "rdv-name")}
                />
                {errors.name && (
                  <span className="field-error" id="rdv-name-error">{errMsg("name")}</span>
                )}
              </div>
              <div className="field">
                <label htmlFor="rdv-email">{t.emailLabel}</label>
                <input
                  id="rdv-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  {...invalid("email", "rdv-email")}
                />
                {errors.email && (
                  <span className="field-error" id="rdv-email-error">{errMsg("email")}</span>
                )}
              </div>
              <div className="field">
                <label htmlFor="rdv-phone">{t.phoneLabel}</label>
                <input
                  id="rdv-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  {...invalid("phone", "rdv-phone")}
                />
                {errors.phone && (
                  <span className="field-error" id="rdv-phone-error">{errMsg("phone")}</span>
                )}
              </div>
              <div className="field">
                <label htmlFor="rdv-message">{t.messageLabel}</label>
                <textarea
                  id="rdv-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  {...invalid("message", "rdv-message")}
                />
                {errors.message && (
                  <span className="field-error" id="rdv-message-error">{errMsg("message")}</span>
                )}
              </div>
              {/* Honeypot anti-spam — invisible pour les humains */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="rdv-website">Site web</label>
                <input
                  id="rdv-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            {status === "error" && (
              <div className="form-status ko" role="alert" style={{ marginTop: 20 }}>
                {errorKind === "validation" ? (
                  <p style={{ marginBottom: 0 }}>{t.errorValidation}</p>
                ) : errorKind === "rate_limited" ? (
                  <p style={{ marginBottom: 0 }}>{t.errorRate}</p>
                ) : (
                  <>
                    <p>
                      {t.errorSend1}
                      <a href={mailtoFallback()}>{t.errorSendMail}</a>
                      {t.errorSendOr}
                      <a href={whatsappFallback()} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                      .
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      {t.errorSend2}
                      <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="rdv-submit">
              <button type="submit" className="btn btn-laser btn-lg" disabled={status === "sending"}>
                {status === "sending" ? t.submitting : t.submit}
              </button>
              <p className="form-note">{t.note}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
