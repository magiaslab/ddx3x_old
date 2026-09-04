import { existsSync } from "fs";
import path from "path";

/** Se esiste il .webp corrispondente in public/, usalo (immagini WP ottimizzate). */
export function preferLocalWebp(url: string): string {
  if (!url.startsWith("/media/")) return url;
  if (/\.webp$/i.test(url)) return url;
  if (!/\.(png|jpe?g)$/i.test(url)) return url;
  const webp = url.replace(/\.(png|jpe?g)$/i, ".webp");
  const abs = path.join(process.cwd(), "public", webp.replace(/^\//, ""));
  return existsSync(abs) ? webp : url;
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
