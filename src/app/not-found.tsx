import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-stone-900">404</h1>
      <p className="mt-4 text-stone-600">
        La pagina richiesta non è disponibile.
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
