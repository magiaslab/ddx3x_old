import {
  PAGE_ID_REDIRECTS,
  POST_ID_REDIRECTS,
  UNKNOWN_LEGACY_PATH,
} from "@/lib/redirects";
import { sanitizeHtml } from "@/lib/sanitize-content";

/** Converte URL WordPress legacy e rimuove script iniettati dall'export. */
export function rewriteWpHtml(html: string): string {
  if (!html) return html;

  return sanitizeHtml(html)
    .replace(
      /https?:\/\/(?:www\.)?ddx3x\.it\/wp-content\/uploads\//gi,
      "/media/wp/",
    )
    .replace(/\/wp-content\/uploads\//gi, "/media/wp/")
    // Varianti WebP già generate per asset molto pesanti
    .replace(
      /\/media\/wp\/2026\/02\/uova-di-pasqua-2026\.png/gi,
      "/media/wp/2026/02/uova-di-pasqua-2026.webp",
    )
    .replace(
      /\/media\/wp\/2026\/01\/DDX3X-Conference-5-6-May-2026-1-1\.png/gi,
      "/media/wp/2026/01/DDX3X-Conference-5-6-May-2026-1-1.webp",
    )
    .replace(
      /\/media\/wp\/2025\/11\/Sostieni-lAssociazione-DDX3X-1-2\.png/gi,
      "/media/wp/2025/11/Sostieni-lAssociazione-DDX3X-1-2.webp",
    )
    .replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"')
    .replace(
      /https?:\/\/(?:www\.)?ddx3x\.it\/\?(page_id|p)=(\d+)/gi,
      (_m, kind: string, id: string) => resolveLegacyId(kind, id),
    )
    .replace(/\?(page_id|p)=(\d+)/gi, (_m, kind: string, id: string) =>
      resolveLegacyId(kind, id),
    )
    .replace(/https?:\/\/(?:www\.)?ddx3x\.it(?=\/|"|'|\s|>|$)/gi, "")
    // After domain strip, protocol-relative "//path" must become absolute "/path"
    .replace(
      /(href|src)=(["'])\/\/(?!\/)/gi,
      (_m, attr: string, q: string) => `${attr}=${q}/`,
    );
}

function resolveLegacyId(kind: string, id: string): string {
  const map = kind.toLowerCase() === "p" ? POST_ID_REDIRECTS : PAGE_ID_REDIRECTS;
  return map[id] || UNKNOWN_LEGACY_PATH;
}
