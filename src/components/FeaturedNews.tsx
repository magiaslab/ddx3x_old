import Link from "next/link";
import {
  CategoryBadge,
  formatDateIt,
  postCoverUrl,
} from "@/components/NewsCard";
import type { Post } from "@/content/seed-posts";

/** Card orizzontale / più ampia per le novità in evidenza. */
export function FeaturedNewsCard({
  post,
  headingLevel = "h2",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  const img = postCoverUrl(post);
  const Title = headingLevel;

  return (
    <Link
      href={`/novita/${post.slug}`}
      className="group grid overflow-hidden rounded-[22px] border border-[#D9CBEF] bg-white text-[var(--ink)] no-underline shadow-[0_10px_28px_rgba(84,64,127,0.08)] transition hover:border-[var(--purple-600)] sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
    >
      <div className="relative min-h-[200px] bg-[var(--purple-50)] sm:min-h-[260px]">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={post.coverImage?.alt || post.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center text-sm font-medium text-[var(--purple-700)] sm:min-h-[260px]">
            In evidenza
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-3 p-6 sm:gap-3.5 sm:p-8 md:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--purple-600)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-white">
            In evidenza
          </span>
          <CategoryBadge category={post.category} />
        </div>
        <Title className="font-serif text-[1.35rem] font-semibold leading-snug text-[var(--ink)] sm:text-[1.55rem] md:text-[1.7rem]">
          {post.title}
        </Title>
        {post.excerpt ? (
          <p className="line-clamp-3 text-[14.5px] leading-relaxed text-[var(--gray-600)] sm:text-[15px]">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <time
            dateTime={post.publishedAt}
            className="text-[12.5px] text-[var(--gray-400)]"
          >
            {formatDateIt(post.publishedAt)}
          </time>
          <span className="text-[13.5px] font-semibold text-[var(--purple-600)] group-hover:text-[var(--purple-700)]">
            Leggi →
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Sezione “In evidenza”: non renderizza nulla se non ci sono post. */
export function FeaturedNewsSection({
  posts,
  variant = "page",
}: {
  posts: Post[];
  /** home = padding sezione full-bleed; page = dentro contenitore novità */
  variant?: "home" | "page";
}) {
  if (!posts.length) return null;

  const inner = (
    <>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 sm:mb-7">
        <h2 className="font-serif text-[24px] font-semibold text-[var(--ink)] sm:text-[30px]">
          In evidenza
        </h2>
        {variant === "home" ? (
          <Link
            href="/novita"
            className="text-[14px] font-semibold text-[var(--purple-600)] no-underline hover:text-[var(--purple-700)] sm:text-[14.5px]"
          >
            Vedi tutte →
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <FeaturedNewsCard
            key={post._id}
            post={post}
            headingLevel={variant === "home" ? "h3" : "h2"}
          />
        ))}
      </div>
    </>
  );

  if (variant === "home") {
    return (
      <section className="px-4 pb-12 sm:px-6 sm:pb-16 md:px-8">
        <div className="mx-auto max-w-[1240px]">{inner}</div>
      </section>
    );
  }

  return <section className="mb-10 sm:mb-12">{inner}</section>;
}
