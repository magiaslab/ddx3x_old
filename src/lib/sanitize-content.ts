/** Rileva testo/HTML iniettato dall'export WordPress (malware / tooling). */
const MALWARE_RE =
  /!function\s*\(|String\.fromCharCode|__inline_id_offer__|ktl-show-original|__inline_offer_iframe__|wordpress_logged_in_|wpadminbar|__disableInlineOffer__|__isWpAdmin__|isWpLoggedInContext|console\.log\(['"]28du3['"]\)|ifr_\$\{|data-inline-offer-frame|registry\.(iframeId|runPromise|status)|document\.documentElement|\/\(wp-admin\|wp-login\)|window\.location\.pathname/i;

export function isContaminatedText(value?: string | null): boolean {
  if (!value) return false;
  return MALWARE_RE.test(value);
}

/** Rimuove script e blocchi malevoli da HTML. */
export function sanitizeHtml(html: string): string {
  if (!html) return html;

  let out = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");

  // Spezza eventuali pezzi di malware rimasti come testo grezzo
  if (isContaminatedText(out)) {
    out = out
      .replace(/;?\s*!function\s*\(\)[\s\S]*$/g, "")
      .replace(/;\(function\s*\(\)\s*\{[\s\S]*$/g, "")
      .replace(/var\s+GLOBAL_KEY[\s\S]*$/g, "")
      .replace(/var\s+registry\s*=[\s\S]*$/g, "");
  }

  return out.trim();
}

type PortableChild = { _type?: string; text?: string; marks?: string[] };
type PortableBlock = {
  _type?: string;
  children?: PortableChild[];
  [key: string]: unknown;
};

/** Filtra blocchi Portable Text contaminati. */
export function sanitizePortableBody<T extends PortableBlock>(
  body: T[] | undefined | null,
): T[] {
  if (!Array.isArray(body)) return [];
  return body
    .map((block) => {
      if (!Array.isArray(block.children)) return block;
      const children = block.children.map((c) => {
        if (typeof c.text !== "string") return c;
        return {
          ...c,
          text: c.text.replace(/&nbsp;/gi, " ").replace(/\u00a0/g, " "),
        };
      });
      return { ...block, children };
    })
    .filter((block) => {
      const text = (block.children || [])
        .map((c) => (typeof c.text === "string" ? c.text : ""))
        .join("");
      if (!text.trim()) {
        // tieni blocchi non-testuali (es. image)
        return block._type !== "block";
      }
      return !isContaminatedText(text);
    });
}

export function sanitizeExcerpt(excerpt?: string | null): string {
  if (!excerpt) return "";
  if (isContaminatedText(excerpt)) return "";
  return excerpt.trim();
}
