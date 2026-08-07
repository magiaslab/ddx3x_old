import type { Metadata } from "next";
import Link from "next/link";
import { pubblicazioni } from "@/content/pubblicazioni";

export const metadata: Metadata = {
  title: "Pubblicazioni online",
  description:
    "Articoli e pubblicazioni scientifiche sulla sindrome DDX3X commentati dall'Associazione.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 border-b border-stone-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Pubblicazioni online
        </h1>
        <p className="mt-3 text-stone-600">
          Selezione di articoli scientifici e approfondimenti sulla sindrome
          DDX3X.
        </p>
      </header>
      <ul className="space-y-6">
        {pubblicazioni.map((p) => (
          <li key={p.id} className="flex gap-4 border-b border-stone-100 pb-6">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt=""
                className="h-20 w-20 shrink-0 rounded object-cover"
              />
            ) : null}
            <div>
              <Link
                href={`/pubblicazioni/${p.slug}`}
                className="font-medium text-stone-900 hover:underline"
              >
                {p.title}
              </Link>
              <p className="mt-1 text-sm text-stone-500">
                {new Date(p.date.replace(" ", "T")).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
