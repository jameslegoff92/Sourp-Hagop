import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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
