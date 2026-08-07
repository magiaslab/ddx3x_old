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
    .replace(
      /https?:\/\/(?:www\.)?ddx3x\.it\/\?(page_id|p)=(\d+)/gi,
      (_m, kind: string, id: string) => resolveLegacyId(kind, id),
    )
    .replace(/\?(page_id|p)=(\d+)/gi, (_m, kind: string, id: string) =>
      resolveLegacyId(kind, id),
    )
    .replace(/https?:\/\/(?:www\.)?ddx3x\.it(?=\/|"|'|\s|>|$)/gi, "");
}

function resolveLegacyId(kind: string, id: string): string {
  const map = kind.toLowerCase() === "p" ? POST_ID_REDIRECTS : PAGE_ID_REDIRECTS;
  return map[id] || UNKNOWN_LEGACY_PATH;
}
