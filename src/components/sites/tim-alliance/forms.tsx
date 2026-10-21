"use client";

import { useState, type FormEvent } from "react";
import { ArrowButton } from "./ArrowButton";
import { contactInfo } from "./data";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const errorText: Record<string, string> = {
  email: "Adresse e-mail invalide.",
  name: "Merci d'indiquer votre nom.",
  too_fast: "Un message vient d'être envoyé, merci de patienter quelques secondes.",
};

/**
 * Sends the form to /contact.php (PHP mail on the hosting), which e-mails contact@timalliance.ma.
 * If the script is unreachable (host without PHP, network error), falls back to a prefilled e-mail.
 */
async function submitForm(form: HTMLFormElement, subject: string): Promise<{ status: Status; error?: string }> {
  const data = new FormData(form);
  try {
    const res = await fetch("/contact.php", { method: "POST", body: new URLSearchParams(data as unknown as Record<string, string>) });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (json?.ok) return { status: "sent" };
    if (json?.error && errorText[json.error]) return { status: "error", error: errorText[json.error] };
  } catch {
    /* script unreachable: use the e-mail fallback */
  }
  const lines: string[] = [];
  data.forEach((v, k) => {
    if (!["form-name", "bot-field"].includes(k) && String(v).trim()) lines.push(`${k} : ${v}`);
  });
  window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  return { status: "fallback" };
}

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const r = await submitForm(e.currentTarget, "Inscription newsletter");
    setStatus(r.status);
    setError(r.error);
  };

  if (status === "sent") {
    return <p className="ta-form-ok">Merci ! Vous êtes bien inscrit à notre newsletter.</p>;
  }

  return (
    <form
      className="ta-newsletter__form"
      name="newsletter"
      method="POST"
      action="/contact.php"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p hidden>
        <label>
          Ne pas remplir <input name="bot-field" />
        </label>
      </p>
      <input type="email" name="email" required placeholder="exemple@email.com" aria-label="Adresse e-mail" />
      <ArrowButton as="button" label={status === "sending" ? "Envoi…" : "S'abonner"} />
      {error && <p className="ta-form-error">{error}</p>}
    </form>
  );
}

const subjects = ["Demander un devis", "Planifier une réunion", "Demande générale", "Partenariat", "Candidater", "Autre"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const subject = (new FormData(e.currentTarget).get("sujet") as string) || "Demande de contact";
    const r = await submitForm(e.currentTarget, `Site web – ${subject}`);
    setStatus(r.status);
    setError(r.error);
  };

  if (status === "sent") {
    return (
      <div className="ta-form-done">
        <span className="ta-form-done__icon" aria-hidden>
          ✓
        </span>
        <h3>Message envoyé.</h3>
        <p>Merci, notre équipe vous répondra sous 24h.</p>
      </div>
    );
  }

  return (
    <form
      className="ta-contact-form"
      name="contact"
      method="POST"
      action="/contact.php"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Ne pas remplir <input name="bot-field" />
        </label>
      </p>
      <label className="ta-field">
        <span>
          <em>01</em> Nom et prénom
        </span>
        <input name="nom" required autoComplete="name" />
      </label>
      <label className="ta-field">
        <span>
          <em>02</em> Nom de l&apos;entreprise
        </span>
        <input name="entreprise" autoComplete="organization" />
      </label>
      <label className="ta-field">
        <span>
          <em>03</em> Email
        </span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="ta-field">
        <span>
          <em>04</em> Numéro de téléphone
        </span>
        <input name="telephone" type="tel" autoComplete="tel" />
      </label>
      <label className="ta-field ta-field--wide">
        <span>
          <em>05</em> Comment peut-on vous servir ?
        </span>
        <select name="sujet" defaultValue="">
          <option value="" disabled>
            Sélectionner…
          </option>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="ta-field ta-field--wide">
        <span>
          <em>06</em> Message
        </span>
        <textarea name="message" rows={5} placeholder="Comment pouvons-nous vous aider ? Partagez quelques détails." />
      </label>
      <div className="ta-contact-form__foot">
        <ArrowButton as="button" label={status === "sending" ? "Envoi…" : "Envoyer un message"} />
        <p>Nous vous répondrons sous 24h.</p>
      </div>
      {error && <p className="ta-form-error">{error}</p>}
      {status === "fallback" && (
        <p className="ta-form-note">
          Votre messagerie s&apos;est ouverte avec le message prérempli. Vous pouvez aussi nous écrire à {contactInfo.email}.
        </p>
      )}
    </form>
  );
}
