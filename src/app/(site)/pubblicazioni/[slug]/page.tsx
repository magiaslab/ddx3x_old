import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pubblicazioni } from "@/content/pubblicazioni";
import { rewriteWpHtml } from "@/lib/rewrite-wp-html";
import { formatDateIt } from "@/components/NewsCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pubblicazioni.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pub = pubblicazioni.find((p) => p.slug === slug);
  if (!pub) return { title: "Pubblicazione" };
  return { title: pub.title };
}

export default async function PubPage({ params }: Props) {
  const { slug } = await params;
  const pub = pubblicazioni.find((p) => p.slug === slug);
  if (!pub) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-14 md:px-8">
      <p className="mb-6 text-sm">
        <Link
          href="/pubblicazioni"
          className="font-semibold text-[var(--purple-600)] no-underline hover:text-[var(--purple-700)]"
        >
          ← Tutte le pubblicazioni
        </Link>
      </p>
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-[2rem]">
          {pub.title}
        </h1>
        <time className="mt-3 block text-sm text-[var(--gray-400)]">
          {formatDateIt(pub.date.replace(" ", "T"))}
        </time>
      </header>
      {pub.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pub.image}
          alt=""
          className="mb-8 max-h-80 rounded-[18px] object-contain"
        />
      ) : null}
      <div
        className="prose-ddx"
        dangerouslySetInnerHTML={{ __html: rewriteWpHtml(pub.bodyHtml) }}
      />
    </main>
  );
}
