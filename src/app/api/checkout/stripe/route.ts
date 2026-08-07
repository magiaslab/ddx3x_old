import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { siteConfig } from "@/lib/site";

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Stripe non configurato. Imposta STRIPE_SECRET_KEY nelle variabili d'ambiente.",
      },
      { status: 503 },
    );
  }

  let body: { amount?: number; campaignId?: string; campaignName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body non valido" }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 1) {
    return NextResponse.json(
      { error: "Importo non valido (minimo 1 €)" },
      { status: 400 },
    );
  }

  const campaignId = body.campaignId || "generale";
  const campaignName = body.campaignName || "Donazione generale";
  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    siteConfig.url;

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: `Donazione — ${campaignName}`,
              description: `Associazione DDX3X Italia ODV · campagna ${campaignId}`,
            },
          },
        },
      ],
      metadata: {
        campaign: campaignId,
        campaignName,
      },
      success_url: `${origin}/dona/grazie?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dona/annullato`,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (e) {
    console.error("Stripe checkout error", e);
    return NextResponse.json(
      { error: "Impossibile creare la sessione Stripe Checkout" },
      { status: 500 },
    );
  }
}
