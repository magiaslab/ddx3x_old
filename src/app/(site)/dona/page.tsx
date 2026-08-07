import type { Metadata } from "next";
import Link from "next/link";
import { DonationForm } from "@/components/DonationForm";

export const metadata: Metadata = {
  title: "Come contribuire — Dona",
  description:
    "Sostieni l'Associazione DDX3X Italia ODV con una donazione via Stripe, PayPal o bonifico.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <header className="mb-7 border-b border-[var(--border)] pb-5 sm:mb-8 sm:pb-6">
        <h1 className="font-serif text-[1.65rem] font-semibold tracking-tight text-[var(--ink)] sm:text-3xl md:text-[2rem]">
          Come contribuire
        </h1>
        <p className="mt-3 text-[var(--gray-600)]">
          Sostenere l&apos;Associazione DDX3X ODV significa offrire un aiuto
          concreto alle persone che convivono con la sindrome e alle loro
          famiglie. Ogni contributo finanzia ricerca, supporto, inclusione e
          divulgazione.
        </p>
      </header>

      <div className="prose-ddx mb-10">
        <h2>Perché il tuo contributo è importante</h2>
        <ul>
          <li>promuovere ricerca scientifica e studi clinici</li>
          <li>organizzare eventi formativi e conferenze</li>
          <li>offrire supporto alle famiglie</li>
          <li>diffondere consapevolezza e favorire l&apos;inclusione</li>
          <li>
            costruire progetti con istituzioni, associazioni e Fondazione
            Telethon
          </li>
        </ul>
        <p>
          Le donazioni sono fiscalmente detraibili secondo la normativa vigente.
          Scopri anche le{" "}
          <Link href="/dona/campagne">campagne di raccolta fondi</Link>.
        </p>
      </div>

      <DonationForm />
    </main>
  );
}
