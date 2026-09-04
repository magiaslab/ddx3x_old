import type { Metadata } from "next";
import Link from "next/link";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = {
  ...withCanonical("/pagina-non-trovata", {
    title: "Pagina non trovata",
  }),
  robots: { index: false, follow: false },
};

export default function PaginaNonTrovata() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8">
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)]">
        Pagina non trovata
      </h1>
      <p className="mt-4 text-[var(--gray-600)]">
        Il link WordPress legacy (<code>page_id</code> o <code>p</code>) non
        corrisponde a una pagina migrata, oppure la risorsa non esiste più.
      </p>
      <p className="mt-8">
        <Link href="/" className="btn-pill btn-primary px-6 py-3">
          Torna alla home
        </Link>
      </p>
    </main>
  );
}
