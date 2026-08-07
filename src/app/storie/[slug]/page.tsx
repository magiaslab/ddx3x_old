import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "@/content/stories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return { title: "Storia" };
  return {
    title: story.name,
    description: story.excerpt,
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-6 text-sm">
        <Link href="/storie" className="text-stone-600 underline-offset-2 hover:underline">
          ← Tutte le storie
        </Link>
      </p>
      <header className="mb-8 border-b border-stone-200 pb-6">
        {story.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={story.image}
            alt={story.name}
            className="mb-6 h-48 w-48 rounded object-cover"
          />
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          {story.name}
        </h1>
      </header>
      <div
        className="prose-ddx"
        dangerouslySetInnerHTML={{ __html: story.bodyHtml }}
      />
    </main>
  );
}
