import { defineRouting } from "next-intl/routing";

// 'hy' is the BCP-47/ISO 639-1 tag used for the site's Western Armenian
// content. This is a machine-facing tag choice only - the language served
// is still Western Armenian in classical orthography, translated by a
// Western Armenian speaker, never Eastern Armenian. 'hyw' (the ISO 639-3
// tag some earlier phases used) was tried first and reverted: it isn't
// recognized by Intl.DateTimeFormat/Intl.PluralRules (silent fallback to
// en-US), isn't a valid hreflang value, and isn't a lang="" screen readers
// know. See docs/adr/0001-architecture-i18n.md section 3.
export const routing = defineRouting({
  locales: ["fr", "hy"],
  defaultLocale: "fr",
  // Proposed, not yet approved by the project owner — see the ADR.
  localePrefix: "as-needed",
  localeDetection: false,
});
