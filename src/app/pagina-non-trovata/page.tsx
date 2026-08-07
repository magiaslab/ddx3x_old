import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false, follow: false },
};

export default function PaginaNonTrovata() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-stone-900">
        Pagina non trovata
      </h1>
      <p className="mt-4 text-stone-600">
        Il link WordPress legacy (<code>page_id</code> o <code>p</code>) non
        corrisponde a una pagina migrata, oppure la risorsa non esiste più.
      </p>
      <p className="mt-6">
        <Link
          href="/"
          className="rounded bg-stone-900 px-4 py-2 text-sm font-medium text-white"
        >
          Torna alla home
        </Link>
      </p>
    </main>
  );
}
