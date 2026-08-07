import type { Metadata } from "next";
import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { getPosts } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Novità",
  description:
    "Campagne, eventi e comunicati dell'Associazione DDX3X Italia ODV.",
};

export default async function NovitaPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Novità
        </h1>
        <p className="mt-3 text-stone-600">
          Campagne, eventi e comunicati dell&apos;Associazione. I contenuti sono
          gestiti tramite Sanity Studio (
          <Link href="/studio" className="underline">
            /studio
          </Link>
          ).
        </p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
