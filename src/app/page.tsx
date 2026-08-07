import type { Metadata } from "next";
import Link from "next/link";
import { LatestNews } from "@/components/NewsCard";
import { getLatestPosts } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — Insieme per la Sindrome DDX3X`,
  },
  description: siteConfig.description,
};

export default async function HomePage() {
  const posts = await getLatestPosts(4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-stone-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(/media/wp/2025/09/Insieme-per-capire-sostenere-e-dare-voce-alla-Sindrome-DDX3X.png)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <p className="text-sm font-medium uppercase tracking-wider text-stone-200">
            {siteConfig.name}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
            Insieme per capire, sostenere e dare voce alla Sindrome DDX3X
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-200">
            Un&apos;associazione di famiglie per condividere esperienze,
            promuovere la ricerca e accompagnare chi vive con la mutazione del
            gene DDX3X.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dona"
              className="rounded bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 hover:bg-stone-100"
            >
              Dona ora
            </Link>
            <Link
              href="/contatti"
              className="rounded border border-white/60 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contattaci
            </Link>
            <Link
              href="/chi-siamo"
              className="rounded border border-transparent px-5 py-2.5 text-sm font-medium text-stone-200 underline-offset-2 hover:underline"
            >
              Chi siamo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
        <HomeCard
          title="Donazione all'Associazione DDX3X"
          body="Fondati da genitori e familiari di bambini con sindrome DDX3X. Il vostro supporto è fondamentale per nuove scoperte su questa rara sindrome."
          href="/dona"
          cta="Dona"
        />
        <HomeCard
          title="Le nostre storie"
          body="Testimonianze autentiche sulla vita quotidiana di chi convive con la Sindrome: forza, determinazione e speranza."
          href="/storie"
          cta="Leggi le storie"
        />
        <HomeCard
          title="Contatti"
          body="I protagonisti di questa esperienza siete voi e i vostri bambini. Condividere la vita quotidiana permette uno scambio utile a tutti."
          href="/contatti"
          cta="Scrivici"
        />
      </section>

      <LatestNews posts={posts} />
    </>
  );
}

function HomeCard({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="border-t-2 border-stone-900 pt-4">
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{body}</p>
      <Link
        href={href}
        className="mt-4 inline-block text-sm font-medium text-stone-900 underline-offset-2 hover:underline"
      >
        {cta} →
      </Link>
    </div>
  );
}
