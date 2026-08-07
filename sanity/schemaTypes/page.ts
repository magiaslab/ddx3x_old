import { defineType, defineField } from "sanity";
import { portableBodyField } from "./portableBody";

export const page = defineType({
  name: "page",
  title: "Pagine",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description:
        "Es. chi-siamo → /chi-siamo. Per percorsi annidati usa ricerca/italia → /ricerca/italia",
      options: { source: "title", maxLength: 120 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description (SEO)",
      type: "text",
      rows: 2,
    }),
    portableBodyField,
    defineField({
      name: "bodyHtml",
      title: "Contenuto HTML (migrazione)",
      type: "text",
      rows: 8,
      description:
        "Usato in automatico per le pagine importate da WordPress. Se compili anche l'editor visuale sopra, ha priorità l'editor.",
      hidden: ({ value, document }) =>
        !value && Boolean(document?.body && Array.isArray(document.body) && document.body.length),
    }),
    defineField({
      name: "showInNav",
      title: "Mostra nel menu",
      type: "boolean",
      initialValue: false,
      description:
        "Se attivo, la pagina compare nel menu (voce aggiuntiva in fondo, o nel gruppo scelto).",
    }),
    defineField({
      name: "navLabel",
      title: "Etichetta menu",
      type: "string",
      description: "Opzionale: se vuoto usa il titolo",
      hidden: ({ parent }) => !parent?.showInNav,
    }),
    defineField({
      name: "navGroup",
      title: "Gruppo menu",
      type: "string",
      options: {
        list: [
          { title: "Voce di primo livello", value: "root" },
          { title: "L'Associazione", value: "associazione" },
          { title: "Sindrome DDX3X", value: "sindrome" },
          { title: "La Ricerca", value: "ricerca" },
          { title: "Eventi & Iniziative", value: "eventi" },
          { title: "Donazioni", value: "donazioni" },
        ],
        layout: "dropdown",
      },
      initialValue: "root",
      hidden: ({ parent }) => !parent?.showInNav,
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      showInNav: "showInNav",
    },
    prepare({ title, slug, showInNav }) {
      return {
        title,
        subtitle: `/${slug || "…"}${showInNav ? " · in menu" : ""}`,
      };
    },
  },
});
