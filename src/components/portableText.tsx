import { toPlainText, type PortableTextComponents } from "@portabletext/react";
import { AttachmentCard } from "@/components/Attachments";
import { urlForImage } from "@/lib/sanity";
import { rewriteWpHtml } from "@/lib/rewrite-wp-html";

/** "Fondazione Telethon e dott. Brusco" → "fondazione-telethon-e-dott-brusco" */
export function headingAnchor(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Componenti condivisi tra Pagine e Novità. */
export const portableComponents: PortableTextComponents = {
  block: {
    // Titolo di macro sezione (es. Ricerca in Italia)
    section: ({ children, value }) => (
      <h2 id={headingAnchor(toPlainText(value))} className="ricerca-macro">
        {children}
      </h2>
    ),
    h2: ({ children, value }) => (
      <h2 id={headingAnchor(toPlainText(value))}>{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={headingAnchor(toPlainText(value))}>{children}</h3>
    ),
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    index: ({ children }) => <ul className="ricerca-indice">{children}</ul>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = rewriteWpHtml(value?.href || "#");
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className={value?.button ? "btn-link" : undefined}
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
    attachment: ({ value }) => <AttachmentCard file={value} />,
  },
};
