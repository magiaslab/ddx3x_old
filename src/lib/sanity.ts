import { createClient, type QueryParams } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import {
  seedPosts,
  normalizeCategory,
  type Post,
  type PortableTextBlock,
} from "@/content/seed-posts";
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

/** Solo per sviluppo locale senza Sanity configurato. */
export const SANITY_CACHE_TAG = "sanity";

export const isSanityConfigured = Boolean(
  projectId && projectId !== "placeholder",
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: false,
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
    // no-store: Publish / Unpublish / Delete devono riflettersi subito (niente cache Next)
    return await sanityClient.fetch<T>(query, params, {
      cache: "no-store",
    });
  } catch {
    return null;
  }
}

const postProjection = `{
  _id, title, "slug": slug.current, excerpt, body,
  coverImage{ alt, asset->{ url } },
  "category": select(
    defined(category->_id) => {
      "title": category->title,
      "slug": category->slug.current,
      "color": category->color,
      "background": category->background
    },
    category
  ),
  featured,
  publishedAt
}`;

const postsQuery = `*[_type == "post"] | order(publishedAt desc) ${postProjection}`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${postProjection}`;

const featuredPostsQuery = `*[_type == "post" && featured == true] | order(publishedAt desc) ${postProjection}`;

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
    featured: Boolean(post.featured ?? seed?.featured),
    category: normalizeCategory(post.category ?? seed?.category),
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
  if (!isSanityConfigured) return seedPosts.map(enrichPost);
  const fromSanity = await sanityFetch<Post[]>(postsQuery);
  // Non ripescare i seed: altrimenti un post cancellato in Studio resta online
  if (!fromSanity) return [];
  return fromSanity.map(enrichPost);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  if (!isSanityConfigured) {
    return seedPosts.filter((p) => p.featured).map(enrichPost);
  }
  const fromSanity = await sanityFetch<Post[]>(featuredPostsQuery);
  if (!fromSanity) return [];
  return fromSanity.map(enrichPost);
}

export async function getLatestPosts(
  limit = 4,
  options?: { excludeIds?: string[] },
): Promise<Post[]> {
  const exclude = new Set(options?.excludeIds ?? []);
  return (await getPosts())
    .filter((p) => !exclude.has(p._id))
    .slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    const seed = seedPosts.find((p) => p.slug === slug);
    return seed ? enrichPost(seed) : null;
  }
  const fromSanity = await sanityFetch<Post | null>(postBySlugQuery, { slug });
  // Nessun fallback seed: delete/unpublish → 404
  return fromSanity ? enrichPost(fromSanity) : null;
}

export async function getPages(): Promise<CmsPage[]> {
  if (!isSanityConfigured) {
    return seedPages.map((p) => enrichPage({ ...p }));
  }
  const fromSanity = await sanityFetch<CmsPage[]>(pagesQuery);
  if (!fromSanity) return [];
  return fromSanity.map(enrichPage);
}

export async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  if (!isSanityConfigured) {
    const seed = seedPages.find((p) => p.slug === slug);
    return seed ? enrichPage({ ...seed }) : null;
  }
  const fromSanity = await sanityFetch<CmsPage | null>(pageBySlugQuery, {
    slug,
  });
  return fromSanity ? enrichPage(fromSanity) : null;
}

export async function getNavPages(): Promise<
  Pick<CmsPage, "title" | "slug" | "navLabel" | "navGroup">[]
> {
  if (!isSanityConfigured) {
    return seedPages
      .filter((p) => p.showInNav)
      .map(({ title, slug, navLabel, navGroup }) => ({
        title,
        slug,
        navLabel,
        navGroup,
      }));
  }
  const fromSanity = await sanityFetch<
    Pick<CmsPage, "title" | "slug" | "navLabel" | "navGroup">[]
  >(navPagesQuery);
  return fromSanity ?? [];
}
