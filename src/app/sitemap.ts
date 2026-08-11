import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";
import { stories } from "@/content/stories";
import { pubblicazioni } from "@/content/pubblicazioni";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  /** lastmod statiche: data deploy (Google ignora priority/changefreq). */
  const staticLastMod = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/novita", priority: 0.9 },
    { path: "/storie", priority: 0.8 },
    { path: "/chi-siamo", priority: 0.8 },
    { path: "/sindrome", priority: 0.8 },
    { path: "/dona", priority: 0.8 },
    { path: "/eventi/conferenza-internazionale", priority: 0.8 },
    { path: "/eventi/international-conference", priority: 0.8 },
    { path: "/missione-valori-vision", priority: 0.7 },
    { path: "/mappa-casi-registrati", priority: 0.7 },
    { path: "/statuto", priority: 0.6 },
    { path: "/bilanci", priority: 0.6 },
    { path: "/diagnosi", priority: 0.7 },
    { path: "/trattamenti-terapie", priority: 0.7 },
    { path: "/ricerca/italia", priority: 0.7 },
    { path: "/ricerca/mondo", priority: 0.7 },
    { path: "/pubblicazioni", priority: 0.7 },
    { path: "/dona/campagne", priority: 0.6 },
    { path: "/contatti", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
  ];

  const posts = await getPosts();

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${base}${path}`,
      lastModified: staticLastMod,
      changeFrequency: "weekly" as const,
      priority,
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
