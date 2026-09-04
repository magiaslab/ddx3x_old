"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/gtag";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        mailto?: string;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Invio non riuscito. Riprova.");
      }

      // Solo dopo conferma di successo (API o mailto preparato)
      trackEvent("generate_lead");

      if (json.mailto) {
        window.location.href = json.mailto;
      }

      form.reset();
      setStatus("ok");
      setError(null);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Invio non riuscito.");
    }
  }

  return (
    <section className="mt-10 rounded-[18px] border border-[var(--border)] bg-white p-5 sm:p-7">
      <h2 className="font-serif text-[1.35rem] font-semibold text-[var(--ink)]">
        Scrivici
      </h2>
      <p className="mt-2 text-[14.5px] text-[var(--gray-600)]">
        Compila il modulo: ti risponderemo all&apos;indirizzo che indichi.
      </p>

      <form className="mt-5 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[var(--ink)]">
          Nome e cognome *
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="rounded-xl border border-[var(--border)] px-3 py-2.5 text-[15px] font-normal outline-none focus:border-[var(--purple-600)]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[var(--ink)]">
          Email *
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-xl border border-[var(--border)] px-3 py-2.5 text-[15px] font-normal outline-none focus:border-[var(--purple-600)]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[var(--ink)]">
          Messaggio *
          <textarea
            name="message"
            required
            rows={5}
            className="rounded-xl border border-[var(--border)] px-3 py-2.5 text-[15px] font-normal outline-none focus:border-[var(--purple-600)]"
          />
        </label>

        {error ? (
          <p className="text-[14px] text-red-700" role="alert">
            {error}
          </p>
        ) : null}
        {status === "ok" ? (
          <p className="text-[14px] text-[var(--green-700)]" role="status">
            Grazie: messaggio inviato correttamente.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-pill btn-primary w-full px-6 py-3 text-[15px] sm:w-auto"
        >
          {status === "sending" ? "Invio…" : "Invia messaggio"}
        </button>
      </form>
    </section>
  );
}
