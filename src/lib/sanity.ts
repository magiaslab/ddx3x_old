import { createClient, type QueryParams } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { seedPosts, type Post } from "@/content/seed-posts";

export type { Post };

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
    })
  : null;

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId: projectId!, dataset })
  : null;

export function urlForImage(source: SanityImageSource) {
  return builder?.image(source);
}

async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return null;
  }
}

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  coverImage,
  category,
  publishedAt
}`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  coverImage,
  category,
  publishedAt
}`;

export async function getPosts(): Promise<Post[]> {
  const fromSanity = await sanityFetch<Post[]>(postsQuery);
  if (fromSanity && fromSanity.length > 0) return fromSanity;
  return seedPosts;
}

export async function getLatestPosts(limit = 4): Promise<Post[]> {
  const posts = await getPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fromSanity = await sanityFetch<Post | null>(postBySlugQuery, { slug });
  if (fromSanity) return fromSanity;
  return seedPosts.find((p) => p.slug === slug) ?? null;
}
