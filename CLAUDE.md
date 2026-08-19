# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Public website for École arménienne Sourp Hagop, a private high school. Built with Next.js (App Router), TypeScript/JavaScript (mixed), MUI + Tailwind, Framer Motion for animation. Content is authored in a separate embedded Sanity Studio and fetched server-side into Next.js pages. French/Armenian bilingual support. Deployed on Vercel.

## Commands

Run all commands from the repo root unless noted.

```bash
npm run dev          # start Next.js dev server on :3000
npm run https        # dev server with experimental HTTPS (needed for some OAuth/calendar testing)
npm run build         # production build
npm run start         # run production build
npm run lint           # next lint
npm run test            # run Jest unit tests
npm run clean           # remove .next (Windows: rmdir /s /q .next)
```

- Single Jest test: `npx jest path/to/file.test.js` (e.g. `npx jest js/mongoose/connection.test.js`).
- Playwright e2e tests live in `e2e/` and are run with `npx playwright test` (no npm script is defined for this; the dev server must be running separately since `playwright.config.ts` has no `webServer` block).
- ESLint config extends `next/babel`, `next`, `next/core-web-vitals`; note `next.config.mjs` sets `eslint.ignoreDuringBuilds: true`, so lint errors do not fail `npm run build`.

### Sanity Studio (`studio/`)

The CMS is a separate npm workspace with its own `package.json`, not wired into the root scripts:

```bash
cd studio
npm run dev            # sanity dev — local Studio UI
npm run build            # sanity build
npm run deploy             # deploy Studio
npm run deploy-graphql       # deploy GraphQL API
```

## Architecture

### Content flow: Sanity → `lib/sanity-queries.js` → Server Components → presentational components

- `lib/sanity.js` configures the read-only Sanity client (`projectId: col2tg5g`, `dataset: production`) and `urlFor()` image builder.
- `lib/sanity-queries.js` is the single source of truth for **every** GROQ query in the app — one exported `getXPage()` function per route, each fetching a matching `_type` document from Sanity. When adding a new page, add its schema in `studio/schemaTypes/`, register it in `studio/schemaTypes/index.ts`, then add a corresponding query function here.
- Each route in `app/<route>/page.jsx` is an async Server Component that calls the matching `getXPage()` query and passes the result as a `data`/`xData` prop into a presentational component in `components/` (e.g. `app/historique/page.jsx` → `getHistoryPage()` → `components/Historique.jsx`). Data fetching stays in `page.jsx`; components in `components/` are largely presentation-only.
- Sanity query results commonly use `next: { revalidate: N }` for ISR — most content pages revalidate every 10s; navigation/alert-banner queries revalidate every 60s.
- `app/page.jsx` (homepage) shows the fold-priority pattern used across pages: above-the-fold sections import normally, below-the-fold sections (`Footer`, `Values`, `Strengths`, etc.) are loaded via `next/dynamic`.

### Internationalization

Locale is route-based via `next-intl`: routes live under `app/[locale]/`, `middleware.ts` resolves the locale per request (`fr` default-unprefixed, `hyw` prefixed — see `i18n/routing.ts`), and `components/ui/LangSwitcher.jsx` navigates between locales using `Link`/`usePathname` from `i18n/navigation.ts`. Server Components read the resolved locale from `params` and call `setRequestLocale(locale)`; client components use next-intl's own `useLocale()`. Sanity queries that need localized fields (e.g. `getCareerPage(locale)`) take `locale` as a parameter and resolve it in-query with a French fallback (see `lib/localizedFieldQuery.js`); the Sanity schema's localized types (`studio/schemaTypes/localized.ts`) use `fr`/`hyw` keys.

### Auth (admin-only)

- `auth.js` (root) configures NextAuth v5 (`next-auth@beta`) with a single Google OAuth provider requesting broad Google Calendar scopes — this is **not** end-user auth, it's how the single admin account authorizes the site to read/write the school's Google Calendar. `app/api/auth/[...nextauth]/route.js` wires the handlers; `app/admin/login/` is the sign-in page.
- On `signIn`, the Google access/refresh token and expiry are persisted onto a singleton `Admin` Mongo document (`js/schemas/admin.js`, `Admin.getAdmin()` — always fetches the single record where `username: "admin"`) rather than a per-user session table. The same document also stores the Instagram access token.
- `app/api/cron/route.js` is a Vercel Cron job (see `vercel.json`, runs every 2 days at 09:00) that refreshes the Google access token via `js/google/googleapi.js#getNewAccessToken` and updates the `Admin` doc.
- `app/api/calendar/route.js` reads the stored Google access token off the `Admin` doc and calls `libs/fetchData.js#fetchGoogleCalendarData` to serve calendar events to the public calendar page/widget — public visitors never authenticate; only the admin's stored token is used.

### Data layer

- `js/mongoose/connection.js` is a cached Mongoose connection singleton (`global.mongoose`) following the standard Next.js serverless pattern, plus `SIGINT`/`SIGTERM`/`SIGUSR2` shutdown hooks. `js/schemas/admin.js` is currently the only Mongoose model — the whole app has one MongoDB collection (`admins`) holding OAuth tokens for the single admin account.
- `js/logger/logger.js` exports a Pino logger server-side (pretty-printed outside production) and a console-shimmed fallback client-side; import this rather than adding new `console.*` calls.

### Path aliases

`jsconfig.json` defines `@/*` → repo root, but most existing code uses relative imports (`../../lib/sanity-queries`) instead — follow the surrounding file's convention rather than mixing styles.

### `studio/`

Independent Sanity Studio v4 app (own `node_modules`, own `package.json`, own `tsconfig.json`/ESLint config). `studio/schemaTypes/index.ts` is the schema registry; `studio/structure.js` customizes the Studio's desk structure. Content edited here is what `lib/sanity-queries.js` reads at runtime — schema changes must be deployed (`npm run deploy` inside `studio/`) before new fields are queryable in production.
