import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { itITLocale } from "@sanity/locale-it-it";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "ddx3x",
  title: "DDX3X Italia — CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool(),
    // UI in italiano (scelta dal menu utente in Studio; inglese resta disponibile)
    itITLocale({ title: "Italiano" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
