import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { ReactNode } from "react";
import { ConferenceRegistrationTracker } from "@/components/ConferenceRegistrationTracker";
import { PageShell } from "@/components/PageShell";
import type { CmsPage } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity";
import { rewriteWpHtml } from "@/lib/rewrite-wp-html";

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = rewriteWpHtml(value?.href || "#");
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset
        ? urlForImage(value)?.width(1200).url()
        : null;
      if (!src) return null;
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={value?.alt || ""} />;
    },
  },
};

export function CmsPageView({
  page,
  after,
}: {
  page: CmsPage;
  after?: ReactNode;
}) {
  // Preferisci bodyHtml dall'import WP: contiene immagini e markup completo.
  // Il Portable Text in Sanity è spesso solo testo senza asset immagine.
  const html = page.bodyHtml?.trim()
    ? rewriteWpHtml(page.bodyHtml)
    : "";
  const hasPortable = Array.isArray(page.body) && page.body.length > 0;

  return (
    <PageShell
      title={page.title}
      description={page.seoDescription}
      after={after}
    >
      <ConferenceRegistrationTracker />
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : hasPortable ? (
        <PortableText value={page.body!} components={portableComponents} />
      ) : (
        <p>Contenuto non ancora disponibile.</p>
      )}
    </PageShell>
  );
}
