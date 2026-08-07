import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";
import { stories } from "@/content/stories";
import { pubblicazioni } from "@/content/pubblicazioni";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/chi-siamo",
    "/missione-valori-vision",
    "/mappa-casi-registrati",
    "/statuto",
    "/bilanci",
    "/sindrome",
    "/diagnosi",
    "/trattamenti-terapie",
    "/ricerca/italia",
    "/ricerca/mondo",
    "/pubblicazioni",
    "/eventi/conferenza-internazionale",
    "/dona",
    "/dona/campagne",
    "/storie",
    "/contatti",
    "/novita",
    "/privacy",
  ];

  const posts = await getPosts();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${base}/novita/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...stories.map((s) => ({
      url: `${base}/storie/${s.slug}`,
      lastModified: new Date(s.publishedAt.replace(" ", "T")),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...pubblicazioni.map((p) => ({
      url: `${base}/pubblicazioni/${p.slug}`,
      lastModified: new Date(p.date.replace(" ", "T")),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
