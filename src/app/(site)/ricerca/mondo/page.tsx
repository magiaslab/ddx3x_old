import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageView } from "@/components/CmsPageView";
import { getPageBySlug } from "@/lib/sanity";
import { withCanonical } from "@/lib/site";

const SLUG = "ricerca/mondo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return withCanonical(`/${SLUG}`, {
    title: page?.title || SLUG,
    description: page?.seoDescription,
  });
}

export default async function Page() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();
  return <CmsPageView page={page} />;
}
