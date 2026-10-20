"use client";

import { useState, type FormEvent } from "react";
import { ArrowButton } from "./ArrowButton";
import { contactInfo } from "./data";

type Status = "idle" | "sending" | "sent" | "fallback";

/**
 * Posts the form to Netlify Forms (detected at deploy time from the static HTML).
 * On any other host the POST fails, so we fall back to a prefilled e-mail instead of losing the message.
 */
async function submitForm(form: HTMLFormElement, subject: string): Promise<Status> {
  const data = new FormData(form);
  const body = new URLSearchParams();
  data.forEach((v, k) => body.append(k, String(v)));
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (res.ok) return "sent";
  } catch {
    /* network or host without form handling: use the e-mail fallback */
  }
  const lines: string[] = [];
  data.forEach((v, k) => {
    if (!["form-name", "bot-field"].includes(k) && String(v).trim()) lines.push(`${k} : ${v}`);
  });
  window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  return "fallback";
}

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setStatus(await submitForm(e.currentTarget, "Inscription newsletter"));
  };

  if (status === "sent") {
    return <p className="ta-form-ok">Merci ! Vous êtes bien inscrit à notre newsletter.</p>;
  }

  return (
    <form
      className="ta-newsletter__form"
      name="newsletter"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
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
    </form>
  );
}

const subjects = ["Demander un devis", "Planifier une réunion", "Demande générale", "Partenariat", "Candidater", "Autre"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const subject = (new FormData(e.currentTarget).get("sujet") as string) || "Demande de contact";
    setStatus(await submitForm(e.currentTarget, `Site web – ${subject}`));
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
      data-netlify="true"
      netlify-honeypot="bot-field"
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
      {status === "fallback" && (
        <p className="ta-form-note">
          Votre messagerie s&apos;est ouverte avec le message prérempli. Vous pouvez aussi nous écrire à {contactInfo.email}.
        </p>
      )}
    </form>
  );
}
