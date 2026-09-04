import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

/**
 * Validazione + preparazione invio contatti.
 * Se è configurato RESEND_API_KEY invia email; altrimenti restituisce un mailto
 * già compilato (il client apre il programma email e traccia generate_lead).
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Compila tutti i campi obbligatori." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email non valida." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const subject = `Contatto sito — ${name}`;
  const text = `Nome: ${name}\nEmail: ${email}\n\n${message}`;

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Sito DDX3X <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: `Invio email fallito. ${detail.slice(0, 120)}` },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  }

  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  return NextResponse.json({ ok: true, mailto });
}
