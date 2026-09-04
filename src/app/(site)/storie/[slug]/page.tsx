import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "@/content/stories";
import { rewriteWpHtml } from "@/lib/rewrite-wp-html";
import { withCanonical } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return { title: "Storia" };
  return withCanonical(`/storie/${story.slug}`, {
    title: story.name,
    description: story.excerpt,
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-14 md:px-8">
      <p className="mb-6 text-sm">
        <Link
          href="/storie"
          className="font-semibold text-[var(--purple-600)] no-underline hover:text-[var(--purple-700)]"
        >
          ← Tutte le storie
        </Link>
      </p>
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        {story.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={story.image}
            alt={story.name}
            className="mb-6 h-48 w-48 rounded-2xl object-cover"
          />
        ) : null}
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-[2rem]">
          {story.name}
        </h1>
      </header>
      <div
        className="prose-ddx"
        dangerouslySetInnerHTML={{ __html: rewriteWpHtml(story.bodyHtml) }}
      />
    </main>
  );
}
