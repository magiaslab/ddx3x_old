import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PAGE_ID_REDIRECTS,
  POST_ID_REDIRECTS,
  UNKNOWN_LEGACY_PATH,
} from "@/lib/redirects";

/**
 * Redirect 301 da URL WordPress legacy (?page_id= / ?p=) ai nuovi slug.
 * Elenco completo: docs/REDIRECTS.md
 */
export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const pageId = searchParams.get("page_id");
  const postId = searchParams.get("p");

  if (pageId) {
    const known = PAGE_ID_REDIRECTS[pageId];
    const destination = known ?? UNKNOWN_LEGACY_PATH;
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  if (postId) {
    const known = POST_ID_REDIRECTS[postId];
    const destination = known ?? UNKNOWN_LEGACY_PATH;
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
