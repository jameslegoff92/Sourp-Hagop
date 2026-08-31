import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { PRIVATE_ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Disallows the admin sign-in under every locale it's reachable at
  // (both "/admin/login" and "/hy/admin/login" exist - see
  // generateStaticParams in app/[locale]/layout.jsx), generated from
  // PRIVATE_ROUTES/routing.locales rather than hand-listing each prefixed
  // URL.
  const disallow = routing.locales.flatMap((locale) =>
    PRIVATE_ROUTES.map((route) => getPathname({ href: route, locale }))
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
