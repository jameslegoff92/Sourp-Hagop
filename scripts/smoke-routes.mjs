// Route smoke check - the only automated safety net this repo has for
// catching a page that renders broken (see docs/dettes-preexistantes.md,
// items a/b: neither the Jest suite nor the Playwright e2e suite can catch
// a regression here). Built for phase 6A specifically because localizing
// lib/sanity-queries.js's 30 functions one at a time, by hand, with no
// automated check, is exactly how a page gets missed - phase 5A step 4
// already proved what an unlocalized query does against localized data
// (React error #31, full white-screen crash) when it tested only 5 of the
// 33 routes by hand.
//
// Walks all 33 static locale routes in both fr (unprefixed) and hy
// (/hy-prefixed) - 66 URLs - against an already-running server (this does
// NOT start the server itself; run `npm run build && npm run start` first,
// pointed at whichever dataset SANITY_PUBLIC_DATASET/.env.local resolves to).
//
// A URL fails if: the HTTP status isn't 200, a Next.js client-error
// boundary appears ("Application error: a client-side exception..."), a
// JS error is thrown during render, the visible text contains
// "[object Object]" or the word "undefined", or the page rendered
// effectively no content. That last check was originally "no <main>
// found", per spec - but this app's root layout (app/[locale]/layout.jsx)
// never uses a <main> element anywhere (verified: zero matches across
// app/ and components/), so that literal check would false-fail all 33
// routes including ones that render fine. Testing the same underlying
// condition - the page rendered nothing real - via a minimum visible body
// text length instead.

import { chromium } from "@playwright/test";

const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const CONCURRENCY = 5;
const PAGE_SETTLE_MS = 4500; // survives the PageLoader splash animation (see phase 4 notes)

const ROUTES = [
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

// Routes that legitimately never render much text and don't fetch from
// Sanity at all - held to a much lower bar than content pages so they
// don't permanently occupy a "failing" slot for a reason unrelated to
// this phase's work. /admin/login is a NextAuth sign-in form (title +
// provider buttons only, ~41 chars) - confirmed via its own snippet
// ("Sign in with Google Sign in with Facebook") that it renders
// correctly, just briefly.
const MIN_BODY_TEXT_OVERRIDES = {
  "/admin/login": 20,
};

if (ROUTES.length !== 33) {
  console.error(`[smoke] ROUTES has ${ROUTES.length} entries, expected 33 - fix the list before trusting this run.`);
  process.exit(1);
}

function urlFor(route, locale) {
  if (locale === "fr") return `${BASE_URL}${route}`;
  const suffix = route === "/" ? "" : route;
  return `${BASE_URL}/hy${suffix}`;
}

async function checkOne(browser, route, locale) {
  const url = urlFor(route, locale);
  const page = await browser.newPage();
  const jsErrors = [];
  page.on("pageerror", (err) => jsErrors.push(err.message));

  const result = { route, locale, url, status: null, ok: false, reasons: [] };

  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    result.status = resp ? resp.status() : null;
    await page.waitForTimeout(PAGE_SETTLE_MS);

    if (result.status !== 200) result.reasons.push(`status ${result.status}`);

    const bodyText = await page.locator("body").innerText().catch(() => "");

    if (bodyText.includes("Application error: a client-side exception")) {
      result.reasons.push("client-error boundary");
    }
    if (jsErrors.length > 0) {
      result.reasons.push(`JS error: ${jsErrors[0].slice(0, 120)}`);
    }
    if (bodyText.includes("[object Object]")) {
      result.reasons.push("[object Object] in visible text");
    }
    if (/\bundefined\b/.test(bodyText)) {
      result.reasons.push('"undefined" in visible text');
    }

    const minLength = MIN_BODY_TEXT_OVERRIDES[route] ?? 200; // below this, the page is chrome (nav/footer) with no real content
    if (bodyText.trim().length < minLength) {
      result.reasons.push(`body text too short (${bodyText.trim().length} chars, need ${minLength}) - page likely rendered no real content`);
    }

    result.ok = result.reasons.length === 0;
    result.snippet = bodyText.slice(0, 150).replace(/\s+/g, " ");
  } catch (e) {
    result.reasons.push(`navigation failed: ${e.message.slice(0, 150)}`);
  } finally {
    await page.close();
  }

  return result;
}

async function run() {
  console.log(`[smoke] base URL: ${BASE_URL}`);
  console.log(`[smoke] ${ROUTES.length} routes x 2 locales = ${ROUTES.length * 2} URLs, concurrency ${CONCURRENCY}`);

  const browser = await chromium.launch();
  const jobs = [];
  for (const route of ROUTES) {
    for (const locale of ["fr", "hy"]) {
      jobs.push({ route, locale });
    }
  }

  // One retry before declaring a failure - checkOne runs 5 pages concurrently
  // per batch, and a genuine one-off timing flake was observed (a page that
  // reproduced cleanly 3/3 times in isolation reported 0 chars once under
  // concurrent load). A real regression fails consistently; a flake doesn't.
  // Retrying costs one extra page load only for URLs that failed once, and
  // protects the "count must not go up" signal this script exists to give.
  const results = [];
  for (let i = 0; i < jobs.length; i += CONCURRENCY) {
    const batch = jobs.slice(i, i + CONCURRENCY);
    let batchResults = await Promise.all(batch.map((j) => checkOne(browser, j.route, j.locale)));
    const stillFailing = batchResults.filter((r) => !r.ok);
    if (stillFailing.length > 0) {
      const retried = await Promise.all(stillFailing.map((r) => checkOne(browser, r.route, r.locale)));
      for (const retryResult of retried) {
        const idx = batchResults.findIndex((r) => r.route === retryResult.route && r.locale === retryResult.locale);
        if (retryResult.ok) retryResult.reasons = [...retryResult.reasons, "(passed on retry - first attempt was flaky)"];
        batchResults[idx] = retryResult;
      }
    }
    results.push(...batchResults);
    for (const r of batchResults) {
      const note = r.reasons.length > 0 ? "- " + r.reasons.join("; ") : "";
      console.log(`  ${r.ok ? "OK  " : "FAIL"} [${r.locale}] ${r.route} ${note}`);
    }
  }

  await browser.close();

  const failing = results.filter((r) => !r.ok);
  console.log(`\n[smoke] ${results.length - failing.length}/${results.length} passing, ${failing.length} failing`);

  if (failing.length > 0) {
    console.log("\n=== Failing URLs ===");
    for (const r of failing) {
      console.log(`${r.url}\n  reasons: ${r.reasons.join("; ")}\n  snippet: ${r.snippet || "(n/a)"}`);
    }
  }

  process.exit(failing.length > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error("[smoke] FAILED TO RUN:", err);
  process.exit(1);
});
