import { defineArrayMember, defineField, defineType } from "sanity";

/** Documento scaricabile (PDF, Word, Excel…) usato in Pagine e Novità */
export const attachment = defineType({
  name: "attachment",
  title: "Documento",
  type: "file",
  options: {
    accept:
      ".pdf,.doc,.docx,.odt,.rtf,.txt,.xls,.xlsx,.ods,.csv,.ppt,.pptx,.odp,.zip",
  },
  fields: [
    defineField({
      name: "title",
      title: "Titolo del documento",
      type: "string",
      description: "Come compare sul sito, es. “Bilancio 2025” o “Modulo di iscrizione”",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione breve",
      type: "string",
      description: "Opzionale: una riga sotto il titolo",
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value: { asset?: unknown } | undefined) =>
      value && !value.asset ? "Carica il file" : true,
    ),
  preview: {
    select: {
      title: "title",
      filename: "asset.originalFilename",
      extension: "asset.extension",
    },
    prepare({ title, filename, extension }) {
      return {
        title: title || filename || "Documento senza titolo",
        subtitle: [extension?.toUpperCase(), filename].filter(Boolean).join(" · "),
      };
    },
  },
});

/** Elenco documenti in fondo a pagine e novità (funziona anche sulle pagine importate da WordPress) */
export const attachmentsField = defineField({
  name: "attachments",
  title: "Documenti allegati",
  type: "array",
  description:
    "I file caricati qui compaiono in fondo alla pagina, sotto “Documenti”. Trascinali per cambiarne l'ordine.",
  of: [defineArrayMember({ type: "attachment" })],
});
