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
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
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
          Come vuoi donare?
        </h2>
        <p className="mt-1.5 text-sm text-[var(--gray-600)]">
          Scegli un metodo, poi conferma l&apos;importo con il pulsante sotto.
        </p>

        <div
          className="mt-4 grid gap-2.5 sm:grid-cols-2"
          role="radiogroup"
          aria-label="Metodo di pagamento"
        >
          <button
            type="button"
            role="radio"
            aria-checked={method === "stripe"}
            onClick={() => setMethod("stripe")}
            className={`flex cursor-pointer flex-col items-start gap-1 rounded-xl border p-3.5 text-left transition ${
              method === "stripe"
                ? "border-[var(--purple-600)] bg-[var(--purple-50)]"
                : "border-[var(--border)] bg-white hover:border-[#D9CBEF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  method === "stripe"
                    ? "border-[var(--purple-600)]"
                    : "border-[#C8BDD8]"
                }`}
                aria-hidden
              >
                {method === "stripe" ? (
                  <span className="h-2 w-2 rounded-full bg-[var(--purple-600)]" />
                ) : null}
              </span>
              <span className="font-semibold text-[var(--ink)]">
                Carta di credito
              </span>
            </span>
            <span className="pl-[26px] text-[13px] text-[var(--gray-600)]">
              Pagamento sicuro online (Visa, Mastercard…)
            </span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={method === "paypal"}
            onClick={() => setMethod("paypal")}
            className={`flex cursor-pointer flex-col items-start gap-1 rounded-xl border p-3.5 text-left transition ${
              method === "paypal"
                ? "border-[var(--purple-600)] bg-[var(--purple-50)]"
                : "border-[var(--border)] bg-white hover:border-[#D9CBEF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  method === "paypal"
                    ? "border-[var(--purple-600)]"
                    : "border-[#C8BDD8]"
                }`}
                aria-hidden
              >
                {method === "paypal" ? (
                  <span className="h-2 w-2 rounded-full bg-[var(--purple-600)]" />
                ) : null}
              </span>
              <span className="font-semibold text-[var(--ink)]">PayPal</span>
            </span>
            <span className="pl-[26px] text-[13px] text-[var(--gray-600)]">
              Usa il tuo account PayPal
            </span>
          </button>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-[#F0C4C4] bg-[#FDECEC] px-3.5 py-2.5 text-sm text-[#9B2C2C]"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--gray-400)]">
            Conferma e paga
          </p>
          {method === "stripe" ? (
            <>
              <button
                type="button"
                disabled={loading}
                onClick={startStripeCheckout}
                className="btn-pill btn-primary w-full px-7 py-3.5 text-[15px] disabled:opacity-60"
              >
                {loading
                  ? "Apertura pagamento sicuro…"
                  : `Procedi e dona €${Number.isFinite(resolvedAmount) ? resolvedAmount : "—"}`}
              </button>
              <p className="mt-2.5 text-[13px] text-[var(--gray-600)]">
                Verrai portato su una pagina sicura per inserire i dati della
                carta.
              </p>
            </>
          ) : paypalClientId ? (
            <>
              <p className="mb-3 text-[13px] text-[var(--gray-600)]">
                Clicca il pulsante PayPal qui sotto per completare la donazione
                di{" "}
                <strong>
                  €{Number.isFinite(resolvedAmount) ? resolvedAmount : "—"}
                </strong>
                .
              </p>
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
                      "Errore PayPal. Riprova oppure scegli carta di credito o bonifico.",
                    );
                  }}
                />
              </PayPalScriptProvider>
            </>
          ) : (
            <p className="text-sm text-[var(--gray-600)]">
              PayPal non è al momento disponibile. Usa la carta di credito o il
              bonifico.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-[18px] border border-dashed border-[var(--amber-border)] bg-[var(--amber-tint)] p-6 text-sm text-[#5C4E32] md:p-7">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink)]">
          Preferisci il bonifico?
        </h2>
        <p className="mt-1.5 text-[13.5px] leading-relaxed">
          Nessun pagamento online: usa questi dati dalla tua banca o app.
        </p>
        <dl className="mt-4 space-y-3">
          <div>
            <dt className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#8A7340]">
              Intestatario
            </dt>
            <dd className="mt-0.5 font-semibold text-[var(--ink)]">
              {BANK_DETAILS.beneficiary}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#8A7340]">
              Banca
            </dt>
            <dd className="mt-0.5">{BANK_DETAILS.bank}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#8A7340]">
              IBAN
            </dt>
            <dd className="mt-1">
              <code className="inline-block break-all rounded-lg bg-white px-2.5 py-1.5 font-mono text-[13px] text-[var(--ink)]">
                {BANK_DETAILS.iban}
              </code>
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#8A7340]">
              Causale
            </dt>
            <dd className="mt-0.5">{BANK_DETAILS.causale}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#8A7340]">
              5×1000 — Codice fiscale
            </dt>
            <dd className="mt-0.5 font-mono font-semibold text-[#6B4F12]">
              {BANK_DETAILS.codiceFiscale}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
