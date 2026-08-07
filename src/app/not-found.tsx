import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8">
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)]">
        404
      </h1>
      <p className="mt-4 text-[var(--gray-600)]">
        La pagina richiesta non è disponibile.
      </p>
      <p className="mt-8">
        <Link href="/" className="btn-pill btn-primary px-6 py-3">
          Torna alla home
        </Link>
      </p>
    </main>
  );
}
