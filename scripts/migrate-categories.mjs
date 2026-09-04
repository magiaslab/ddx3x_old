/**
 * Crea le categorie base e collega i post che hanno ancora category come stringa.
 * Uso: node --env-file=.env.local scripts/migrate-categories.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Serve NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const DEFAULTS = [
  {
    slug: "campagna",
    title: "Campagna",
    color: "#6B4F12",
    background: "#FBF0D8",
  },
  {
    slug: "evento",
    title: "Evento",
    color: "#54407F",
    background: "#EDE7F6",
  },
  {
    slug: "comunicato",
    title: "Comunicato",
    color: "#2F6A28",
    background: "#E3F2DE",
  },
];

const existing = await client.fetch(
  `*[_type == "category"]{ _id, "slug": slug.current }`,
);
const bySlug = new Map(existing.map((c) => [c.slug, c._id]));

for (const cat of DEFAULTS) {
  if (bySlug.has(cat.slug)) {
    console.log("ok categoria", cat.slug, bySlug.get(cat.slug));
    continue;
  }
  const id = `category-${cat.slug}`;
  await client.createOrReplace({
    _id: id,
    _type: "category",
    title: cat.title,
    slug: { _type: "slug", current: cat.slug },
    color: cat.color,
    background: cat.background,
  });
  bySlug.set(cat.slug, id);
  console.log("creata categoria", cat.slug, id);
}

const posts = await client.fetch(
  `*[_type == "post"]{ _id, title, category }`,
);

let patched = 0;
for (const post of posts) {
  const cat = post.category;
  if (!cat) {
    console.warn("senza categoria:", post._id, post.title);
    continue;
  }
  // già reference
  if (typeof cat === "object" && cat._ref) {
    continue;
  }
  // legacy string
  if (typeof cat === "string") {
    const ref = bySlug.get(cat);
    if (!ref) {
      console.warn("slug categoria sconosciuto:", cat, "→", post._id);
      continue;
    }
    await client
      .patch(post._id)
      .set({
        category: { _type: "reference", _ref: ref },
      })
      .commit();
    patched += 1;
    console.log("collegato", post.title, "→", cat);
  }
}

console.log(`Fatto. Post aggiornati: ${patched}`);
