// Every statically-generated route under app/[locale]/, one entry per
// route regardless of locale - both /route (fr) and /hy/route (hy) are
// generated from each entry (see i18n/routing.ts, generateStaticParams in
// app/[locale]/layout.jsx). Single source of truth so the sitemap, robots,
// and the smoke test (scripts/smoke-routes.mjs) can't drift apart.
export const ROUTES = [
  "/",
  "/activites-parascolaires",
  "/admin/login",
  "/admissions",
  "/agora",
  "/aigles",
  "/anciens",
  "/bibliotheque",
  "/calendrier",
  "/carrieres",
  "/comite-parents",
  "/confidentialite",
  "/conseil-administration",
  "/conseil-etudiant",
  "/crealab",
  "/droits",
  "/equipe",
  "/historique",
  "/jardin-litteraire",
  "/locations",
  "/nous-joindre",
  "/pourquoi-sourp-hagop",
  "/prescolaire",
  "/primaire",
  "/projet-educatif",
  "/protecteur-national-eleve",
  "/secondaire",
  "/service-de-garde",
  "/sorties-scolaires-voyages",
  "/soutien",
  "/termes",
  "/transport",
  "/uniforme-scolaire",
];

if (ROUTES.length !== 33) {
  throw new Error(`[lib/routes] ROUTES has ${ROUTES.length} entries, expected 33 - fix the list before trusting anything built from it.`);
}

// /admin/login is a NextAuth sign-in form for the school's single admin
// account (see auth.js), not public content - excluded from the sitemap
// and disallowed in robots.txt (see app/sitemap.ts, app/robots.ts).
export const PRIVATE_ROUTES = ["/admin/login"];

export const PUBLIC_ROUTES = ROUTES.filter((route) => !PRIVATE_ROUTES.includes(route));
