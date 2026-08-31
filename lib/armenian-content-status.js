// Whether hy pages are allowed to be indexed by search engines. See
// docs/adr/0001-architecture-i18n.md, section 6.
//
// The condition for flipping this to true is REAL TRANSLATED CONTENT
// existing in Sanity - not the completion of any technical/engineering
// work. hreflang, the sitemap, and Armenian typography (phase 7) are all
// already shipped; none of that is what this flag is waiting on.
//
// This is the project owner's call, not an engineering one - flip it when
// there's actually something in Armenian for a search engine to index.
// It's a single whole-locale switch because hy content is at 0% today
// (every hy page currently serves French through the GROQ fallback, so
// there is no partial state to represent yet); if translation ever lands
// page-by-page rather than all at once, this will need to become a
// per-page check instead of one constant - not a problem to solve now,
// since it doesn't exist yet.
export const ARMENIAN_CONTENT_TRANSLATED = false;
