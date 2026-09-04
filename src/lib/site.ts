import type { Metadata } from "next";

const CANONICAL_ORIGIN = "https://www.ddx3x.it";

/**
 * URL pubblico canonico. Evita di pubblicare sitemap/canonical su *.vercel.app
 * anche se NEXT_PUBLIC_SITE_URL è assente o puntato per errore all'alias preview.
 */
function resolveSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_ORIGIN).replace(
    /\/$/,
    "",
  );
  if (
    !raw.startsWith("http") ||
    raw.includes("vercel.app") ||
    raw.includes("localhost") ||
    raw.includes("127.0.0.1")
  ) {
    return CANONICAL_ORIGIN;
  }
  return raw;
}

export const siteConfig = {
  name: "Associazione DDX3X Italia ODV",
  shortName: "DDX3X Italia",
  description:
    "Insieme per capire, sostenere e dare voce alla Sindrome DDX3X. Associazione di famiglie, ricerca e supporto.",
  url: resolveSiteUrl(),
  email: "info@ddx3x.it",
  locale: "it_IT",
  language: "it",
  /** Immagine default per Open Graph / Twitter (assoluta via metadataBase). */
  ogImage: "/logo-color.png",
  social: {
    facebook:
      "https://www.facebook.com/p/Associazione-DDX3X-ODV-100064708989391/",
    instagram: "https://www.instagram.com/ddx3x_italia/",
  },
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return siteConfig.url;
  return `${siteConfig.url}${normalized}`;
}

/**
 * Metadata di pagina con canonical self-referenziante.
 * Non impostare canonical nel root layout: verrebbe ereditato su tutte le route.
 */
export function withCanonical(
  path: string,
  meta: {
    title?: string | Metadata["title"];
    description?: string | null;
    openGraph?: Metadata["openGraph"];
    [key: string]: unknown;
  } = {},
): Metadata {
  const canonical =
    !path || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;
  const { description, openGraph, ...rest } = meta;
  return {
    ...rest,
    ...(description ? { description } : {}),
    alternates: { canonical },
    openGraph: {
      ...(typeof openGraph === "object" && openGraph ? openGraph : {}),
      url: absoluteUrl(canonical),
    },
  };
}

/** Organization + WebSite per la root (e pagine che non hanno schema proprio). */
export function organizationWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        email: siteConfig.email,
        logo: absoluteUrl("/logo-color.png"),
        image: absoluteUrl("/logo-color.png"),
        sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
        areaServed: {
          "@type": "Country",
          name: "Italia",
        },
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
