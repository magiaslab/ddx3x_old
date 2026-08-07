import { defineArrayMember, defineField } from "sanity";

/** Blocco rich text condiviso tra Novità e Pagine */
export const portableBodyField = defineField({
  name: "body",
  title: "Contenuto (editor visuale)",
  type: "array",
  of: [
    defineArrayMember({
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
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto"],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Testo alternativo" }],
    }),
  ],
});
