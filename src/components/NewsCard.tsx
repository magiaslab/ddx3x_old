import Link from "next/link";
import type { Post, PostCategory } from "@/content/seed-posts";

const categoryStyles: Record<PostCategory, string> = {
  campagna: "bg-amber-100 text-amber-900",
  evento: "bg-sky-100 text-sky-900",
  comunicato: "bg-emerald-100 text-emerald-900",
};

const categoryLabels: Record<PostCategory, string> = {
  campagna: "Campagna",
  evento: "Evento",
  comunicato: "Comunicato",
};

export function CategoryBadge({ category }: { category: PostCategory }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${categoryStyles[category]}`}
    >
      {categoryLabels[category]}
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
    <article className="flex flex-col gap-3">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={post.coverImage?.alt || post.title}
          className="aspect-square w-full rounded object-cover"
        />
      ) : (
        <div className="aspect-square w-full rounded bg-stone-100" />
      )}
      <CategoryBadge category={post.category} />
      <h3 className="text-base font-semibold leading-snug text-stone-900">
        <Link href={`/novita/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      {post.excerpt ? (
        <p className="text-sm text-stone-600 line-clamp-3">{post.excerpt}</p>
      ) : null}
      <time
        dateTime={post.publishedAt}
        className="text-xs text-stone-500"
      >
        {new Date(post.publishedAt).toLocaleDateString("it-IT", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
    </article>
  );
}

export function LatestNews({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold text-stone-900">Ultime Novità</h2>
        <Link
          href="/novita"
          className="text-sm font-medium text-stone-700 underline-offset-2 hover:underline"
        >
          Vedi tutte
        </Link>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
