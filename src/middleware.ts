import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PAGE_ID_REDIRECTS,
  POST_ID_REDIRECTS,
  UNKNOWN_LEGACY_PATH,
} from "@/lib/redirects";

/**
 * - Apex ddx3x.it → www (quando la richiesta arriva all'app)
 * - Redirect 301 da URL WordPress legacy (?page_id= / ?p=) ai nuovi slug
 *
 * Elenco completo page_id/p: docs/REDIRECTS.md
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";

  if (host === "ddx3x.it") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.ddx3x.it";
    return NextResponse.redirect(url, 301);
  }

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
  matcher: [
    /*
     * Apex redirect su tutte le path; page_id/p tipicamente su /.
     * Escludi asset statici e file con estensione.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
