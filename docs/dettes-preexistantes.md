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

## f. `app/[locale]/layout.jsx` transmet un objet à `className` au lieu d'une chaîne

**Quoi** : La balise `<body>` s'écrit `className={{ fontFamily: "Roboto, sans-serif" }}` — un objet JavaScript là où `className` attend une chaîne de caractères. React convertit silencieusement cet objet en la chaîne littérale `"[object Object]"`, qui ne correspond à aucune classe CSS existante. Conséquence : **Roboto n'a jamais été appliqué, sur aucune page, dans aucune langue, depuis la création du site** — chaque visiteur reçoit la pile de polices système par défaut de Tailwind (`ui-sans-serif, system-ui, sans-serif, ...`).

**Où** : `app/[locale]/layout.jsx` ligne 39 (à l'origine `app/layout.jsx`).

**Origine, datée avec précision** :
- `git blame` sur la ligne actuelle désigne le commit `6daa639` (James Le-Goff, **30 août 2024**) — mais ce commit s'est contenté de déplacer `{children}` sur sa propre ligne à l'intérieur de `<body>`, sans toucher au contenu de `className`.
- En remontant l'historique complet (`git log --follow`, puis inspection des révisions successives du fichier), le bug a en réalité été introduit par le commit `7b79427` (« Added top-level navigation and hero video », James Le-Goff, **26 juin 2024**), qui a remplacé le `className={inter.className}` d'origine — une vraie chaîne, produite par `next/font`, héritée du gabarit initial de Create Next App — par `className={{ fontFamily: 'Roboto, sans-serif' }}`.
- Les deux commits datent de plus de deux ans avant le début de la branche `i18n` (18 août 2026). Le déplacement du fichier vers `app/[locale]/layout.jsx` en phase 3 n'a modifié ni cette ligne ni son comportement.

**Pourquoi c'est pertinent pour l'i18n** : c'est la cause directe d'une observation de la phase 4 (validation visuelle du rendu arménien) — le texte arménien de `/hyw/carrieres` (URL de l'époque ; le code de langue est devenu `hy` en phase 6B, voir `docs/adr/0001-architecture-i18n.md` section 10 — la route équivalente est aujourd'hui `/hy/carrieres`) se rendait via **Segoe UI**, la police système de Windows, et non via Roboto. Puisque la police réellement utilisée dépend entièrement de la pile système par défaut du système d'exploitation du visiteur, **la police affichée pour le contenu arménien varie selon la plateforme et n'a été vérifiée que sous Windows** — le rendu sous macOS, iOS, Android et Linux reste non testé, et la couverture des glyphes arméniens par la police système par défaut de ces plateformes n'est pas garantie.

**Comment confirmé pré-existant** : `git blame` et `git log --follow` sur `app/[locale]/layout.jsx`, remontant à deux commits de 2024, largement antérieurs à toute branche i18n.

**Correction (phase 7, étape 1 — reconnaissance)** : l'affirmation « Roboto n'a jamais été appliqué, sur aucune page, dans aucune langue » ci-dessus est trop large. Une lecture précise de `components/display/Typography.jsx` montre que le composant `Typography`, utilisé dans 31 fichiers, déclare son propre `font-family: var(--primary-ff)` (Roboto par défaut) directement sur chaque élément stylé — indépendamment de `<body>`. Les classes globales `.h1`–`.h5` font de même avec Poppins. Ces éléments ont donc toujours correctement affiché Roboto/Poppins, bug ou pas. Seuls **le texte brut non enveloppé dans `Typography` ni dans une classe `.h1`–`.h5`** (dont `<body>`/`<html>` eux-mêmes) héritaient réellement de la pile système — voir le rapport de reconnaissance de la phase 7 pour la liste précise (le plus gros contributeur : `HeaderText` de `components/ui/Header.jsx`, utilisé sur 28 pages).

**Corrigé par** : phase 7, étape 2 — voir item (aa) pour le correctif et son effet visuel.

---

## g. À 375px de large, les offres d'emploi 2 à 4 s'effondrent visuellement sur la page carrières

**Quoi** : Sur `/carrieres` (et `/hy/carrieres`), à une largeur de viewport de 375px (mobile), seule la première carte d'offre d'emploi affiche son contenu complet. Les cartes 2, 3 et 4 s'effondrent à une hauteur visible de zéro, ne laissant flotter que leur badge positionné en absolu (« 1 POSTE dispo. »), avec de grands espaces vides entre eux.

**Où** : `components/Career.jsx` — les composants stylés `Grid`/`CardWrapper`/`Card`/`Badge`, repris à l'identique depuis l'ancienne version de la page lors de la phase 4 (aucune modification de leur CSS).

**Comment confirmé indépendant de l'arménien et de ce travail** : capture d'écran identique, bogue pour bogue, sur `/carrieres` (français) à la même largeur — ni spécifique à l'arménien, ni introduit par la refonte i18n.

**Conséquence pratique** : les visiteurs mobiles — vraisemblablement la majorité du trafic candidat — ne peuvent ni voir ni cliquer sur 3 des 4 offres d'emploi actuellement publiées.

**Note de correction** : ce constat était initialement formulé en supposant que la page restait rendue côté client et donc non indexable par les moteurs de recherche. Ce n'est plus le cas depuis la réécriture de `/carrieres` en composant serveur à l'étape 5 de cette même phase 4 — le référencement n'est donc plus en cause ici. Le problème réel et actuel est uniquement l'effondrement visuel à largeur mobile, qui rend les offres invisibles et inutilisables sur téléphone, indépendamment de toute question d'indexation.

---

## Autres dettes préexistantes constatées en phase 5A

Les trois points suivants ont été mis au jour lors de l'audit complet des schémas Sanity mené en phase 5A (inventaire de localisation, ~30 types de documents). Comme pour a–g, ce sont des dettes déjà présentes sur `main`, indépendantes du mandat i18n, et **aucune n'a été corrigée**.

### h. Aucun champ de texte alternatif (alt) pour les images, dans aucun schéma

**Quoi** : Sur l'ensemble des ~30 types de documents du site, aucun champ `image` ne possède de sous-champ alt-text. C'est un problème d'accessibilité indépendant de l'i18n, et antérieur à ce mandat.

**Comment confirmé** : Lecture exhaustive de tous les fichiers sous `studio/schemaTypes/` pendant l'inventaire de la phase 5A (étape 1) — aucune occurrence d'un champ alt sur un type `image`.

### i. Aucun champ de métadonnées SEO par page (titre, description), dans aucun schéma

**Quoi** : Aucun type de document ne possède de champs de méta-titre ou méta-description propres à la page.

**Conséquence pour ce mandat** : les pages `/hy/*` afficheront des titres et descriptions en français dans les résultats de recherche, faute de contrepartie arménienne. L'ajout de ces champs est hors du périmètre des phases actuelles et nécessite une décision du porteur de projet.

**Comment confirmé** : Même audit exhaustif qu'au point h.

### j. `libraryPage` est un schéma vide (« stub ») alors que `/bibliotheque` est une route publique active

**Quoi** : `studio/schemaTypes/libraryPage.ts` ne définit qu'un seul champ, `test` (string), sans rapport avec le contenu réel de la page. Le contenu affiché sur `/bibliotheque` est donc actuellement codé en dur dans le composant, pas piloté par Sanity.

**Conséquence pour ce mandat** : la phase 6 (réplication des requêtes GROQ localisées sur le reste des pages) ne trouvera rien à localiser via ce schéma — le contenu de `/bibliotheque` devra soit être construit dans Sanity au préalable, soit être localisé directement via `messages/*.json` comme du contenu statique. Décision à prendre par le porteur de projet.

**Comment confirmé** : Lecture de `studio/schemaTypes/libraryPage.ts` (phase 5A, étape 1) et vérification que `/bibliotheque` est bien une route servie publiquement.

---

## Problèmes préexistants corrigés en passant

Les deux points suivants sont aussi des problèmes préexistants sur `main`, mais — contrairement à a–j — ils ont été **corrigés en passant**, comme effet secondaire mécanique d'un travail dont ce n'était pas l'objectif principal. Consignés ici pour la même raison de traçabilité.

**Note de numérotation** : ces deux points portaient à l'origine les lettres h et i, avant l'ajout des points h–j ci-dessus en phase 5A. Relettrés en k et l pour éviter toute collision ; aucun autre document du dépôt ne référence ces lettres.

### k. Casse de nom de fichier désynchronisée entre l'index git et le disque

**Quoi** : `components/ui/Button.jsx` était enregistré dans l'index git sous `button.jsx` (minuscule) alors que le fichier sur disque s'appelait déjà `Button.jsx`. Windows étant insensible à la casse, le build local ne révélait rien — mais un déploiement sur Vercel (Linux, sensible à la casse) aurait pu échouer avec une erreur de module introuvable. Deux imports (`components/ui/FacebookLogin.jsx` et `components/ui/Login.jsx`) référençaient d'ailleurs le fichier via `"./button"` (minuscule), un désaccord de casse pré-existant et invisible pour la même raison.

**Où** : `components/ui/Button.jsx` (renommage d'index) ; `components/ui/FacebookLogin.jsx` ligne 5 et `components/ui/Login.jsx` ligne 2 (chemins d'import corrigés).

**Corrigé par** : commit `fix(i18n): correct filename case in git index` (phase 0), lors d'un audit de casse mené en prévision du déploiement — pas dans le cadre du mandat i18n lui-même.

### l. `<html lang="en">` codé en dur sur un site francophone

**Quoi** : `app/layout.jsx` déclarait `<html lang="en">` de façon statique, alors qu'il s'agit d'un site d'une école francophone (avec, désormais, une version en arménien occidental). C'est à la fois un bug d'accessibilité (les lecteurs d'écran annonçaient la mauvaise langue) et un signal SEO incorrect pour les moteurs de recherche.

**Où** : `app/layout.jsx` (désormais `app/[locale]/layout.jsx`).

**Corrigé par** : commit `refactor(i18n): move routes under [locale] segment` / `feat(i18n): set request locale on localized routes` (phase 3) — le déplacement du layout sous `[locale]` a naturellement remplacé la valeur codée en dur par `lang={locale}`, résolue dynamiquement (`fr` ou `hy` — `hyw` jusqu'en phase 6B, voir `docs/adr/0001-architecture-i18n.md` section 10) selon la route. Bonus non anticipé de ce même renversement de section 10 : jusqu'alors, cette ligne émettait `lang="hyw"`, une valeur que les lecteurs d'écran ne reconnaissent pas — corrigé sans code additionnel puisque la valeur est entièrement dérivée de `routing.locales`.

---

### m. Espaces superflus dans les valeurs de `tuitionFeesPage.fees[]`

**Quoi** : Plusieurs valeurs de prix dans le dataset `staging` contiennent un espace en fin de chaîne — par exemple `"160 "`, `"6618 "`, `"281 "`, `"7496 "` (constaté lors de la vérification de données de la phase 5A, étape 1 — voir `tuitionFeesPage.fees[].prescolaire/.primaire/.secondaire`). Ces champs restent des chaînes simples, non localisées (ce sont des montants, pas du texte destiné au visiteur).

**Décision** : ces espaces ne doivent **pas** être nettoyés par le script de migration de la phase 5A (étape 3), ni par aucun travail futur non explicitement demandé à cet effet — un script de migration qui « améliore » silencieusement le contenu en cours de route est précisément ce que ce mandat cherche à éviter. Les valeurs doivent rester identiques au bit près après migration.

**Comment confirmé** : Requête GROQ en lecture seule sur `staging` (`tuitionFeesPage.fees[]{ category, prescolaire, primaire, secondaire }`), phase 5A étape 1.

---

## Incidents survenus pendant le mandat

Contrairement aux points ci-dessus (dette déjà présente sur `main` avant ce travail), cette section documente un incident causé par le travail i18n lui-même — consigné par souci de transparence complète.

### Écriture accidentelle dans le dataset `production` (phase 4, 19 août 2026)

**Quoi** : Un document de test synthétique (`_id: "groq-fallback-test-doc"`, `_type: "groqFallbackTestDoc"` — sans rapport avec les types de contenu réels du site) destiné à valider un modèle de requête GROQ a été écrit dans le dataset **`production`** au lieu de `staging`, le dataset de test créé spécifiquement pour ces expérimentations.

**Cause racine**, confirmée en lisant le code source de `@sanity/cli` (`getCliClientImpl`, dans `node_modules/@sanity/cli/lib/index.js`) plutôt que supposée :

```js
function getCliClientImpl(options = {}) {
  const { projectId, dataset, ... } = options;
  if (projectId && dataset)
    return client.createClient({ projectId, dataset, ... });
  // sinon : la fonction retombe sur studio/sanity.cli.ts
}
```

`getCliClient()` n'utilise les options passées (`projectId`, `dataset`) que si **les deux sont fournies ensemble**. Un appel `getCliClient({ dataset: "staging" })` — fournissant uniquement `dataset`, sans `projectId` — ne satisfait donc pas cette condition, et la fonction retombe silencieusement sur la configuration de `studio/sanity.cli.ts`, qui pointait alors vers `production` (revertie intentionnellement à cette valeur un peu plus tôt dans la même phase, précisément pour protéger le Studio déployé en production). Aucun avertissement, aucune erreur — l'écriture a simplement eu lieu au mauvais endroit.

**Ce qui empêche maintenant la récidive** : `scripts/sanity-write-guard.mjs`, désormais dans le dépôt. Sa fonction `assertSafeForWrite(client)` lit `client.config().dataset` — c'est-à-dire la valeur réellement résolue sur l'instance de client sur le point d'être utilisée, et non un fichier de configuration quelconque — et lève immédiatement une exception si cette valeur est `"production"`, avant d'effectuer une vérification de lecture en direct. Ce garde-fou est donc impossible à contourner par une mauvaise configuration : peu importe COMMENT le dataset a été résolu (variable d'environnement, fichier CLI, paramètre oublié), seule la valeur finale compte. `lib/sanity-locale-fallback.test.js` l'exerce à chaque exécution.

**Suivi** : le document erroné dans `production` n'a pas été supprimé par un script ou par Claude — le porteur de projet le supprime lui-même manuellement via le tableau de bord Sanity (sanity.io/manage).

### Le garde-fou ne couvre pas les invocations directes du CLI Sanity (constaté phase 5A)

**Quoi** : `scripts/sanity-write-guard.mjs` protège tout script Node qui construit explicitement un client Sanity et appelle `assertSafeForWrite(client)` avant d'écrire — c'est le cas de `lib/sanity-locale-fallback.test.js` et ce sera le cas du script de migration de l'étape 3. Mais il ne couvre **pas** les commandes `sanity documents create/delete/get` invoquées directement au terminal : ces commandes passent par leur propre résolution de configuration (`sanity.cli.ts`, ou le flag `--dataset`), entièrement en dehors du code applicatif du dépôt. Rien n'empêche techniquement une commande `sanity documents create ... --dataset production` (ou sans `--dataset` du tout, retombant sur la config résolue) de s'exécuter.

**Constaté concrètement** : lors de la preuve empirique du motif GROQ pour les tableaux (phase 5A), la session CLI authentifiée localement s'est révélée avoir un accès en écriture non seulement à `staging` mais aussi à `production` — sans qu'aucun jeton (`SANITY_API_WRITE_TOKEN`) n'ait été fourni. La seule barrière entre une commande CLI et une écriture en production est donc, à ce jour, l'exactitude du flag `--dataset` tapé par la personne qui exécute la commande.

**Décision prise pour cette phase** : documenter cette lacune plutôt que construire une protection supplémentaire (par ex. un script wrapper autour du binaire `sanity` qui validerait le dataset avant de déléguer la commande), ce qui aurait dépassé le périmètre de l'étape 2 (modifications de schéma uniquement). **À traiter avant que la phase 5B ne touche à `production`** : soit un wrapper qui intercepte et valide toute invocation `sanity documents *`, soit, a minima, une règle d'usage explicite (ne jamais taper une commande `sanity documents` avec écriture sans relire le flag `--dataset` à voix haute avant d'exécuter).

### `SANITY_API_WRITE_TOKEN` est un jeton de PROJET, pas de dataset — `assertSafeForWrite()` est donc structurel, pas une simple précaution supplémentaire

**Quoi** : Pour que `scripts/migrate-localize-fields.mjs` puisse réellement écrire sur `staging` (le client `@sanity/client`, construit explicitement avec `createClient({projectId, dataset, token})`, refusait toute écriture avec une erreur 403 tant qu'aucun jeton n'était fourni), le porteur de projet a ajouté `SANITY_API_WRITE_TOKEN` à `.env.local`, avec le rôle Sanity « Editor ». Ce jeton est scoping **projet**, pas **dataset** : rien dans le jeton lui-même n'empêche techniquement une écriture sur `production` — il autorise l'écriture sur n'importe quel dataset du projet `col2tg5g`, `staging` comme `production`.

**Conséquence** : `assertSafeForWrite(client)` (`scripts/sanity-write-guard.mjs`) n'est donc pas une vérification de confort redondante avec les permissions du jeton — c'est la **seule** chose qui empêche ce script (ou tout futur script réutilisant ce même jeton) d'écrire accidentellement en production. Si ce garde-fou est un jour retiré, contourné, ou si un script l'omet, le jeton actuel ne fournira aucune protection de repli. Tout script futur qui écrit avec ce jeton doit appeler `assertSafeForWrite()` avant sa première mutation, sans exception.

**Non vérifié à ce jour** : si un jeton scoping *dataset* (limité à `staging` uniquement) existe ou peut être créé dans Sanity pour réduire structurellement ce risque — à évaluer par le porteur de projet, hors du périmètre de ce mandat.

### Clés `hy` orphelines et marqueurs `_type` manquants sur des champs déjà localisés (constaté phase 5A, étape 3)

**Quoi** : Le dry-run du script de migration (`scripts/migrate-localize-fields.mjs`) a révélé que `careerPage.applicationNote`, sur `staging`, contient encore une clé `hy` orpheline avec une chaîne vide (`{fr: "...", hy: "", hyw: "..."}`) — un reliquat du renommage `hy` → `hyw` effectué au niveau du schéma en phase 4, jamais nettoyé dans les données déjà écrites à l'époque. Le même document a aussi un `applicationNote` sans marqueur `_type: "localizedString"`, alors que le champ `headerText` du même document en possède un. Ces deux anomalies sont inertes : aucune requête GROQ ni composant ne lit la clé `hy`, et l'absence de `_type` ne change rien au comportement de la requête de repli (`coalesce(select(...))`), qui ne s'appuie que sur les clés `fr`/`hyw`.

**Décision** : ne pas nettoyer ces anomalies dans le cadre de la migration de l'étape 3/4. Ajouter une suppression de clé à une transformation qui touche déjà 605 instances de valeurs élargit le rayon d'impact de l'opération la plus risquée de ce mandat, sans aucun gain fonctionnel — la clé `hy` ne casse rien en restant en place. Un nettoyage de ces clés orphelines, si souhaité, doit faire l'objet d'un script séparé, explicitement autorisé par le porteur de projet avant exécution : il s'agit de supprimer des données du contenu de l'école, une décision qui lui appartient, pas à ce chantier technique.

**Point important** : `staging` a été créé à partir d'une copie de `production` (voir phase 4). Cette même clé `hy` orpheline existe donc très probablement aussi dans `production`, sur le document `careerPage` réel qui y est déployé. Cela n'a pas été vérifié directement (aucune lecture sur `production` n'a été effectuée dans le cadre de ce mandat), mais c'est l'hypothèse la plus probable compte tenu de l'origine de `staging`.

### L'introduction de la page d'accueil (« Bienvenue ») s'affichait vide en production, depuis le déploiement de la phase 6A — un `catch` vide a caché une erreur 400 en direct pendant des semaines (constaté et corrigé le 2026-09-09)

**Quoi** : `components/display/Intro.jsx` (le bloc « Bienvenue » / titre / description sous la vidéo d'en-tête de la page d'accueil) ne recevait aucune donnée en props de `app/[locale]/page.jsx` — celui-ci appelle bien `getHomePage(locale)` et récupère `data.introSection`, mais ne le transmet jamais à `<Intro />`, invoqué sans aucune prop. À la place, `Intro.jsx` effectuait son propre appel côté client, dans un `useEffect`, avec `getHomePage()` **sans argument de locale**. Or `getHomePage(locale)` construit sa requête GROQ avec `coalesce(select(title[$locale] != "" => title[$locale]), title.fr)` — elle exige un paramètre `$locale` défini. Appelée sans argument, l'appel à l'API Sanity échoue avec une vraie erreur 400 : `Unable to parse value of "$locale=undefined". Please quote string values.` (reproduit directement contre `production`, pas supposé).

**Pourquoi personne ne l'a vu** : l'appel était enveloppé dans `try { ... } catch (error) { // Handle error silently }` — l'erreur était interceptée puis totalement ignorée. `homePageData` restait `null` indéfiniment, donc `title`/`content` valaient `undefined`, et les deux `<Typography>` correspondants ne rendaient rien. Le libellé « BIENVENUE » au-dessus (texte d'interface statique, `useTranslations`, sans rapport avec Sanity) continuait de s'afficher normalement — seuls le titre et le paragraphe dynamiques disparaissaient, silencieusement.

**Origine précise** : ce n'est pas un bug préexistant sur `main`. `main` possédait exactement la même architecture dans `Intro.jsx` (son propre fetch côté client, le même `catch` vide) — mais l'ancien `getHomePage()` de `main` ne prenait aucun paramètre de locale et sa requête GROQ ne référence aucun `$locale` : rien ne pouvait échouer. Le bug a été introduit par la phase 6A de ce mandat, qui a rendu `locale` obligatoire dans `getHomePage()` pour le mécanisme de repli `coalesce`/`select`, sans mettre à jour cet appelant — ni à cette phase, ni depuis. Le bug est resté latent, invisible, jusqu'à la vérification directe du site en production le 2026-09-09.

**Confirmé en direct sur le site public avant correction** : capture d'écran de `https://sourp-hagop.vercel.app/` montrant « BIENVENUE » affiché, suivi d'un espace entièrement vide (aucun titre, aucune description), avec la même erreur 400 dans la console du navigateur que celle reproduite directement contre l'API.

**Limite réelle de l'outillage de vérification, à retenir** : `scripts/smoke-routes.mjs` a rapporté 66/66 pendant tout ce mandat sans jamais détecter ce problème, et ne le peut pas par construction — React ne rend rien du tout pour un enfant `undefined` (contrairement à un rendu littéral du mot « undefined », que le smoke test sait détecter). Le smoke test vérifie l'absence de symptômes textuels (`[object Object]`, `undefined`, clés brutes, page blanche au sens d'un corps de texte minimal) ; il ne peut pas détecter qu'une section précise, au milieu d'une page par ailleurs bien remplie, est silencieusement vide. Une page à 200 OK avec un contenu manquant reste, pour ce test, une page qui passe.

**Corrigé** (branche `fix/intro-locale`, à partir de `main` après fusion de `i18n`) : `app/[locale]/page.jsx` transmet désormais `data?.introSection` en prop à `<Intro />` ; `Intro.jsx` n'effectue plus aucun fetch — ni `useEffect`, ni import de `getHomePage`, ni `catch` d'aucune sorte — et rend directement `title`/`content` reçus en props, exactement comme `Values`/`Strengths` reçoivent déjà les leurs. Vérifié après correction : le titre et la description s'affichent correctement dans les deux langues, `npm run build`/`npm run smoke` (66/66) contre `production` réelle, capture d'écran des deux locales.

**Audit consécutif** : recherche exhaustive de ce même motif (appel `getXPage()` côté client plutôt qu'en props, appel `getXPage()` sans argument de locale, `catch` vide ou uniquement commenté) dans `components/` et `app/` — `Intro.jsx` était le seul composant à appeler une fonction `getXPage()` côté client, et le seul appel omettant `locale` parmi tous les appelants de fonctions qui en exigent un (`getPourquoiPage()` est appelée sans locale mais n'en accepte structurellement aucune — délibéré, sans rapport). Un seul autre `catch` vide/commenté existe dans tout le dépôt, sans rapport avec Sanity ou l'i18n : `components/ui/FacebookLogin.jsx` (échange de jeton Facebook, page d'administration).

### n. Le lien « Calendrier » du menu mobile pointe vers une route qui n'existe pas (`/about`)

**Quoi** : `components/ui/Nav.jsx` définit son propre tableau `navItems` (utilisé uniquement dans la grille de liens rapides du tiroir de navigation mobile, `MobileNav` → `FooterGrid`), où l'élément « Calendrier » pointe vers `/about`. `components/ui/topNav.jsx` définit un tableau `navItems` distinct (utilisé dans la barre de navigation du haut, en version bureau), où le même élément pointe correctement vers `/calendrier`. Les deux fichiers ont donc deux copies indépendantes et divergentes de la même liste de liens rapides.

**Vérifié** : `Nav.jsx` est bien le menu réellement utilisé en production, pas un composant mort. `components/ui/Header.jsx` — importé et rendu par la quasi-totalité des pages de contenu du site (Admissions, Administration, Anciens, Agora, Historique, Uniform, Créalab, Comité de parents, Carrières, Locations, Team, ProtecteurNational, ProjetEducatif, ServiceDeGarde, Secondaire, Primaire, Prescolaire, Soutien, Transport, TuitionFees, etc.) — rend à la fois `<TopNav />` et `<Nav />`. La page d'accueil (`app/[locale]/page.jsx`) fait de même directement. Aucune route `app/[locale]/about/` n'existe (confirmé par inspection directe du dossier `app/[locale]/`), seule `app/[locale]/calendrier/` existe. **Le lien est donc réellement mort, en production, sur mobile uniquement** (la version bureau, via `topNav.jsx`, est correcte) — un visiteur mobile cliquant sur « Calendrier » dans le tiroir de menu atterrit sur une page 404.

**Comment confirmé** : recherche de toutes les utilisations de `Nav`/`TopNav`/`Header` dans le dépôt, lecture des deux fichiers `navItems`, et vérification de l'arborescence réelle de `app/[locale]/`.

### o. Deux types de documents orphelins existent dans `staging`, sans schéma enregistré : `AiglePage` et `pourquoi` — et `pourquoi` EST activement lu par le site (correction d'une affirmation précédente)

**Correction** : ce point affirmait initialement qu'aucun de ces deux documents orphelins n'était lu par une requête. C'est vrai pour `AiglePage`, mais **faux pour `pourquoi`** : `lib/sanity-queries.js#getPourquoiPage()` interroge littéralement `*[_type == "pourquoi"][0]`, pas `"pourquoiPage"`. Ce n'est donc pas un simple contenu orphelin oublié — c'est un **bug de production actif** : la page publique `/pourquoi-sourp-hagop` affiche depuis toujours le contenu du document non enregistré `pourquoi`, jamais celui du vrai document `pourquoiPage` (enregistré dans `studio/schemaTypes/index.ts`, éditable normalement dans le Studio). Toute modification que la responsable du contenu de l'école a faite en éditant « Pourquoi Sourp Hagop » dans le Studio n'est donc **jamais apparue sur le site**, depuis la création de ce document.

**Comparaison des deux documents (staging, phase 6A étape 2)** :

| Champ | `pourquoi` (orphelin, lu par le site) | `pourquoiPage` (réel, enregistré) |
|---|---|---|
| `_updatedAt` | 2026-08-19T19:02:20Z | 2026-08-26T23:26:22Z (ce dernier horodatage correspond exactement à l'exécution du script de migration de ce mandat — pas à une édition humaine) |
| `headerImage` | présent (image + recadrage) | **absent** |
| `popupDateEnd` / lien de réservation | « 19 décembre » / lien Calendly | « 23 janvier » / lien Doodle (différent) |
| `popupText` | mentionne une seule période (8–19 déc. 2025) | mentionne deux périodes (8–19 déc. 2025 **et** 13–23 janv. 2026) |
| `footerText`, `footerDateStart/End`, `footerLink`, `footerLinkText` | présents (bloc complet) | **absents entièrement** |
| `sections[]` | 5 sections complètes (titre + description + image chacune) | seulement 2 entrées, dont la 2e est vide (ni titre, ni description, ni image) |

Ni l'un ni l'autre n'est simplement « plus à jour » — `pourquoiPage` contient des dates de popup plus récentes (période de janvier ajoutée) mais il manque l'image d'entête, tout le bloc pied-de-page, et 3 des 5 sections « pourquoi nous choisir ». Il ressemble à une tentative partielle de ressaisie du contenu dans le bon document, jamais terminée, plutôt qu'à une copie complète et plus récente.

**Conséquence concrète si la requête était repointée sur `pourquoiPage` telle quelle** : la page perdrait son image d'entête, perdrait tout le bloc d'appel à l'action en pied de page, et n'afficherait que 2 « pourquoi nous choisir » au lieu de 5 (dont un vide). Elle gagnerait les dates de popup à jour (janvier) et le nouveau lien de réservation. Ce n'est pas un correctif neutre.

**Décision (phase 6A)** : `getPourquoiPage` est explicitement exclu de la localisation de l'étape 3. La requête continue de pointer sur `pourquoi` et reste non localisée jusqu'à ce que le porteur de projet tranche quel document fait foi. **Conséquence assumée** : `/pourquoi-sourp-hagop` restera unilingue français à la fin de la phase 6A — ce n'est pas un oubli.

**Risque à signaler au porteur de projet, pour `AiglePage`** : ce second orphelin, lui, n'est bien lu par aucune requête — si quelqu'un y a édité du contenu en croyant modifier la vraie page `aiglePage`, ce contenu n'a jamais été visible sur le site.

**Décision** : ne pas supprimer ces documents. Une suppression est une décision qui appartient au porteur de projet, pas à ce chantier technique — d'autant plus si l'un d'eux contient du contenu que quelqu'un pensait avoir publié.

### p. `primaire.horaireTitre` mal orthographié `horaireTitle` dans la requête — aucun changement visible si corrigé

**Quoi** : `lib/sanity-queries.js#getPrimairePage()` sélectionne `horaireTitle`, mais le champ du schéma s'appelle `horaireTitre` (`studio/schemaTypes/projetPrimairePage.ts`). Le champ existe bel et bien dans le schéma — c'est un pur problème d'orthographe dans la requête.

**Vérifié** : la valeur actuelle de `horaireTitre` sur `staging` est `null` — le champ n'a jamais été rempli. Corriger l'orthographe ne ferait donc rien apparaître aujourd'hui. Mais tant que ce n'est pas corrigé, si quelqu'un remplit ce champ dans le Studio plus tard, le contenu n'apparaîtra jamais sur `/primaire` sans que personne ne comprenne pourquoi.

**Décision** : ne pas corriger dans le cadre de la phase 6A — décision du porteur de projet, à traiter séparément.

### q. `homePage.strengthsSection.sectionTitle` n'existe pas dans le schéma

**Quoi** : `lib/sanity-queries.js#getHomePage()` sélectionne `strengthsSection { sectionTitle, strengths[] {...} }`, mais `sectionTitle` n'existe nulle part dans le schéma `homePage` (`studio/schemaTypes/homePage.ts` — `strengthsSection` ne contient qu'un champ `strengths`). Contrairement au point (p), ce n'est pas une faute d'orthographe sur un champ existant : il n'y a tout simplement rien à sélectionner. Corriger cela demanderait d'ajouter le champ au schéma d'abord, puis d'attendre qu'il soit rempli — il n'existe aucune valeur en attente qui « apparaîtrait » simplement en corrigeant la requête.

**Décision** : ne pas ajouter ce champ dans le cadre de la phase 6A — décision du porteur de projet.

---

### r. `confidentialite` et `termes` sont du texte générique anglais jamais traduit — pas du contenu bilingue à localiser

**Quoi** : `app/[locale]/confidentialite/page.jsx` et `app/[locale]/termes/page.jsx` affichent un texte légal générique en anglais, produit par un outil de type « Privacy Policy Generator » (texte littéral trouvé dans le fichier : « Last updated: August 27, 2024 », définitions génériques de termes comme « Interpretation », etc.). Ce n'est pas du contenu de l'école ni du français jamais traduit — c'est un gabarit anglais générique tel quel, jamais adapté, jamais relu.

**Comment confirmé** : lecture complète des deux fichiers pendant l'inventaire de la phase 6B (chaînes codées en dur) — aucune phrase spécifique à l'école, aucune trace de français, uniquement du texte de gabarit juridique générique.

**Conséquence pour la phase 6B** : ces deux pages sont exclues de l'extraction des chaînes d'interface (voir `EXCLUDED_FILES` dans `scripts/check-hardcoded-strings.mjs`). Les inclure dans le compteur ou l'extraction donnerait l'illusion trompeuse que ce texte a été révisé et validé comme contenu à conserver tel quel — ce n'est pas le cas.

**Conséquence explicite pour la livraison bilingue** : `/confidentialite` et `/termes` resteront **uniquement en anglais, dans les deux locales (`fr` et `hy`)**, à la fin de la phase 6B. Sur les 33 routes du site, ce sont 2 routes délibérément exclues du livrable bilingue. **Ceci est une décision, pas un oubli** : elle est documentée ici précisément pour qu'elle ne soit jamais confondue avec une régression ou une extraction manquée lors d'une vérification future.

**Décision** : ne rien changer dans le cadre de ce mandat. Le sort de ces deux pages (traduction réelle, remplacement par un texte propre à l'école, ou révision juridique) est une décision qui appartient au porteur de projet, vraisemblablement avec un conseil juridique — pas à ce chantier technique.

**Ce n'est pas qu'une question de développement** : il s'agit d'une question de conformité légale et linguistique pour le porteur de projet et pour l'école, pas d'une tâche de développement. Ce texte de gabarit générique anglais figure sur le site d'une école québécoise, rédigé sous un cadre juridique inconnu (aucune indication de juridiction visée dans le gabarit lui-même), pour une institution qui traite des données de mineurs. Une révision juridique est recommandée avant toute décision sur le contenu de ces deux pages. Ce chantier ne rédigera, ne traduira et ne corrigera aucune partie de ce texte.

---

### s. Chaînes anglaises éparses sur un site par ailleurs francophone

**Quoi** : plusieurs chaînes d'interface visibles restent en anglais alors que le reste du site est en français, en dehors du cas plus large de (r) :
- `FacebookLogin.jsx` : « Sign in with Facebook », « Logout from Facebook »
- `ReactCalendar.jsx` : texte anglais dans sa limite d'erreur (error boundary)
- `BackgroundVideo.jsx` : texte de repli (fallback) en anglais
- `components/ui/Login.jsx` : « Sign in with Google » — trouvé pendant l'extraction de l'étape 3, même catégorie que les deux boutons Facebook
- `components/display/Instagram.jsx` : « Fond memories » (repli utilisé quand une publication Instagram n'a pas de légende) — trouvé pendant l'extraction de l'étape 3, à l'intérieur d'un littéral gabarit (`` `${item.caption ? item.caption : "Fond memories"}` ``), donc invisible au script `check-hardcoded-strings.mjs`

**Comment confirmé** : repérées pendant le scan et la relecture manuelle des fichiers `app/` et `components/` pour la phase 6B.

**Décision** : conformément à la pratique déjà établie dans ce mandat (ne pas corriger silencieusement du contenu au passage d'une extraction), ces cinq chaînes seront extraites **telles quelles** vers `messages/*.json` dans le cadre de la phase 6B, plutôt que traduites ou nettoyées à cette occasion. Une éventuelle traduction ou un nettoyage de ces textes reste une décision séparée pour le porteur de projet.

**Exclu de cette liste** : le message « No data found - check console » de `comite-parents/page.jsx` (ligne 14) — voir l'item (u), qui le traite séparément comme un bug plutôt que comme une chaîne d'interface légitime.

---

### t. Incohérence de code postal entre deux affichages de la même adresse

**Quoi** : `components/ui/Footer.jsx` affiche « Canada, H4J 1P5 » tandis que `app/[locale]/nous-joindre/page.jsx` affiche « Montréal, QC H4J 1P6 » pour ce qui semble être la même adresse (3400 Rue Nadon). Les deux codes postaux diffèrent d'un seul caractère (P5 vs P6).

**Comment confirmé** : repéré en peuplant `scripts/hardcoded-strings-allowlist.json` pendant la phase 6B — les deux chaînes d'adresse ont dû être allowlistées séparément, ce qui a mis l'écart en évidence.

**En production aujourd'hui** : les deux affichages sont actuellement en ligne sur le site réel — ce n'est pas une divergence entre un état futur et un état actuel, c'est une incohérence déjà visible aux visiteurs du site en ce moment. Concrètement, l'un des deux codes postaux affichés est **actuellement erroné en production**, quelle que soit la réponse finale.

**Décision** : ne pas corriger dans le cadre de la phase 6B — une extraction de chaînes d'interface n'est pas l'endroit pour trancher laquelle des deux adresses est correcte. Les deux chaînes sont conservées telles quelles (allowlistées séparément, avec une note croisée dans chaque entrée). Le porteur de projet doit confirmer le bon code postal et corriger la source qui a tort.

---

### u. `comite-parents` peut afficher un message de débogage aux visiteurs — ce n'est pas une chaîne d'interface, c'est un bug

**Quoi** : `app/[locale]/comite-parents/page.jsx` (ligne 14) affiche « No data found - check console » lorsque les données Sanity attendues sont absentes. C'est un artefact de débogage destiné à un développeur, pas un texte pensé pour un visiteur — et rien n'empêche qu'il apparaisse réellement à l'écran d'un vrai visiteur si la condition qui le déclenche se produit.

**Pourquoi ce n'est pas une simple chaîne à extraire** : tout texte placé dans `messages/*.json` devient quelque chose que la traductrice ou le traducteur est invité à rendre en arménien, comme n'importe quel autre texte d'interface légitime. Faire ce traitement à un message de débogage lui donnerait un statut qu'il ne mérite pas et ferait perdre de vue qu'il s'agit d'un défaut à corriger, pas d'un texte à traduire.

**Décision** : ne pas extraire cette chaîne dans le cadre de la phase 6B. Le composant devrait plutôt n'afficher rien du tout dans ce cas, ou un véritable état vide pensé pour un visiteur (« aucune information disponible pour le moment », par exemple) — mais concevoir ce message correctement est un travail de développement séparé, pas une décision à prendre au passage d'une extraction de chaînes. À traiter séparément, hors de ce mandat.

---

### v. Les métadonnées d'offre d'emploi (niveau, type, lieu) resteront en français sur la page carrières arménienne — décision délibérée, même catégorie que (r)

**Quoi** : `Career.jsx`, `careerModal.jsx` et `careerDetailModal.jsx` affichent `job.level`, `job.type` et `job.location` directement depuis Sanity (`{job.level}`, etc.). Ce ne sont pas des valeurs d'énumération fermée dans le schéma — ce sont des champs de texte libre : la chaîne stockée dans Sanity **est** le texte affiché, mot pour mot.

**Pourquoi ce n'est pas extrait** : extraire ces valeurs vers `messages/*.json` obligerait à coder une table de traduction indexée sur le texte français exact stocké aujourd'hui dans Sanity. Si la personne responsable du contenu modifie ou ajoute une valeur dans le Studio, l'application afficherait silencieusement un texte non traduit ou une clé manquante, sans aucun signal au moment du build — réintroduisant exactement le problème que ce mandat cherche à éliminer (du contenu qui échappe au contrôle de Sanity). Voir aussi `docs/adr/0001-architecture-i18n.md`.

**Conséquence explicite pour la livraison bilingue** : le niveau, le type et le lieu de chaque offre d'emploi s'afficheront **en français sur la page carrières, même en locale arménienne**, à la fin de la phase 6B. **Ceci est une décision, pas un oubli** — la même catégorie que le point (r) (`/confidentialite`, `/termes`) : un gabarit de contenu qui reste unilingue parce que le corriger correctement exige une décision et un travail hors du périmètre de cette phase.

**Décision** : ne rien changer dans le cadre de ce mandat. Convertir ces champs Sanity vers le motif `localizedString` déjà utilisé ailleurs dans le schéma (ou introduire des codes stables avec étiquettes dans `messages/*.json`) est une décision de porteur de projet pour une phase future, pas un choix technique à trancher au passage d'une extraction de chaînes d'interface.

---

### w. Texte alternatif (`alt`) en anglais sur plusieurs images, sur un site par ailleurs francophone

**Quoi** : plusieurs attributs `alt` d'image portent un texte descriptif anglais alors que tout le reste du site est en français :
- `components/ui/Footer.jsx` (lignes 27, 46, 53) : « School Logo », « OSBL Logo », « Sourp Hagop School »
- `components/ui/BackgroundVideo.jsx` (ligne 21) : « Background »

**Correction (phase 6B, étape 3)** : `components/ui/topNav.jsx` ligne 104 (« chevron down ») a été retiré de cette liste après relecture du fichier en préparant son extraction — cette ligne fait partie d'un bloc JSX entièrement commenté (`{/* ... */}`, lignes 103-107), jamais rendu. Le grep initial qui a produit cette liste ne distinguait pas le code actif du code commenté. Ce n'est donc pas un bug d'accessibilité actif, seulement du code mort — voir aussi le sort de `alt="50e logo"` dans ce même fichier, qui lui est un cas intermédiaire (code actif, jamais déclenché par les données actuelles) traité dans le cadre de l'extraction plutôt que documenté ici.

**Non concernés** : les `alt="Facebook"`, `alt="Instagram"`, `alt="LinkedIn"` (`Anciens.jsx`, `Footer.jsx`) sont des noms de marque/plateforme, invariables par nature — même catégorie que les entrées déjà présentes dans `scripts/hardcoded-strings-allowlist.json`. Les `alt="logo"` (`MainHeading.jsx`, `Nav.jsx`) ne sont pas non plus en cause : « logo » est un mot français à part entière (de « logotype »), identique dans les deux langues.

**Comment confirmé** : recherche ciblée de tous les attributs `alt` littéraux dans `components/` et `app/` pendant la phase 6B (étape 2), en réponse à une demande explicite de les signaler individuellement.

**Décision** : ces 5 chaînes seront extraites telles quelles vers `messages/*.json` dans le cadre de la phase 6B (comme tout autre texte d'interface), mais chacune sera explicitement signalée dans le livrable de traduction (étape 4) pour que la personne traduisant ne suppose pas que l'anglais est intentionnel. Corriger le texte source vers un vrai texte alternatif français reste une décision séparée pour le porteur de projet — ce chantier ne le fait pas silencieusement au passage.

---

### x. La locale `hyw` n'était reconnue par aucune des API `Intl` natives testées — bascule silencieuse vers l'anglais, pas vers l'arménien (à l'origine du renversement de section 3 de l'ADR)

**Statut** : ce constat a directement motivé le changement de code de langue documenté dans `docs/adr/0001-architecture-i18n.md`, section 10 (`hyw` → `hy`, phase 6B). Il est conservé ici tel quel pour la traçabilité — c'est le constat empirique qui a déclenché la décision, pas un problème encore ouvert.

**Quoi** : en investiguant comment gérer `components/display/Calendar.jsx` (`FRENCH_MONTHS`/`FRENCH_DAYS`, des tables de correspondance codées en dur) et la syntaxe ICU des pluriels, il a été vérifié empiriquement (Node v22.19.0) que la balise de locale `hyw`, utilisée par ce projet à l'époque, n'était reconnue par aucune des API `Intl` testées :

| Appel | `hyw` | `hy` (arménien oriental, standard) | `fr` |
|---|---|---|---|
| `Intl.DateTimeFormat(locale, {month:'long'}).format(...)` | **« August » (anglais)** | « օգոստոս » (arménien) | « août » |
| `Intl.DateTimeFormat(locale, {weekday:'long'}).format(...)` | **« Tuesday » (anglais)** | « երեքշաբթի » (arménien) | « mardi » |
| `Intl.PluralRules.supportedLocalesOf([locale])` | **`[]` (vide — non supporté)** | `['hy']` | `['fr']` |
| `new Intl.PluralRules(locale).resolvedOptions().locale` | **`"en-US"`** | `"hy"` | `"fr"` |
| `.select(0)` / `.select(1)` / `.select(2)` | other / one / other *(règles anglaises)* | one / one / other | one / one / other |

**Conséquence** : `hyw` ne basculait pas vers une approximation arménienne raisonnable (comme `hy`, l'arménien oriental standard) — il basculait entièrement vers l'anglais, silencieusement, sans erreur. Tout code qui aurait utilisé `Intl.DateTimeFormat('hyw', ...)` ou `Intl.PluralRules('hyw')` en supposant un comportement arménien aurait affiché de l'anglais à une personne visitant la version arménienne du site.

**Décision (phase 6B)** :
- Le code de langue est devenu `hy` (voir ADR section 10) — ce changement ne touche que l'étiquette technique, pas la langue servie, qui reste l'arménien occidental à orthographe classique, traduit par une personne dont c'est la langue.
- `Calendar.jsx` : les 19 libellés (12 mois + 7 jours) sont **extraits vers `messages/*.json`**, pas remplacés par `Intl.DateTimeFormat` — même après le passage à `hy`, dont les données CLDR sont celles de l'arménien oriental (voir ADR section 10) et ne conviendraient pas telles quelles à un contenu en orthographe classique occidentale. Aucun texte visible par un visiteur n'est généré par `Intl` pour cette locale.
- **Convention d'écriture des pluriels ICU dans `messages/hy.json`** : toute chaîne comptable doit inclure une clause explicite `=0` en plus de `one`/`other` (ex. `{count, plural, =0 {...} one {...} other {...}}`). Ce n'est **plus un contournement** depuis le passage à `hy` — `Intl.PluralRules('hy')` résout aujourd'hui correctement `select(0) = "one"`, conformément à la grammaire arménienne réelle. C'est désormais une **convention d'écriture délibérée**, conservée pour trois raisons : elle est lisible directement par la personne qui traduit sans qu'elle ait besoin de connaître les règles CLDR sous-jacentes ; elle reste correcte indépendamment de toute évolution future des données CLDR ; et elle ne coûte que trois caractères de plus par chaîne.

**Portée — ce qui survit au changement de code de langue** : la vraie leçon de ce constat n'est pas « `hyw` était le mauvais choix », c'est que **toute API `Intl` native paramétrée par une balise de locale non standard doit être vérifiée empiriquement avant d'être utilisée**, jamais supposée fonctionnelle par analogie avec une locale voisine. C'est exactement cette vérification, appliquée à `hyw`, qui a permis de découvrir ce problème avant qu'il n'atteigne la production — la même discipline s'applique à `hy` et à toute future balise de locale que ce projet pourrait adopter.

---

### y. `calendrier/evenement/[id]/page.jsx` formate les dates avec la locale `fr-FR`/`fr-CA` codée en dur, indépendamment de la locale réelle du site

**Quoi** : les fonctions `formatEventDate`, `formatDetailsDate` et `formatDetailsTime` de cette page appellent `toLocaleDateString('fr-FR', ...)` et `toLocaleTimeString('fr-CA', ...)` avec une locale littérale, plutôt que la locale réelle de la page (`fr` ou `hy`, résolue via `useLocale()` de `next-intl`). Concrètement, la date et l'heure d'un évènement s'afficheront toujours au format français, même sur `/hy/calendrier/evenement/...`.

**Pourquoi ce n'est pas corrigé dans le cadre de la phase 6B** : ce n'est pas une chaîne d'interface codée en dur au sens de cette phase (rien à déplacer vers `messages/*.json`) — c'est un paramètre de locale figé passé à une API `Intl`, ce qui exige de relier ces trois fonctions à `useLocale()` et de décider quelle valeur `Intl` doit recevoir pour `hy` (voir la section 10 de l'ADR et l'item (x) sur les limites de `Intl` pour cette locale — `Intl.DateTimeFormat('hy', ...)` produit un vrai résultat arménien, mais avec des données CLDR d'arménien oriental, pas occidental classique). C'est un changement de logique, pas une extraction de chaîne — hors du périmètre de cette phase.

**Comment confirmé** : lecture du fichier pendant son extraction de chaînes (phase 6B, étape 3).

**Décision** : documenté ici pour une décision et une correction futures, non traité dans ce mandat.

---

### z. Changement de contenu français introduit en passant : le badge « postes disponibles » affiche désormais « 0 POSTE » plutôt que « 0 POSTES »

**Quoi** : `components/Career.jsx` affichait auparavant le nombre de postes disponibles via un ternaire manuel : `job.postsAvailable === 1 ? "POSTE" : "POSTES"`. Pour toute valeur différente de 1 — y compris 0 — le mot affiché était « POSTES » (pluriel). En le convertissant vers la syntaxe de pluriel ICU réelle (`{count, plural, one {POSTE} other {POSTES}}`) pendant l'extraction des chaînes de la phase 6B, le comportement pour `count = 0` a changé : le français résout aujourd'hui `0` dans la catégorie `one` (confirmé empiriquement, voir `docs/adr/0001-architecture-i18n.md` section 10), donc le badge affiche maintenant « 0 POSTE » (singulier) plutôt que « 0 POSTES ».

**Avant** → **Après** :
- Avant (ternaire manuel) : `0 POSTES`
- Après (pluriel ICU réel) : `0 POSTE`

**Pourquoi ce changement n'a pas été annulé** : la règle CLDR réelle du français traite `0` comme grammaticalement singulier (« 0 poste », pas « 0 postes »), et c'est exactement ce que la conversion vers un pluriel ICU était censée corriger — un ternaire manuel comme celui d'origine est précisément le genre de logique informelle que la phase 6B cherchait à remplacer par des règles de langue réelles. Cependant, l'usage courant au Québec écrit couramment « 0 postes » (accord au pluriel par convention d'usage, pas par grammaire stricte), donc ce changement, bien que linguistiquement défendable, est un changement visible du site français de l'école, introduit par un chantier dont l'objectif était d'ajouter l'arménien — pas de modifier le français existant.

**Décision** : le changement n'est pas annulé ni corrigé silencieusement. Il est documenté ici précisément pour que le porteur de projet puisse trancher — revenir à « 0 POSTES » par convention d'usage québécois, ou garder « 0 POSTE » par exactitude grammaticale — en connaissance de cause, plutôt que de découvrir la différence sans explication.

**Portée de l'audit** : ce badge est le **seul** endroit de toute la phase 6B où une syntaxe de pluriel ICU a été introduite — vérifié par une recherche exhaustive de `plural` dans `messages/fr.json` et `messages/hy.json`. Aucun autre comportement de cas zéro n'a changé silencieusement ailleurs dans cette phase.

---

### aa. Corrigé en passant (phase 7) : `app/[locale]/layout.jsx` transmettait un objet à `className` au lieu d'une chaîne (item f) — texte brut hors `Typography`/`.h1`–`.h5` passe de la police système à Roboto

**Quoi** : le point (f) documentait que `<body className={{ fontFamily: "Roboto, sans-serif" }}>` ne faisait jamais rien, React sérialisant l'objet en la classe littérale `"[object Object]"`, qui ne correspond à aucune règle CSS — bug introduit par le commit `7b79427` (26 juin 2024, voir point f pour l'historique complet). La phase 7 (typographie arménienne) avait besoin d'un `<body>` avec une police correctement déclarée pour que la police arménienne chargée puisse s'y accrocher en repli — ce bug bloquait directement ce travail, d'où sa correction ici plutôt qu'un simple contournement.

**Correction** : `<body className={{ fontFamily: "Roboto, sans-serif" }}>` → `<body className="body-font">`, avec une nouvelle règle dans `globals.css` : `.body-font { font-family: var(--primary-ff); }`. Restaure l'intention d'origine (chaîne au lieu d'objet) sans changer le mécanisme (toujours un `className`, toujours appliqué au même élément).

**Avant** → **Après** :
- Avant : `<body>` n'avait aucune police déclarée ; le texte brut (hors composant `Typography` et classes `.h1`–`.h5`, qui déclarent chacun leur propre `font-family`) héritait de la pile par défaut de Tailwind Preflight sur `<html>` (`ui-sans-serif, system-ui, sans-serif, ...`), résolue en pratique à **Segoe UI sur Windows** — c'est précisément l'observation d'origine du point (f).
- Après : ce même texte brut hérite maintenant de `var(--primary-ff)` = **Roboto** (puis, pour les glyphes arméniens, du repli Noto Sans Armenian ajouté à la même variable en phase 7).

**Portée visible (relevée par une analyse AST dédiée, pas estimée)** : le plus gros contributeur est `components/ui/Header.jsx` (`HeaderText`, le grand titre d'en-tête), utilisé sur 28 pages sur ~33. Voir le rapport de la phase 7, étape 2 pour la liste complète des 25 fichiers et 88 usages additionnels touchés par ce changement de police.

**Correction (phase 7, étape 3)** : le chiffre ci-dessus venait d'une analyse statique du code source (AST), pas d'une mesure sur les pages réellement rendues, et une vérification ultérieure page par page (33 routes, deux largeurs d'écran, feuilles de calcul CSS effectivement appliquées) a trouvé un chiffre différent et plus précis : **755 éléments de texte sur 32 des 33 pages** héritaient réellement de cette police au niveau du corps du document (`body`) — pas 88. La base commune à presque toutes les pages est de 8 éléments (5 libellés du menu déroulant de navigation, 1 titre de page, 2 paragraphes du pied de page), pas 12 comme rapporté dans une première passe de cette même vérification, elle-même corrigée après la découverte que le script utilisé ignorait silencieusement les règles CSS imbriquées dans une `@media` — un exemple concret de pourquoi ce journal insiste sur la vérification empirique plutôt que l'estimation. Voir le point (bb) pour un cas précis découvert grâce à cette correction : le nom de l'école dans la barre de navigation (`.logoTextItem`) n'était PAS concerné par ce bug-ci, contrairement à ce qui avait été rapporté dans un premier temps.

**Décision** : corrigé en passant, comme les points (k) et (l) — la correction est un sous-produit nécessaire du travail de la phase 7, pas son objectif. Consigné ici pour que le porteur de projet sache qu'un changement visuel réel (police du texte brut) accompagne ce qui pourrait sembler être un simple ajout de police arménienne.

---

### bb. `.logoTextItem` (nom de l'école dans la barre de navigation) s'affiche en Times New Roman sur écran large — bug distinct, non lié à la phase 7, toujours présent

**Quoi** : `components/ui/Nav.module.css` déclare `.logoTextItem { font-family: "Times New Roman"; ... }`, mais uniquement à l'intérieur de `@media (min-width: 1114px)`. Sur écran large (≥ 1114px), les quatre lignes du nom de l'école dans la barre de navigation — « L'ÉCOLE ARMÉNIENNE », « SOURP HAGOP », « ÉCOLE PRIMAIRE V. ET A. SARAFIAN », « ÉCOLE SECONDAIRE PASDERMAJIAN » — s'affichent donc en **Times New Roman**, une police à empattements qui ne correspond à aucune autre police du site (Roboto/Poppins). Ce n'est pas une conséquence du bug du point (aa)/(f) : la police est déclarée explicitement, pas absente — un tout autre problème, découvert uniquement parce que la correction du point (aa) ci-dessus a nécessité de revérifier cet élément précisément.

**Sous 1114px** (mobile/tablette) : le même bloc de texte existe dans le DOM mais n'est jamais visible — confirmé par capture d'écran du menu mobile ouvert (le tiroir affiche les catégories de navigation, pas le nom de l'école). Aucun impact visuel à ces largeurs.

**Historique** : la règle `.logoTextItem` existe depuis la création de `Nav.module.css`, commit `427ce87d` (27 août 2024) — elle n'a jamais déclaré une autre police que Times New Roman depuis son introduction.

**Correction d'une affirmation précédente** : un rapport de phase 7 avait d'abord identifié cet élément comme une victime du bug du point (aa) (héritage de la police du `body`, « visible sur chaque page depuis 2024 »). C'était inexact sur les deux plans — la police est déclarée explicitement (pas héritée) sur écran large, et l'élément n'est simplement pas visible sur mobile. Corrigé ici avant que l'affirmation erronée ne soit consignée.

**Décision** : non corrigé — hors du périmètre de la phase 7 (typographie arménienne), qui ne touche pas `Nav.module.css`. Consigné ici pour que le porteur de projet sache que le nom de l'école ne s'affiche pas dans la police du reste du site, sur écran large, indépendamment de tout travail d'internationalisation.

---

### cc. `setupShutdownHooks()` de `js/mongoose/connection.js` enregistre de nouveaux écouteurs de processus à chaque chargement du module, sans garde — `MaxListenersExceededWarning`

**Quoi** : `js/mongoose/connection.js` appelle `setupShutdownHooks()` de façon inconditionnelle au chargement du module (ligne 82). Cette fonction enregistre un écouteur `process.on("SIGINT", ...)`, un `process.on("SIGTERM", ...)` et, en développement, un `process.once("SIGUSR2", ...)` — sans jamais vérifier si ces écouteurs ont déjà été enregistrés lors d'un chargement précédent du module. À chaque nouvelle évaluation du module (rechargement à chaud en développement, ou tout autre scénario qui réimporte `connection.js`), un nouveau jeu d'écouteurs s'ajoute aux précédents plutôt que de les remplacer.

**Où** : `js/mongoose/connection.js`, fonction `setupShutdownHooks()` (lignes 59-80) et son appel inconditionnel à la ligne 82.

**Constaté** : le 3 septembre 2026, en dehors de tout travail i18n — pendant le diagnostic d'un incident non lié (serveur de développement bloqué) — `node.exe` a émis `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 SIGINT listeners added to [process]`, puis le même avertissement pour `SIGTERM` et pour `SIGUSR2`.

**Comment confirmé pré-existant** : lecture directe de `js/mongoose/connection.js` — la fonction ne contient aucune logique de garde contre un double enregistrement. Le dernier commit touchant ce fichier (`25635c9`, 12 septembre 2025) est antérieur de près d'un an au début de la branche `i18n` (18 août 2026) ; aucun commit de cette branche ne modifie ce fichier.

**Décision** : non corrigé — sans rapport avec le mandat i18n, consigné ici uniquement à des fins de traçabilité.

---

## Portée et conséquence

Aucun des points ci-dessus ne relève du mandat de la phase 0 i18n (normalisation des imports relatifs vers l'alias `@/`). Ils sont consignés ici uniquement à des fins de traçabilité.

**Point d'attention important** : les points **(a)** et **(b)** signifient qu'il n'existe actuellement **aucune barrière de test automatisée** sur ce dépôt — ni les tests unitaires Jest, ni la suite e2e Playwright ne sont en mesure de détecter une régression, que ce soit dans ce refactor ou dans les phases suivantes de la refonte i18n. La seule validation actuellement fiable est manuelle : build de production, inspection du manifeste de routes, et vérification visuelle/console des pages.
