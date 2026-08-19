import { defineRouting } from "next-intl/routing";

// 'hyw' = Western Armenian (classical orthography), deliberately not 'hy'.
// See docs/adr/0001-architecture-i18n.md for the rationale and the open
// hreflang question this raises.
export const routing = defineRouting({
  locales: ["fr", "hyw"],
  defaultLocale: "fr",
  // Proposed, not yet approved by the project owner — see the ADR.
  localePrefix: "as-needed",
  localeDetection: false,
});
