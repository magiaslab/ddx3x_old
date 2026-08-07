import { defineType, defineField } from "sanity";

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
    defineField({
      name: "body",
      title: "Contenuto",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normale", value: "normal" },
            { title: "Titolo 2", value: "h2" },
            { title: "Titolo 3", value: "h3" },
            { title: "Citazione", value: "blockquote" },
          ],
          lists: [
            { title: "Elenco", value: "bullet" },
            { title: "Numerato", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Grassetto", value: "strong" },
              { title: "Corsivo", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Testo alternativo" }],
        },
      ],
    }),
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
      type: "string",
      options: {
        list: [
          { title: "Campagna", value: "campagna" },
          { title: "Evento", value: "evento" },
          { title: "Comunicato", value: "comunicato" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
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
      category: "category",
      date: "publishedAt",
    },
    prepare({ title, media, category, date }) {
      return {
        title,
        media,
        subtitle: `${category || ""} · ${date ? new Date(date).toLocaleDateString("it-IT") : ""}`,
      };
    },
  },
});
