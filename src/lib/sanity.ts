import { createClient, type QueryParams } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { seedPosts, type Post, type PortableTextBlock } from "@/content/seed-posts";
import { seedPages } from "@/content/seed-pages";
import {
  sanitizeExcerpt,
  sanitizePortableBody,
} from "@/lib/sanitize-content";
import { rewriteWpHtml } from "@/lib/rewrite-wp-html";

export type { Post, PortableTextBlock };

export type CmsPage = {
  _id: string;
  title: string;
  slug: string;
  seoDescription?: string;
  body?: PortableTextBlock[];
  bodyHtml?: string;
  showInNav?: boolean;
  navLabel?: string;
  navGroup?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const isSanityConfigured = Boolean(
  projectId && projectId !== "placeholder",
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId: projectId!, dataset })
  : null;

export function urlForImage(source: SanityImageSource) {
  return builder?.image(source);
}

async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return null;
  }
}

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, body,
  coverImage{ alt, asset->{ url } },
  category, publishedAt
}`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, excerpt, body,
  coverImage{ alt, asset->{ url } },
  category, publishedAt
}`;

/** Integra cover locali dal seed e pulisce testo contaminato dall'export WP. */
function enrichPost(post: Post): Post {
  const seed = seedPosts.find((s) => s.slug === post.slug);
  const coverImageUrl =
    post.coverImageUrl ||
    post.coverImage?.asset?.url ||
    seed?.coverImageUrl ||
    undefined;
  const excerpt =
    sanitizeExcerpt(post.excerpt) || sanitizeExcerpt(seed?.excerpt) || "";
  const body = Array.isArray(post.body)
    ? sanitizePortableBody(post.body)
    : post.body;

  return {
    ...post,
    coverImageUrl,
    excerpt,
    body,
  };
}

function enrichPage(page: CmsPage): CmsPage {
  return {
    ...page,
    body: Array.isArray(page.body)
      ? sanitizePortableBody(page.body)
      : page.body,
    bodyHtml: page.bodyHtml ? rewriteWpHtml(page.bodyHtml) : page.bodyHtml,
  };
}

const pagesQuery = `*[_type == "page"] | order(title asc) {
  _id, title, "slug": slug.current, seoDescription, body, bodyHtml, showInNav, navLabel, navGroup
}`;

const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, seoDescription, body, bodyHtml, showInNav, navLabel, navGroup
}`;

const navPagesQuery = `*[_type == "page" && showInNav == true] | order(title asc) {
  _id, title, "slug": slug.current, navLabel, navGroup
}`;

export async function getPosts(): Promise<Post[]> {
  const fromSanity = await sanityFetch<Post[]>(postsQuery);
  if (fromSanity && fromSanity.length > 0) {
    return fromSanity.map(enrichPost);
  }
  return seedPosts.map(enrichPost);
}

export async function getLatestPosts(limit = 4): Promise<Post[]> {
  return (await getPosts()).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fromSanity = await sanityFetch<Post | null>(postBySlugQuery, { slug });
  if (fromSanity) return enrichPost(fromSanity);
  const seed = seedPosts.find((p) => p.slug === slug);
  return seed ? enrichPost(seed) : null;
}

export async function getPages(): Promise<CmsPage[]> {
  const fromSanity = await sanityFetch<CmsPage[]>(pagesQuery);
  if (fromSanity && fromSanity.length > 0) return fromSanity.map(enrichPage);
  return seedPages.map((p) => enrichPage({ ...p }));
}

export async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  const fromSanity = await sanityFetch<CmsPage | null>(pageBySlugQuery, {
    slug,
  });
  if (fromSanity) return enrichPage(fromSanity);
  const seed = seedPages.find((p) => p.slug === slug);
  return seed ? enrichPage({ ...seed }) : null;
}

export async function getNavPages(): Promise<
  Pick<CmsPage, "title" | "slug" | "navLabel" | "navGroup">[]
> {
  const fromSanity = await sanityFetch<
    Pick<CmsPage, "title" | "slug" | "navLabel" | "navGroup">[]
  >(navPagesQuery);
  if (fromSanity) return fromSanity;
  return seedPages
    .filter((p) => p.showInNav)
    .map(({ title, slug, navLabel, navGroup }) => ({
      title,
      slug,
      navLabel,
      navGroup,
    }));
}
