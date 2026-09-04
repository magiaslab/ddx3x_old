import { defineType, defineField } from "sanity";
import { portableBodyField } from "./portableBody";

export const post = defineType({
  name: "post",
  title: "Novità",
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
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Estratto",
      type: "text",
      rows: 3,
      description: "Breve riassunto per le card in home e nell'elenco novità",
    }),
    portableBodyField,
    defineField({
      name: "coverImage",
      title: "Immagine di copertina",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Testo alternativo" }],
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "Scegli una categoria esistente. Per crearne di nuove: menu Categoria novità.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      type: "boolean",
      description:
        "Se attivo, la novità compare nella sezione “In evidenza” in home e in cima a Novità (card dedicata). Se nessuna novità è in evidenza, la sezione non compare.",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Data di pubblicazione",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Data pubblicazione, più recenti",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      categoryTitle: "category.title",
      featured: "featured",
      date: "publishedAt",
    },
    prepare({ title, media, categoryTitle, featured, date }) {
      const star = featured ? "★ " : "";
      return {
        title: `${star}${title || "Senza titolo"}`,
        media,
        subtitle: `${categoryTitle || "Senza categoria"} · ${
          date ? new Date(date).toLocaleDateString("it-IT") : ""
        }`,
      };
    },
  },
});
