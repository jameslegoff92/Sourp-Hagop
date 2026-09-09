// Single source of truth for the site's public origin - used to build
// absolute canonical/hreflang/sitemap URLs. Always points at production,
// even when this code runs on a staging/preview deployment: these URLs
// describe what the canonical site looks like, not whichever host is
// currently serving the request.
export const SITE_URL = "https://ecolesourphagop.com";
