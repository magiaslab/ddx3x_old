import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categoria novità",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      description: "Come compare sul sito (es. Campagna, Evento…)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Colore testo badge",
      type: "string",
      description: "Codice colore esadecimale, es. #6B4F12",
      initialValue: "#54407F",
    }),
    defineField({
      name: "background",
      title: "Colore sfondo badge",
      type: "string",
      description: "Codice colore esadecimale, es. #EDE7F6",
      initialValue: "#EDE7F6",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `/${subtitle}` : "" };
    },
  },
});
