import type { Metadata } from "next";
import Link from "next/link";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Le nostre storie",
  description:
    "Testimonianze delle famiglie italiane che convivono con la sindrome DDX3X.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Le nostre storie
        </h1>
        <p className="mt-3 text-stone-600">
          Ogni bambino, bambina, ragazzo e ragazza con mutazione DDX3X ha la sua
          storia. Qui le famiglie italiane hanno scelto di condividerle: racconti
          che parlano di difficoltà, conquiste e speranze.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="flex gap-4 border-b border-stone-200 pb-6"
          >
            {s.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.image}
                alt={s.name}
                className="h-20 w-20 shrink-0 rounded object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-stone-100 text-lg font-semibold text-stone-500">
                {s.name[0]}
              </div>
            )}
            <div>
              <h2 className="font-semibold text-stone-900">
                <Link href={`/storie/${s.slug}`} className="hover:underline">
                  {s.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-stone-600">{s.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
