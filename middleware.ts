import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

// Wired to i18n/routing.ts but intentionally inert for phase 2: the matcher
// below is empty, so this middleware never runs and no rendered output
// changes. It activates in phase 3 — at that point its matcher must exclude
// /api, /admin, /_next, and static files.
export default createMiddleware(routing);

export const config = {
  matcher: [],
};
