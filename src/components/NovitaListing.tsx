"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { normalizeCategory, type Post } from "@/content/seed-posts";

type PeriodKey = "all" | "month" | "quarter" | "year" | `y-${string}`;

function categorySlug(post: Post) {
  return normalizeCategory(post.category).slug;
}

function categoryTitle(post: Post) {
  return normalizeCategory(post.category).title;
}

function matchesPeriod(iso: string, period: PeriodKey, now: Date) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  if (period === "all") return true;
  if (period === "month") {
    const from = new Date(now);
    from.setMonth(from.getMonth() - 1);
    return d >= from;
  }
  if (period === "quarter") {
    const from = new Date(now);
    from.setMonth(from.getMonth() - 3);
    return d >= from;
  }
  if (period === "year") {
    const from = new Date(now);
    from.setFullYear(from.getFullYear() - 1);
    return d >= from;
  }
  if (period.startsWith("y-")) {
    const y = Number(period.slice(2));
    return d.getFullYear() === y;
  }
  return true;
}

const selectClass =
  "min-w-[10.5rem] rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-[14px] text-[var(--ink)] outline-none focus:border-[var(--purple-600)]";

export function NovitaListing({
  posts,
  excludeIds = [],
}: {
  posts: Post[];
  /** Es. id delle in evidenza già mostrate sopra, per evitare doppioni. */
  excludeIds?: string[];
}) {
  const [category, setCategory] = useState<string>("all");
  const [period, setPeriod] = useState<PeriodKey>("all");

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of posts) {
      map.set(categorySlug(p), categoryTitle(p));
    }
    return [...map.entries()]
      .map(([slug, title]) => ({ slug, title }))
      .sort((a, b) => a.title.localeCompare(b.title, "it"));
  }, [posts]);

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const p of posts) {
      const y = new Date(p.publishedAt).getFullYear();
      if (!Number.isNaN(y)) set.add(y);
    }
    return [...set].sort((a, b) => b - a);
  }, [posts]);

  const excluded = useMemo(() => new Set(excludeIds), [excludeIds]);
  const now = useMemo(() => new Date(), []);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (excluded.has(p._id)) return false;
      if (category !== "all" && categorySlug(p) !== category) return false;
      if (!matchesPeriod(p.publishedAt, period, now)) return false;
      return true;
    });
  }, [posts, excluded, category, period, now]);

  const hasActiveFilters = category !== "all" || period !== "all";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-[1.35rem] font-semibold text-[var(--ink)] sm:text-[1.5rem]">
            Tutte le novità
          </h2>
          <p className="mt-1 text-[13.5px] text-[var(--gray-600)]">
            Filtra per categoria o periodo
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <label className="flex flex-col gap-1 text-[12px] font-semibold uppercase tracking-[0.04em] text-[var(--gray-400)]">
            Categoria
            <select
              className={selectClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Tutte</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[12px] font-semibold uppercase tracking-[0.04em] text-[var(--gray-400)]">
            Periodo
            <select
              className={selectClass}
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodKey)}
            >
              <option value="all">Tutti</option>
              <option value="month">Ultimo mese</option>
              <option value="quarter">Ultimi 3 mesi</option>
              <option value="year">Ultimo anno</option>
              {years.map((y) => (
                <option key={y} value={`y-${y}`}>
                  Anno {y}
                </option>
              ))}
            </select>
          </label>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setPeriod("all");
              }}
              className="rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-[var(--purple-600)] hover:text-[var(--purple-700)] sm:self-end"
            >
              Azzera filtri
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-[18px] border border-dashed border-[var(--border)] bg-white px-5 py-10 text-center text-[15px] text-[var(--gray-600)]">
          Nessuna novità con questi filtri.
          {hasActiveFilters ? " Prova ad azzerarli o a cambiare selezione." : ""}
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
