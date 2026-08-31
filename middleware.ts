import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const response = await intlMiddleware(request);
  // Exposes the resolved request path to generateMetadata (see
  // app/[locale]/layout.jsx) so hreflang alternates can be built for
  // whichever page is actually being served - the [locale] layout's own
  // params only carry the locale segment, not the route beneath it, and
  // there's no other way to read the current path from a shared layout
  // without hand-writing alternates into every individual page.jsx.
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  // Matches every path except:
  //  - /api/**      (route handlers, no HTML to localize)
  //  - /_next/**    (Next.js internals)
  //  - /_vercel/**  (Vercel platform internals)
  //  - any path containing a literal dot (favicon.ico, /images/foo.png, etc.)
  // /admin is intentionally NOT excluded: admin/login now lives under
  // app/[locale]/ (see phase 3 ADR addendum) so the middleware must run on
  // it too, even though its URL stays unprefixed under localePrefix
  // 'as-needed'.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
