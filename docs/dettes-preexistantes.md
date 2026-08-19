# Dettes préexistantes sur `main`

**Date** : 19 août 2026
**Commit de référence** : `5732cd6` (état de `main` avant le début des travaux i18n)

Ce document recense des problèmes déjà présents sur `main`, confirmés indépendants du travail d'alias d'imports (phase 0 de la refonte i18n, branche `i18n`). **Aucun de ces points n'entre dans le mandat i18n et aucun n'a été corrigé dans le cadre de ce travail.**

---

## a. `npm run test` échoue

**Quoi** : Le test `js/mongoose/connection.test.js` échoue avec `TypeError: mongoose.set is not a function`.

**Où** : `js/mongoose/connection.test.js` (ligne 21, appel à `connectToDatabase()`), qui déclenche `js/mongoose/connection.js:16` (`mongoose.set("debug", true)`).

**Cause probable** : `jest.mock('mongoose', () => ({ connect: jest.fn() }))` ne fournit qu'une fonction `connect`, sans `.set()` — le mock est incomplet.

**Comment confirmé pré-existant** : Après application du codemod d'alias d'imports, les changements ont été mis de côté (`git stash`) et le test relancé sur l'arbre non modifié : échec strictement identique. `connection.js` et `connection.test.js` n'ont par ailleurs subi aucune modification dans la branche `i18n` (`git diff --stat` vide sur ces deux fichiers).

---

## b. La suite e2e Playwright échoue entièrement

**Quoi** : Les 3 projets configurés (chromium, firefox, webkit) échouent tous sur `e2e/example.spec.ts`, avec un timeout en attendant le sélecteur `#historyid`.

**Où** : `e2e/example.spec.ts` ligne 7 (`page.click("#historyid")`).

**Cause** : Cet identifiant n'existe nulle part dans le code source actuel de l'application — sélecteur obsolète, vraisemblablement écrit contre une version antérieure de la page d'accueil.

**Comment confirmé pré-existant** : Recherche exhaustive de `historyid` sur tout le dépôt (hors `studio/`, `node_modules/`, `.next/`) : la seule occurrence est le test lui-même. Le sélecteur ne peut donc jamais correspondre, indépendamment de tout changement d'imports.

---

## c. La page comité-parents journalise sa charge utile Sanity complète pendant le build

**Quoi** : Un `console.log` de débogage, apparemment oublié, affiche l'intégralité des données Sanity de la page (titre, sections, contenu, images...) dans la sortie de `npm run build`.

**Où** : `app/comite-parents/page.jsx` ligne 8 — `console.log("Comite Parents Data:", JSON.stringify(data, null, 2))`.

**Comment confirmé pré-existant** : Présent à l'identique dans la sortie de `npm run build` avant et après le codemod (étape « Generating static pages »).

---

## d. Avertissement d'inférence de la racine du workspace Next.js

**Quoi** : À chaque `npm run build` / `dev` / `start`, Next.js détecte plusieurs lockfiles et choisit par erreur `C:\Users\Anayees\package-lock.json` comme racine du workspace, au lieu de ce dépôt.

**Où** : Avertissement affiché en tête de chaque commande Next.js concernée ; correctif possible via l'option `outputFileTracingRoot` dans `next.config.mjs` (non appliqué).

**Comment confirmé pré-existant** : Identique avant et après le codemod, sur `build`, `dev` et `start`.

---

## e. Erreur NextAuth `UntrustedHost` sur `/api/auth/session` en production locale

**Quoi** : En lançant `npm run start` en local, chaque page affiche une erreur console — `[auth][error] UntrustedHost: Host must be trusted. URL was: https://localhost:3000/api/auth/session` côté serveur, et un 500 sur `/api/auth/session` côté navigateur. Cause probable : `NEXTAUTH_URL`/`AUTH_URL` dans `.env.local` pointe vers le domaine de production réel, qu'Auth.js compare strictement au host de la requête entrante en mode production — `localhost` ne correspond pas, d'où le rejet.

**Où** : Console du navigateur sur toutes les pages (le `SessionProvider` englobe tout l'arbre depuis le layout racine) ; log serveur de `npm run start`.

**Comment confirmé pré-existant** : Observé de façon identique dès la phase 2 (vérification production de `/`, `/calendrier`, `/carrieres`), **avant qu'aucun middleware n'existe** dans ce dépôt — le middleware n'a été ajouté (inerte) qu'en phase 2 également, et activé qu'en phase 3.

**Point important pour éviter toute confusion future** : en phase 3, `app/admin/` a été déplacé sous `app/[locale]/` et retiré de la liste d'exclusion du middleware — la route `/admin/login` est donc désormais traitée par le middleware, même si son URL reste inchangée (toujours `/admin/login`, sans préfixe, grâce à `localePrefix: 'as-needed'`). **Cette anomalie NextAuth a été consignée AVANT ce changement d'exclusion du middleware.** Les deux ne sont pas liés — ne pas les confondre lors d'un futur débogage de l'authentification admin.

**Test de connexion admin en production** :



---

## Problèmes préexistants corrigés en passant

Les deux points suivants sont aussi des problèmes préexistants sur `main`, mais — contrairement à a–e — ils ont été **corrigés en passant**, comme effet secondaire mécanique d'un travail dont ce n'était pas l'objectif principal. Consignés ici pour la même raison de traçabilité.

### f. Casse de nom de fichier désynchronisée entre l'index git et le disque

**Quoi** : `components/ui/Button.jsx` était enregistré dans l'index git sous `button.jsx` (minuscule) alors que le fichier sur disque s'appelait déjà `Button.jsx`. Windows étant insensible à la casse, le build local ne révélait rien — mais un déploiement sur Vercel (Linux, sensible à la casse) aurait pu échouer avec une erreur de module introuvable. Deux imports (`components/ui/FacebookLogin.jsx` et `components/ui/Login.jsx`) référençaient d'ailleurs le fichier via `"./button"` (minuscule), un désaccord de casse pré-existant et invisible pour la même raison.

**Où** : `components/ui/Button.jsx` (renommage d'index) ; `components/ui/FacebookLogin.jsx` ligne 5 et `components/ui/Login.jsx` ligne 2 (chemins d'import corrigés).

**Corrigé par** : commit `fix(i18n): correct filename case in git index` (phase 0), lors d'un audit de casse mené en prévision du déploiement — pas dans le cadre du mandat i18n lui-même.

### g. `<html lang="en">` codé en dur sur un site francophone

**Quoi** : `app/layout.jsx` déclarait `<html lang="en">` de façon statique, alors qu'il s'agit d'un site d'une école francophone (avec, désormais, une version en arménien occidental). C'est à la fois un bug d'accessibilité (les lecteurs d'écran annonçaient la mauvaise langue) et un signal SEO incorrect pour les moteurs de recherche.

**Où** : `app/layout.jsx` (désormais `app/[locale]/layout.jsx`).

**Corrigé par** : commit `refactor(i18n): move routes under [locale] segment` / `feat(i18n): set request locale on localized routes` (phase 3) — le déplacement du layout sous `[locale]` a naturellement remplacé la valeur codée en dur par `lang={locale}`, résolue dynamiquement (`fr` ou `hyw`) selon la route.

---

## Portée et conséquence

Aucun des points ci-dessus ne relève du mandat de la phase 0 i18n (normalisation des imports relatifs vers l'alias `@/`). Ils sont consignés ici uniquement à des fins de traçabilité.

**Point d'attention important** : les points **(a)** et **(b)** signifient qu'il n'existe actuellement **aucune barrière de test automatisée** sur ce dépôt — ni les tests unitaires Jest, ni la suite e2e Playwright ne sont en mesure de détecter une régression, que ce soit dans ce refactor ou dans les phases suivantes de la refonte i18n. La seule validation actuellement fiable est manuelle : build de production, inspection du manifeste de routes, et vérification visuelle/console des pages.
