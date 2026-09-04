import type { Metadata } from "next";
import { FeaturedNewsSection } from "@/components/FeaturedNews";
import { NovitaListing } from "@/components/NovitaListing";
import { getPosts } from "@/lib/sanity";

/** Aggiorna l’elenco dopo Publish su Sanity, senza nuovo deploy. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Novità",
  description:
    "Campagne, eventi e comunicati dell'Associazione DDX3X Italia ODV.",
  alternates: { canonical: "/novita" },
};

export default async function NovitaPage() {
  const posts = await getPosts();
  const featured = posts.filter((p) => p.featured);

  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <header className="mb-8 max-w-3xl sm:mb-10">
        <h1 className="font-serif text-[1.65rem] font-semibold tracking-tight text-[var(--ink)] sm:text-3xl md:text-[2rem]">
          Novità
        </h1>
        <p className="mt-3 text-[var(--gray-600)]">
          Campagne, eventi e comunicati dell&apos;Associazione DDX3X Italia ODV.
        </p>
      </header>

      <FeaturedNewsSection posts={featured} variant="page" />

      <NovitaListing
        posts={posts}
        excludeIds={featured.map((p) => p._id)}
      />
    </main>
  );
}
