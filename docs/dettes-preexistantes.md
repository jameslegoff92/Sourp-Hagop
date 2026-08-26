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

**Pourquoi c'est pertinent pour l'i18n** : c'est la cause directe d'une observation de la phase 4 (validation visuelle du rendu arménien) — le texte arménien de `/hyw/carrieres` se rendait via **Segoe UI**, la police système de Windows, et non via Roboto. Puisque la police réellement utilisée dépend entièrement de la pile système par défaut du système d'exploitation du visiteur, **la police affichée pour le contenu arménien varie selon la plateforme et n'a été vérifiée que sous Windows** — le rendu sous macOS, iOS, Android et Linux reste non testé, et la couverture des glyphes arméniens par la police système par défaut de ces plateformes n'est pas garantie.

**Comment confirmé pré-existant** : `git blame` et `git log --follow` sur `app/[locale]/layout.jsx`, remontant à deux commits de 2024, largement antérieurs à toute branche i18n.

---

## g. À 375px de large, les offres d'emploi 2 à 4 s'effondrent visuellement sur la page carrières

**Quoi** : Sur `/carrieres` (et `/hyw/carrieres`), à une largeur de viewport de 375px (mobile), seule la première carte d'offre d'emploi affiche son contenu complet. Les cartes 2, 3 et 4 s'effondrent à une hauteur visible de zéro, ne laissant flotter que leur badge positionné en absolu (« 1 POSTE dispo. »), avec de grands espaces vides entre eux.

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

**Conséquence pour ce mandat** : les pages `/hyw/*` afficheront des titres et descriptions en français dans les résultats de recherche, faute de contrepartie arménienne. L'ajout de ces champs est hors du périmètre des phases actuelles et nécessite une décision du porteur de projet.

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

**Corrigé par** : commit `refactor(i18n): move routes under [locale] segment` / `feat(i18n): set request locale on localized routes` (phase 3) — le déplacement du layout sous `[locale]` a naturellement remplacé la valeur codée en dur par `lang={locale}`, résolue dynamiquement (`fr` ou `hyw`) selon la route.

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

### n. Le lien « Calendrier » du menu mobile pointe vers une route qui n'existe pas (`/about`)

**Quoi** : `components/ui/Nav.jsx` définit son propre tableau `navItems` (utilisé uniquement dans la grille de liens rapides du tiroir de navigation mobile, `MobileNav` → `FooterGrid`), où l'élément « Calendrier » pointe vers `/about`. `components/ui/topNav.jsx` définit un tableau `navItems` distinct (utilisé dans la barre de navigation du haut, en version bureau), où le même élément pointe correctement vers `/calendrier`. Les deux fichiers ont donc deux copies indépendantes et divergentes de la même liste de liens rapides.

**Vérifié** : `Nav.jsx` est bien le menu réellement utilisé en production, pas un composant mort. `components/ui/Header.jsx` — importé et rendu par la quasi-totalité des pages de contenu du site (Admissions, Administration, Anciens, Agora, Historique, Uniform, Créalab, Comité de parents, Carrières, Locations, Team, ProtecteurNational, ProjetEducatif, ServiceDeGarde, Secondaire, Primaire, Prescolaire, Soutien, Transport, TuitionFees, etc.) — rend à la fois `<TopNav />` et `<Nav />`. La page d'accueil (`app/[locale]/page.jsx`) fait de même directement. Aucune route `app/[locale]/about/` n'existe (confirmé par inspection directe du dossier `app/[locale]/`), seule `app/[locale]/calendrier/` existe. **Le lien est donc réellement mort, en production, sur mobile uniquement** (la version bureau, via `topNav.jsx`, est correcte) — un visiteur mobile cliquant sur « Calendrier » dans le tiroir de menu atterrit sur une page 404.

**Comment confirmé** : recherche de toutes les utilisations de `Nav`/`TopNav`/`Header` dans le dépôt, lecture des deux fichiers `navItems`, et vérification de l'arborescence réelle de `app/[locale]/`.

### o. Deux types de documents orphelins existent dans `staging`, sans schéma enregistré : `AiglePage` et `pourquoi`

**Quoi** : L'export de `staging` (phase 5A, étape 4) a révélé deux documents dont le `_type` ne correspond à aucun schéma enregistré dans `studio/schemaTypes/index.ts` : `AiglePage` (avec un A majuscule, à côté du type correctement enregistré `aiglePage`) et `pourquoi` (à côté du type correctement enregistré `pourquoiPage`). Ces deux documents ne sont lus par aucune requête GROQ de l'application et ne sont touchés par aucune étape de ce mandat (le script de migration ne connaît que les types réellement enregistrés).

**Risque à signaler au porteur de projet** : si quelqu'un a un jour édité du contenu dans l'un de ces deux documents en croyant modifier la vraie page (`aiglePage` ou `pourquoiPage`), ce contenu n'a jamais été visible sur le site — ni avant, ni après ce mandat. Cela vaut la peine d'être vérifié auprès de la personne qui gère le contenu, au cas où du travail aurait été perdu de ce fait.

**Décision** : ne pas supprimer ces documents. Une suppression est une décision qui appartient au porteur de projet, pas à ce chantier technique — d'autant plus si l'un d'eux contient du contenu que quelqu'un pensait avoir publié.

---

## Portée et conséquence

Aucun des points ci-dessus ne relève du mandat de la phase 0 i18n (normalisation des imports relatifs vers l'alias `@/`). Ils sont consignés ici uniquement à des fins de traçabilité.

**Point d'attention important** : les points **(a)** et **(b)** signifient qu'il n'existe actuellement **aucune barrière de test automatisée** sur ce dépôt — ni les tests unitaires Jest, ni la suite e2e Playwright ne sont en mesure de détecter une régression, que ce soit dans ce refactor ou dans les phases suivantes de la refonte i18n. La seule validation actuellement fiable est manuelle : build de production, inspection du manifeste de routes, et vérification visuelle/console des pages.
