"use client";

import { useMemo, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  BANK_DETAILS,
  CAMPAIGNS,
  SUGGESTED_AMOUNTS,
} from "@/lib/campaigns";

type PayMethod = "stripe" | "paypal";

export function DonationForm() {
  const activeCampaigns = useMemo(
    () => CAMPAIGNS.filter((c) => c.active),
    [],
  );
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [campaignId, setCampaignId] = useState(
    activeCampaigns[0]?.id || "generale",
  );
  const [method, setMethod] = useState<PayMethod>("stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedAmount = customAmount
    ? Number.parseFloat(customAmount.replace(",", "."))
    : amount;

  const campaign = CAMPAIGNS.find((c) => c.id === campaignId);
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  async function startStripeCheckout() {
    setError(null);
    if (!resolvedAmount || resolvedAmount < 1) {
      setError("Inserisci un importo valido (minimo 1 €).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: resolvedAmount,
          campaignId,
          campaignName: campaign?.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Errore Checkout Stripe");
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL di Checkout non ricevuto");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore imprevisto");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[18px] border border-[var(--border)] bg-white p-6 md:p-7">
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">
          Importo della donazione
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {SUGGESTED_AMOUNTS.map((value) => {
            const selected = !customAmount && amount === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustomAmount("");
                }}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
                  selected
                    ? "border-[var(--purple-600)] bg-[var(--purple-600)] text-white"
                    : "border-[#E2D9F0] bg-white text-[#3A3247] hover:border-[#B7A3D9]"
                }`}
              >
                €{value}
              </button>
            );
          })}
        </div>
        <label className="mt-5 block text-sm text-[var(--gray-600)]">
          Importo personalizzato (€)
          <input
            type="number"
            min="1"
            step="0.01"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Es. 75"
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--sand-50)] px-3.5 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--purple-600)] sm:max-w-xs"
          />
        </label>
      </section>

      <section className="rounded-[18px] border border-[var(--border)] bg-white p-6 md:p-7">
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">
          Destinazione
        </h2>
        <div className="mt-4 space-y-2.5">
          {activeCampaigns.map((c) => {
            const selected = campaignId === c.id;
            return (
              <label
                key={c.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                  selected
                    ? "border-[var(--purple-600)] bg-[var(--purple-50)]"
                    : "border-[var(--border)] hover:border-[#D9CBEF] hover:bg-[var(--sand-50)]"
                }`}
              >
                <input
                  type="radio"
                  name="campaign"
                  value={c.id}
                  checked={selected}
                  onChange={() => setCampaignId(c.id)}
                  className="mt-1 accent-[var(--purple-600)]"
                />
                <span>
                  <span className="block font-semibold text-[var(--ink)]">
                    {c.name}
                  </span>
                  <span className="block text-sm text-[var(--gray-600)]">
                    {c.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="rounded-[18px] border border-[var(--border)] bg-white p-6 md:p-7">
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">
          Metodo di pagamento
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setMethod("stripe")}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              method === "stripe"
                ? "border-[var(--purple-600)] bg-[var(--purple-600)] text-white"
                : "border-[#E2D9F0] text-[#3A3247] hover:border-[#B7A3D9]"
            }`}
          >
            Carta di credito (Stripe)
          </button>
          <button
            type="button"
            onClick={() => setMethod("paypal")}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              method === "paypal"
                ? "border-[var(--purple-600)] bg-[var(--purple-600)] text-white"
                : "border-[#E2D9F0] text-[#3A3247] hover:border-[#B7A3D9]"
            }`}
          >
            PayPal
          </button>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-[#FDECEC] px-3.5 py-2.5 text-sm text-[#9B2C2C]">
            {error}
          </p>
        ) : null}

        <div className="mt-6">
          {method === "stripe" ? (
            <button
              type="button"
              disabled={loading}
              onClick={startStripeCheckout}
              className="btn-pill btn-primary w-full px-7 py-3.5 text-[15px] disabled:opacity-60 sm:w-auto"
            >
              {loading
                ? "Reindirizzamento…"
                : `Dona €${Number.isFinite(resolvedAmount) ? resolvedAmount : "—"} con Stripe`}
            </button>
          ) : paypalClientId ? (
            <PayPalScriptProvider
              options={{
                clientId: paypalClientId,
                currency: "EUR",
                intent: "capture",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", shape: "pill", color: "gold" }}
                disabled={!resolvedAmount || resolvedAmount < 1}
                createOrder={(_data, actions) =>
                  actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "EUR",
                          value: resolvedAmount.toFixed(2),
                        },
                        description: `Donazione DDX3X — ${campaign?.name}`,
                        custom_id: campaignId,
                      },
                    ],
                  })
                }
                onApprove={async (_data, actions) => {
                  await actions.order?.capture();
                  window.location.href = "/dona/grazie";
                }}
                onCancel={() => {
                  window.location.href = "/dona/annullato";
                }}
                onError={() => {
                  setError(
                    "Errore PayPal. Riprova o usa Stripe / bonifico.",
                  );
                }}
              />
            </PayPalScriptProvider>
          ) : (
            <p className="text-sm text-[var(--gray-600)]">
              PayPal non configurato: imposta{" "}
              <code className="rounded bg-[var(--purple-50)] px-1.5 py-0.5 text-[var(--purple-700)]">
                NEXT_PUBLIC_PAYPAL_CLIENT_ID
              </code>{" "}
              nelle variabili d&apos;ambiente.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-[18px] border border-dashed border-[var(--amber-border)] bg-[var(--amber-tint)] p-6 text-sm text-[#6B5C3E] md:p-7">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink)]">
          Oppure via bonifico
        </h2>
        <p className="mt-2.5 leading-relaxed">
          <strong className="text-[var(--ink)]">{BANK_DETAILS.beneficiary}</strong>
          <br />
          {BANK_DETAILS.bank}
          <br />
          IBAN:{" "}
          <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-[13px]">
            {BANK_DETAILS.iban}
          </code>
          <br />
          Causale: {BANK_DETAILS.causale}
        </p>
        <p className="mt-3">
          5×1000 — Codice fiscale:{" "}
          <strong className="font-mono text-[#8A6A1F]">
            {BANK_DETAILS.codiceFiscale}
          </strong>
        </p>
      </section>
    </div>
  );
}
