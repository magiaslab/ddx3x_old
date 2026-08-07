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
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <header className="mb-8 max-w-3xl sm:mb-10">
        <h1 className="font-serif text-[1.65rem] font-semibold tracking-tight text-[var(--ink)] sm:text-3xl md:text-[2rem]">
          Novità
        </h1>
        <p className="mt-3 text-[var(--gray-600)]">
          Campagne, eventi e comunicati dell&apos;Associazione. I contenuti sono
          gestiti tramite Sanity Studio (
          <Link href="/studio" className="font-semibold text-[var(--purple-600)] no-underline hover:text-[var(--purple-700)]">
            /studio
          </Link>
          ).
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
