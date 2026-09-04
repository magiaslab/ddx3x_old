import Link from "next/link";
import Image from "next/image";
import {
  normalizeCategory,
  type Post,
  type PostCategory,
} from "@/content/seed-posts";
import { optimizeCoverUrl } from "@/lib/images";

const MONTHS_IT = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

export function formatDateIt(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} ${MONTHS_IT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function CategoryBadge({
  category,
}: {
  category: Post["category"] | PostCategory;
}) {
  const s = normalizeCategory(category);
  return (
    <span
      className="inline-block self-start rounded-full px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.04em]"
      style={{ color: s.color, background: s.background }}
    >
      {s.title}
    </span>
  );
}

export function postCoverUrl(post: Post, width = 800) {
  const raw =
    post.coverImageUrl ||
    post.coverImage?.asset?.url ||
    null;
  return optimizeCoverUrl(raw, width);
}

export function NewsCard({
  post,
  headingLevel = "h2",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  const img = postCoverUrl(post, 640);
  const Title = headingLevel;
  return (
    <Link
      href={`/novita/${post.slug}`}
      className="flex flex-col overflow-hidden rounded-[18px] border border-[var(--border)] bg-white text-[var(--ink)] no-underline transition hover:border-[#D9CBEF]"
    >
      {img ? (
        <div className="relative aspect-video w-full bg-[var(--purple-50)]">
          <Image
            src={img}
            alt={post.coverImage?.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-[var(--purple-50)] text-sm font-medium text-[var(--purple-700)]">
          Novità
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <CategoryBadge category={post.category} />
        <Title className="font-serif text-[16.5px] font-semibold leading-snug text-[var(--ink)]">
          {post.title}
        </Title>
        {post.excerpt ? (
          <p className="line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-[var(--gray-600)]">
            {post.excerpt}
          </p>
        ) : null}
        <time
          dateTime={post.publishedAt}
          className="mt-1 text-[12.5px] text-[var(--gray-400)]"
        >
          {formatDateIt(post.publishedAt)}
        </time>
      </div>
    </Link>
  );
}

export function LatestNews({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24 md:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 sm:mb-8 sm:gap-4">
          <h2 className="font-serif text-[24px] font-semibold text-[var(--ink)] sm:text-[30px]">
            Ultime Novità
          </h2>
          <Link
            href="/novita"
            className="text-[14px] font-semibold text-[var(--purple-600)] no-underline hover:text-[var(--purple-700)] sm:text-[14.5px]"
          >
            Vedi tutte →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
