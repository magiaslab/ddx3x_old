import type { NextConfig } from "next";

/**
 * I redirect da ?page_id= / ?p= sono in src/middleware.ts
 * (mappa in src/lib/redirects.ts, elenco in docs/REDIRECTS.md).
 *
 * Motivo: next.config redirects() con `has: query` inoltra i query param
 * alla destination (es. /diagnosi?page_id=1528). Il middleware garantisce
 * 301 verso slug puliti e gestisce gli id sconosciuti → /pagina-non-trovata.
 *
 * Apex → www: anche in middleware; qui come rete di sicurezza a livello edge.
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.ddx3x.it" },
      { protocol: "https", hostname: "ddx3x.it" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ddx3x.it" }],
        destination: "https://www.ddx3x.it/:path*",
        permanent: true,
      },
      // WP uploads → media migrati (es. GeneReviews PDF ancora in GSC)
      {
        source: "/wp-content/uploads/:path*",
        destination: "/media/wp/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
