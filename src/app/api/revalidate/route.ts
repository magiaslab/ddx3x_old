import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { SANITY_CACHE_TAG } from "@/lib/sanity";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

/**
 * Chiamata da webhook Sanity (Publish / Unpublish) per aggiornare il sito
 * subito, senza attendere il revalidate a tempo né un deploy.
 *
 * URL: POST https://www.ddx3x.it/api/revalidate?secret=…
 * Header opzionale: Authorization: Bearer …
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const provided =
    request.nextUrl.searchParams.get("secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!secret || provided !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: SanityWebhookBody = {};
  try {
    body = (await request.json()) as SanityWebhookBody;
  } catch {
    // webhook senza body: invalida comunque le liste
  }

  revalidateTag(SANITY_CACHE_TAG, "max");
  revalidatePath("/");
  revalidatePath("/novita");
  revalidatePath("/sitemap.xml");

  const slug =
    typeof body.slug === "string" ? body.slug : body.slug?.current;

  if (body._type === "post" && slug) {
    revalidatePath(`/novita/${slug}`);
  }
  if (body._type === "page" && slug) {
    revalidatePath(`/${slug}`);
  }
  if (body._type === "category") {
    revalidatePath("/");
    revalidatePath("/novita");
  }

  return NextResponse.json({
    revalidated: true,
    tag: SANITY_CACHE_TAG,
    slug: slug ?? null,
    now: Date.now(),
  });
}
