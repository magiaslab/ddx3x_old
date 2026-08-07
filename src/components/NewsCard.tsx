import Link from "next/link";
import type { Post, PostCategory } from "@/content/seed-posts";

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

const categoryStyles: Record<
  PostCategory,
  { label: string; color: string; bg: string }
> = {
  campagna: { label: "Campagna", color: "#8A6A1F", bg: "#FBF0D8" },
  evento: { label: "Evento", color: "#54407F", bg: "#EDE7F6" },
  comunicato: { label: "Comunicato", color: "#3E7D34", bg: "#E3F2DE" },
};

export function CategoryBadge({ category }: { category: PostCategory }) {
  const s = categoryStyles[category];
  return (
    <span
      className="inline-block self-start rounded-full px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.04em]"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}

function coverUrl(post: Post) {
  if (post.coverImageUrl) return post.coverImageUrl;
  if (post.coverImage?.asset?.url) return post.coverImage.asset.url;
  return null;
}

export function NewsCard({ post }: { post: Post }) {
  const img = coverUrl(post);
  return (
    <Link
      href={`/novita/${post.slug}`}
      className="flex flex-col overflow-hidden rounded-[18px] border border-[var(--border)] bg-white text-[var(--ink)] no-underline transition hover:border-[#D9CBEF] hover:shadow-[0_10px_24px_rgba(80,50,120,.08)]"
    >
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={post.coverImage?.alt || post.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-[var(--purple-50)] text-sm text-[var(--purple-600)]">
          Novità
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <CategoryBadge category={post.category} />
        <h3 className="font-serif text-[16.5px] font-semibold leading-snug text-[var(--ink)]">
          {post.title}
        </h3>
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
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
