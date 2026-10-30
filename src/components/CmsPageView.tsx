import { PortableText } from "@portabletext/react";
import type { ReactNode } from "react";
import { AttachmentList } from "@/components/Attachments";
import { ConferenceRegistrationTracker } from "@/components/ConferenceRegistrationTracker";
import { PageShell } from "@/components/PageShell";
import { portableComponents } from "@/components/portableText";
import type { CmsPage } from "@/lib/sanity";
import { rewriteWpHtml } from "@/lib/rewrite-wp-html";

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
      <AttachmentList files={page.attachments} />
    </PageShell>
  );
}
