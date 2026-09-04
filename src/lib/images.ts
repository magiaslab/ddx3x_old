/** Path locali per cui abbiamo già generato un .webp in public/. */
const LOCAL_WEBP: Record<string, string> = {
  "/media/wp/2025/09/Insieme-per-capire-sostenere-e-dare-voce-alla-Sindrome-DDX3X.png":
    "/media/wp/2025/09/hero-home.webp",
  "/media/wp/2025/09/Mappa-dei-casi-1.png":
    "/media/wp/2025/09/mappa-casi.webp",
  "/media/wp/2026/02/uova-di-pasqua-2026.png":
    "/media/wp/2026/02/uova-di-pasqua-2026.webp",
  "/media/wp/2026/01/DDX3X-Conference-5-6-May-2026-1-1.png":
    "/media/wp/2026/01/DDX3X-Conference-5-6-May-2026-1-1.webp",
  "/media/wp/2025/11/Sostieni-lAssociazione-DDX3X-1-2.png":
    "/media/wp/2025/11/Sostieni-lAssociazione-DDX3X-1-2.webp",
};

/** Usa la variante WebP se presente nella mappa (niente `fs`: safe anche in client). */
export function preferLocalWebp(url: string): string {
  if (!url.startsWith("/media/")) return url;
  return LOCAL_WEBP[url] ?? url;
}

/** Riduce peso immagini Sanity CDN (width + webp). */
export function optimizeRemoteImageUrl(
  url: string,
  width = 960,
  quality = 75,
): string {
  try {
    if (!url.includes("cdn.sanity.io")) return preferLocalWebp(url);
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.set("fm", "webp");
    u.searchParams.set("q", String(quality));
    u.searchParams.set("fit", "max");
    return u.toString();
  } catch {
    return url;
  }
}

export function optimizeCoverUrl(
  url: string | null | undefined,
  width = 960,
): string | null {
  if (!url) return null;
  return optimizeRemoteImageUrl(url, width);
}
