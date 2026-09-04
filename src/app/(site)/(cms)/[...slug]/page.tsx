import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageView } from "@/components/CmsPageView";
import { getPageBySlug, getPages } from "@/lib/sanity";

/** Pagine CMS: aggiornamento dopo Publish senza nuovo deploy. */
export const revalidate = 60;

/** Route già gestite da cartelle dedicate — non devono passare dal catch-all. */
const RESERVED = new Set([
  "api",
  "studio",
  "novita",
  "storie",
  "pubblicazioni",
  "dona",
  "privacy",
  "pagina-non-trovata",
  "chi-siamo",
  "missione-valori-vision",
  "sindrome",
  "diagnosi",
  "trattamenti-terapie",
  "mappa-casi-registrati",
  "statuto",
  "bilanci",
  "contatti",
  "ricerca",
  "eventi",
]);

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  const pages = await getPages();
  return pages
    .filter((p) => {
      const first = p.slug.split("/")[0];
      return !RESERVED.has(first) && !RESERVED.has(p.slug);
    })
    .map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug?.length) return {};
  const path = slug.join("/");
  const page = await getPageBySlug(path);
  return {
    title: page?.title,
    description: page?.seoDescription,
  };
}

export default async function CmsCatchAllPage({ params }: Props) {
  const { slug } = await params;
  if (!slug?.length) notFound();

  const first = slug[0];
  if (RESERVED.has(first)) notFound();

  const path = slug.join("/");
  const page = await getPageBySlug(path);
  if (!page) notFound();

  return <CmsPageView page={page} />;
}
