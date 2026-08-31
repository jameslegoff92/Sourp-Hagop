import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { PUBLIC_ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site-url";

// /confidentialite and /termes are included here like every other public
// route, even though both are static, locale-blind English legal pages
// (no Header/Footer, no useTranslations - see app/[locale]/confidentialite
// /page.jsx) that render byte-identical content at their fr and hy URLs.
// That's still a case for hreflang, not against it: without it, Google has
// two indexable URLs with identical content and no declared relationship
// between them - the classic duplicate-content situation hreflang exists
// to resolve. Declaring them as alternates of each other is accurate
// (they *are* the same content) and lets ranking signals consolidate onto
// whichever URL matches the visitor's locale, instead of splitting between
// two unrelated-looking pages.
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${getPathname({ href: route, locale })}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}${getPathname({ href: route, locale: l })}`])
        ),
      },
    }))
  );
}
