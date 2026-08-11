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
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <header className="mb-8 max-w-3xl sm:mb-10">
        <h1 className="font-serif text-[1.65rem] font-semibold tracking-tight text-[var(--ink)] sm:text-3xl md:text-[2rem]">
          Le nostre storie
        </h1>
        <p className="mt-3 text-[var(--gray-600)]">
          Ogni bambino, bambina, ragazzo e ragazza con mutazione DDX3X ha la sua
          storia. Qui le famiglie italiane hanno scelto di condividerle: racconti
          che parlano di difficoltà, conquiste e speranze.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <Link
            key={s.id}
            id={s.id}
            href={`/storie/${s.slug}`}
            className="flex gap-4 rounded-[18px] border border-[var(--border)] bg-white p-5 text-[var(--ink)] no-underline transition hover:border-[#D9CBEF]"
          >
            {s.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.image}
                alt={s.name}
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[var(--purple-50)] text-lg font-semibold text-[var(--purple-600)]">
                {s.name[0]}
              </div>
            )}
            <div>
              <h2 className="font-serif text-[17px] font-semibold text-[var(--ink)]">
                {s.name}
              </h2>
              <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-[var(--gray-600)]">
                {s.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
