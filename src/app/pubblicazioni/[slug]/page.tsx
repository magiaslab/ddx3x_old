import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pubblicazioni } from "@/content/pubblicazioni";

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
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-6 text-sm">
        <Link
          href="/pubblicazioni"
          className="text-stone-600 underline-offset-2 hover:underline"
        >
          ← Tutte le pubblicazioni
        </Link>
      </p>
      <header className="mb-8 border-b border-stone-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          {pub.title}
        </h1>
        <time className="mt-3 block text-sm text-stone-500">
          {new Date(pub.date.replace(" ", "T")).toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </header>
      {pub.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={pub.image} alt="" className="mb-8 max-h-80 rounded object-contain" />
      ) : null}
      <div
        className="prose-ddx"
        dangerouslySetInnerHTML={{ __html: pub.bodyHtml }}
      />
    </main>
  );
}
