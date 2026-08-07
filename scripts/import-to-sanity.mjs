/**
 * Importa pagine e novità seed in Sanity (richiede SANITY_API_WRITE_TOKEN = Editor).
 * Uso: node --env-file=.env.local scripts/import-to-sanity.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { pathToFileURL } from "url";

async function loadTsDefault(relPath) {
  // seed files are TS — read JSON-like exports via dynamic transpile not available;
  // parse the exported arrays from compiled-like JSON embedded in the files.
  const src = readFileSync(relPath, "utf8");
  const match = src.match(/export const \w+[^=]*=\s*(\[[\s\S]*\]);?\s*$/);
  if (!match) throw new Error(`Cannot parse array export from ${relPath}`);
  return Function(`"use strict"; return (${match[1]})`)();
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Serve NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function htmlToBlocks(html) {
  if (!html) return [];
  const parts = String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h2|h3|li|div)>/gi, "\n\n")
    .replace(/<h2[^>]*>/gi, "\n\n## ")
    .replace(/<h3[^>]*>/gi, "\n\n### ")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, "\n\n[IMG:$1]\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .split(/\n{2,}/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return parts.map((text, i) => {
    if (text.startsWith("[IMG:")) {
      // keep as paragraph with URL note — images stay in bodyHtml
      const url = text.slice(5, -1);
      return {
        _type: "block",
        _key: `i${i}`,
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: `(immagine: ${url})`, marks: [] }],
      };
    }
    let style = "normal";
    if (text.startsWith("## ")) {
      style = "h2";
      text = text.slice(3);
    } else if (text.startsWith("### ")) {
      style = "h3";
      text = text.slice(4);
    }
    return {
      _type: "block",
      _key: `b${i}`,
      style,
      markDefs: [],
      children: [{ _type: "span", text, marks: [] }],
    };
  });
}

const seedPages = await loadTsDefault("src/content/seed-pages.ts");
const seedPosts = await loadTsDefault("src/content/seed-posts.ts");

const mutations = [];

for (const p of seedPages) {
  mutations.push({
    createOrReplace: {
      _id: p._id,
      _type: "page",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      seoDescription: p.seoDescription || "",
      bodyHtml: p.bodyHtml || "",
      body: htmlToBlocks(p.bodyHtml),
      showInNav: Boolean(p.showInNav),
      navLabel: p.navLabel || "",
      navGroup: p.navGroup || "root",
    },
  });
}

for (const p of seedPosts) {
  mutations.push({
    createOrReplace: {
      _id: p._id,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt || "",
      body: p.body || [],
      category: p.category,
      publishedAt: p.publishedAt,
      // cover: URL locale — Studio può sostituire con asset Sanity
    },
  });
}

console.log(`Importing ${seedPages.length} pages + ${seedPosts.length} posts…`);

// Sanity mutate max ~100 mutations per request — chunk
const chunkSize = 20;
for (let i = 0; i < mutations.length; i += chunkSize) {
  const chunk = mutations.slice(i, i + chunkSize);
  const res = await client.mutate(chunk, { returnDocuments: false });
  console.log(`chunk ${i / chunkSize + 1}:`, res.results?.length ?? chunk.length, "ok");
}

const counts = await client.fetch(`{
  "pages": count(*[_type=="page"]),
  "posts": count(*[_type=="post"])
}`);
console.log("Done. Counts:", counts);
