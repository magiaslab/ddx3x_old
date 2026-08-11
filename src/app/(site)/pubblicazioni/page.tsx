import type { Metadata } from "next";
import Link from "next/link";
import { pubblicazioni } from "@/content/pubblicazioni";
import { formatDateIt } from "@/components/NewsCard";

export const metadata: Metadata = {
  title: "Pubblicazioni online",
  description:
    "Articoli e pubblicazioni scientifiche sulla sindrome DDX3X commentati dall'Associazione.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 md:px-8">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-[2rem]">
          Pubblicazioni online
        </h1>
        <p className="mt-3 text-[var(--gray-600)]">
          Selezione di articoli scientifici e approfondimenti sulla sindrome
          DDX3X.
        </p>
      </header>
      <ul className="space-y-4">
        {pubblicazioni.map((p) => (
          <li key={p.id}>
            <Link
              href={`/pubblicazioni/${p.slug}`}
              className="flex gap-4 rounded-[18px] border border-[var(--border)] bg-white p-4 text-[var(--ink)] no-underline transition hover:border-[#D9CBEF]"
            >
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
              ) : null}
              <div>
                <span className="font-serif text-[16.5px] font-semibold text-[var(--ink)]">
                  {p.title}
                </span>
                <p className="mt-1.5 text-sm text-[var(--gray-400)]">
                  {formatDateIt(p.date.replace(" ", "T"))}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
