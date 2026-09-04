import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageView } from "@/components/CmsPageView";
import { getPageBySlug } from "@/lib/sanity";
import { withCanonical } from "@/lib/site";

/** Sempre fresco da Sanity. */
export const dynamic = "force-dynamic";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug?.length) return {};
  const path = slug.join("/");
  const page = await getPageBySlug(path);
  return withCanonical(`/${path}`, {
    title: page?.title,
    description: page?.seoDescription,
  });
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
