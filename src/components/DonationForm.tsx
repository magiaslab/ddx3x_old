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
    <div className="space-y-8">
      <section className="rounded-lg border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">
          Importo della donazione
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTED_AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setAmount(value);
                setCustomAmount("");
              }}
              className={`rounded border px-4 py-2 text-sm font-medium ${
                !customAmount && amount === value
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-300 text-stone-800 hover:bg-stone-50"
              }`}
            >
              €{value}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm text-stone-700">
          Importo personalizzato (€)
          <input
            type="number"
            min="1"
            step="0.01"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Es. 75"
            className="mt-1 w-full max-w-xs rounded border border-stone-300 px-3 py-2"
          />
        </label>
      </section>

      <section className="rounded-lg border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">
          Destinazione
        </h2>
        <div className="mt-4 space-y-2">
          {activeCampaigns.map((c) => (
            <label
              key={c.id}
              className="flex cursor-pointer items-start gap-3 rounded border border-stone-200 p-3 hover:bg-stone-50"
            >
              <input
                type="radio"
                name="campaign"
                value={c.id}
                checked={campaignId === c.id}
                onChange={() => setCampaignId(c.id)}
                className="mt-1"
              />
              <span>
                <span className="block font-medium text-stone-900">
                  {c.name}
                </span>
                <span className="block text-sm text-stone-600">
                  {c.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">
          Metodo di pagamento
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setMethod("stripe")}
            className={`rounded border px-4 py-2 text-sm font-medium ${
              method === "stripe"
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-300"
            }`}
          >
            Carta di credito (Stripe)
          </button>
          <button
            type="button"
            onClick={() => setMethod("paypal")}
            className={`rounded border px-4 py-2 text-sm font-medium ${
              method === "paypal"
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-300"
            }`}
          >
            PayPal
          </button>
        </div>

        {error ? (
          <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <div className="mt-6">
          {method === "stripe" ? (
            <button
              type="button"
              disabled={loading}
              onClick={startStripeCheckout}
              className="rounded bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
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
                style={{ layout: "vertical", shape: "rect" }}
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
            <p className="text-sm text-stone-600">
              PayPal non configurato: imposta{" "}
              <code className="rounded bg-stone-100 px-1">
                NEXT_PUBLIC_PAYPAL_CLIENT_ID
              </code>{" "}
              nelle variabili d&apos;ambiente.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-6 text-sm text-stone-700">
        <h2 className="text-base font-semibold text-stone-900">
          Oppure via bonifico
        </h2>
        <p className="mt-2">
          <strong>{BANK_DETAILS.beneficiary}</strong>
          <br />
          {BANK_DETAILS.bank}
          <br />
          IBAN: <code>{BANK_DETAILS.iban}</code>
          <br />
          Causale: {BANK_DETAILS.causale}
        </p>
        <p className="mt-3">
          5×1000 — Codice fiscale:{" "}
          <strong>{BANK_DETAILS.codiceFiscale}</strong>
        </p>
      </section>
    </div>
  );
}
