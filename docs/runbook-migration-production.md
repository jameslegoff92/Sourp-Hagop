# Runbook — Migration de localisation en production

**Portée** : ce document couvre le déploiement coordonné en production de trois éléments qui doivent être livrés ensemble (voir `docs/adr/0001-architecture-i18n.md`, section 8) : le schéma Studio localisé, la migration des données existantes, et les requêtes GROQ localisées de la phase 6A. **Aucun des trois ne peut être déployé seul** — le schéma seul laisse le contenu incohérent avec ce que le Studio attend ; la migration des données seule casse toutes les pages dont la requête n'est pas encore mise à jour (démontré empiriquement en phase 5A étape 4 : React error #31, page blanche) ; les requêtes seules interrogent des champs qui n'existent pas encore sous cette forme.

**Prérequis pour utiliser ce document** : la phase 6A (requêtes localisées) doit être terminée et fusionnée. Ce runbook suppose que c'est le cas.

**Ce document est un guide d'exécution, pas une autorisation.** Chaque étape marquée « ARRÊTER » signifie : cesser immédiatement, ne pas improviser de solution de contournement, et revenir vers le porteur de projet.

**Toutes les commandes ci-dessous sont copiables-collables telles quelles** — aucun `<placeholder>` à remplir, aucun nom de dataset générique. Là où une commande cible réellement `production`, elle est marquée **[PRODUCTION]**. Si en plus elle modifie ou déploie quelque chose de façon difficile à défaire instantanément, elle porte aussi **[IRRÉVERSIBLE]** — les deux marqueurs sont expliqués et justifiés dans chaque section « Rollback », pas juste apposés : une commande **[PRODUCTION]** seule (sans **[IRRÉVERSIBLE]**) a un chemin de retour en arrière rapide et documenté ; une commande **[IRRÉVERSIBLE]** n'en a pas, ou seulement un retour partiel (restauration sélective de documents, pas un simple redéploiement).

**Changement par rapport à la version précédente de ce document** : l'étape « nouvel export de sauvegarde » a été retirée. Une sauvegarde valide existe déjà (`production-backup-2026-08-26.tar.gz`, vérifiée le 2026-09-08 : 33 documents, `data.ndjson` présent, aucune corruption, identique document pour document à `production` telle qu'observée ce jour-là — voir le rapport de vérification correspondant). Ce projet est contraint en bande passante ce mois-ci ; un nouvel export coûterait environ 1 Go de transfert pour reproduire une sauvegarde qui existe déjà et reste valide. Ce runbook réutilise cette sauvegarde existante par son chemin complet.

---

## Étape 0 — Coordination non technique (avant toute commande)

Cette étape n'est pas optionnelle et n'est pas une formalité : le déploiement du schéma change immédiatement et visuellement la façon dont chaque champ de texte apparaît dans le Studio, pour quiconque l'ouvre après le déploiement.

1. **Fixer une fenêtre de maintenance explicite** avec le porteur de projet — date, heure de début, durée estimée (à titre indicatif, la répétition complète sur staging avec un jeu de données de taille comparable a pris environ 15 minutes de bout en bout, sauvegarde comprise, hors temps de construction/déploiement de l'application).

2. **Contacter directement la personne responsable du contenu à l'école** et lui expliquer concrètement, avant qu'elle ne le découvre par surprise :
   - **Ce qui va changer visuellement, et pour qui c'est nouveau** : elle a déjà ce format à deux colonnes (français/arménien) sur la page Carrières depuis mai 2026 — ça, ce n'est pas nouveau pour elle. **Tout le reste du site l'est** : chaque champ de texte qu'elle modifie aujourd'hui ailleurs (accueil, historique, admissions, équipe, etc.) comme une simple boîte va devenir, pour la première fois, un champ à deux colonnes. Ne pas lui dire qu'elle « connaît déjà » ce changement — elle le connaît pour une seule page sur plus de trente.
   - **Ce qui ne change pas** : le contenu français existant sera automatiquement replacé dans la colonne française — rien n'est perdu, rien à ressaisir.
   - **Ce qu'elle doit faire** : ne pas ouvrir le Studio ni modifier de contenu pendant toute la fenêtre de maintenance. Confirmer explicitement (par écrit, courriel ou message) qu'elle a bien compris et qu'elle restera hors du Studio jusqu'au signal de fin.

3. **Obtenir un « GO » explicite** du porteur de projet avant de commencer l'étape 1. Ne jamais commencer sur la base d'une supposition de disponibilité.

4. **Décision préalable requise, hors de ce runbook** : le sort du document orphelin `pourquoi` vs. le document enregistré `pourquoiPage` (voir le rapport de comparaison remis séparément) doit être tranché par le porteur de projet *avant* cette migration, ou explicitement mis de côté en connaissance de cause — sans quoi `getPourquoiPage` restera non localisée après ce déploiement, comme c'est le cas sur staging.

5. **Décision préalable requise sur les 3 brouillons en attente** (`secondaire`, `jardinLitterairePage`, `teamPage`) : le porteur de projet doit décider, pour chacun, de le publier ou de le rejeter *avant* l'étape 1.1 ci-dessous — le contenu précis de chaque différence (brouillon vs. publié) a été rapporté séparément le 2026-09-09. Tant qu'un brouillon existe, l'étape 1.1 continuera de le signaler et de bloquer la progression.

---

## Étape 1 — Pré-vol technique

### 1.1 — Vérifier qu'aucun brouillon n'est en attente sur `production`

**[PRODUCTION] — lecture seule**
```bash
cd studio
npx sanity documents query "*[_id in path(\"drafts.**\")]{_id,_type,_updatedAt}" --dataset production
```

**Succès si** : le résultat est `[]`.

**Ne pas utiliser `count(*[_id in path("drafts.**")])` pour cette vérification** — confirmé le 2026-09-09 : cette forme fait échouer la commande CLI (« Query returned no results ») précisément quand le compte est `0`, c'est-à-dire précisément dans le cas de succès qu'on cherche à confirmer. La forme tableau ci-dessus renvoie proprement `[]` dans ce cas et liste les brouillons sinon.

**ARRÊTER si** : le résultat n'est pas `[]`. Ne jamais publier ou supprimer un brouillon soi-même sans confirmation de la personne responsable du contenu (voir étape 0, point 5) — même si son contenu semble trivial.

**Vérifier avant de continuer** : que la décision de l'étape 0.5 a bien été appliquée (les brouillons publiés ou rejetés) avant de relancer cette commande.

**Rollback** : aucun — cette commande ne modifie rien.

---

### 1.2 — Confirmer la disponibilité du jeton d'écriture

Confirmer que `SANITY_API_WRITE_TOKEN` est présent dans `.env.local`, **sans jamais l'afficher à l'écran ni le journaliser** :
```bash
grep -c "^SANITY_API_WRITE_TOKEN=" .env.local
```

**Succès si** : le résultat est `1`.

**ARRÊTER si** : le résultat est `0` — obtenir le jeton avant de continuer, ne pas en créer un nouveau à la volée sans savoir pourquoi l'existant est absent.

**Rappel** : ce jeton est scoping **projet**, pas **dataset** (voir `docs/dettes-preexistantes.md`) — il peut techniquement écrire sur `production` comme sur `staging`. `assertSafeForWrite()` (`scripts/sanity-write-guard.mjs`) est la seule barrière réelle à ce stade ; ne jamais exécuter de script d'écriture qui ne l'appelle pas avant sa première mutation.

**Rollback** : aucun — cette commande ne modifie rien.

---

## Étape 2 — Vérifier la sauvegarde existante (aucun nouvel export)

La sauvegarde à utiliser est déjà sur disque :
```
C:\Users\Anayees\sanity-backups\production-backup-2026-08-26.tar.gz
```

### 2.1 — **[Action requise avant la fenêtre, pas pendant]** Déplacer la sauvegarde hors de `C:` (à 95 % de capacité)

```powershell
New-Item -ItemType Directory -Force -Path "D:\sanity-backups" | Out-Null
Move-Item "C:\Users\Anayees\sanity-backups\production-backup-2026-08-26.tar.gz" "D:\sanity-backups\production-backup-2026-08-26.tar.gz"
```

**Succès si** : la commande se termine sans erreur et `Test-Path "D:\sanity-backups\production-backup-2026-08-26.tar.gz"` retourne `True`.

**ARRÊTER si** : `D:` n'a pas au moins 1,1 Go libre (`Get-PSDrive D`) — ne pas déplacer un fichier qu'on ne peut pas confirmer intact à l'arrivée.

**Vérifier avant de continuer** : relancer l'étape 2.2 ci-dessous en pointant vers le **nouveau** chemin (`D:\sanity-backups\...`), pas l'ancien — l'ancien chemin n'existera plus après un déplacement réussi.

**Rollback** : `Move-Item` en sens inverse si nécessaire ; aucune perte de données possible tant que la commande a rapporté un succès (déplacement, pas copie-puis-suppression manuelle).

*(Toutes les commandes suivantes de cette étape utilisent le chemin `D:\...` en supposant que 2.1 a été exécutée. Si ce n'est pas encore fait, substituer `C:\Users\Anayees\sanity-backups\...`.)*

### 2.2 — Vérifier que l'archive est lisible et complète

```bash
tar -tzf "D:\sanity-backups\production-backup-2026-08-26.tar.gz" | wc -l
```

**Succès si** : le résultat est `312` (33 documents + `data.ndjson` + `assets.json` + les répertoires `files/`/`images/` + 308 fichiers média — confirmé le 2026-09-08).

**ARRÊTER si** : la commande échoue, retourne une erreur, ou un nombre différent de `312`. Une archive tronquée ou un nombre différent signifie ne pas se fier à cette sauvegarde pour un rollback — remonter au porteur de projet avant de continuer, ne pas décider seul de créer un nouvel export (coût en bande passante, voir la note en tête de document).

**Vérifier avant de continuer** : que `data.ndjson` apparaît bien dans la liste :
```bash
tar -tzf "D:\sanity-backups\production-backup-2026-08-26.tar.gz" | grep "data.ndjson"
```
Doit retourner exactement une ligne (`production-export-2026-08-27t01-45-28-687z/data.ndjson`).

**Rollback** : aucun — cette commande ne modifie rien, elle lit seulement l'archive.

### 2.3 — Compter les documents de contenu réels (hors fichiers média)

```bash
tar -xzOf "D:\sanity-backups\production-backup-2026-08-26.tar.gz" "production-export-2026-08-27t01-45-28-687z/data.ndjson" | wc -l
```

**Succès si** : le résultat est `33`.

**ARRÊTER si** : le résultat diffère de `33` — cela signifierait que l'archive elle-même a changé depuis la vérification du 2026-09-08, ce qui ne devrait techniquement pas arriver à un fichier statique ; si c'est le cas, ne pas continuer sans comprendre pourquoi.

**Rollback** : aucun.

---

## Étape 3 — Déploiement du schéma Studio

**Ce que ce mandat fait réellement ici, précisément** : il ne s'agit pas d'introduire des champs bilingues dans le Studio de l'école à partir de rien. Quelqu'un l'a déjà fait pour un type de contenu, en production, le 2026-05-07, puis s'est arrêté — schéma déployé, deux colonnes fonctionnelles, un des trente types réellement converti. Ce mandat termine une tentative déjà commencée, il ne la commence pas.

**État réel vérifié le 2026-09-09** (lecture directe du document de schéma déployé `_.schemas.default`, comparé champ par champ à `studio/schemaTypes/` sur cette branche, pour les 30 types enregistrés) :

| Type | État |
|---|---|
| `careerPage` | **Déjà entièrement localisé** — les 7 champs attendus (`headerText`, `introText`, `applicationNote`, `jobs[].title`, `jobs[].shortDescription`, `jobs[].sections[].customTitle`, `jobs[].sections[].content`) sont typés `localizedString`/`localizedBlock` dans le schéma déployé, exactement comme prévu. |
| `navigation` | À part — son type **n'existe pas du tout** dans le schéma déployé (ni ancien ni nouveau). Son document (`_id: "navigation"`) est un squelette quasi-vide créé le même jour (une section, un item sans titre ni texte ni URL, aucun `quickLinks`, aucun `portalLabel`) — pas du contenu migré, un fragment de test. Sans conséquence pour les visiteurs : `getNavigation()` (`lib/sanity-queries.js`) n'est appelé nulle part dans l'application — les menus réels sont codés en dur dans `Nav.jsx`/`topNav.jsx`. À inclure dans le déploiement ci-dessous comme n'importe quel autre type (le schéma ne l'a jamais eu), sans urgence particulière puisque rien ne le lit. |
| **Les 28 autres types** (`homePage`, `historyPage`, `administrationPage`, `secondaire`, `protecteurNationalPage`, etc.) | **Pas touchés du tout** — vérifié champ par champ pour chacun, pas seulement sondé. Tous leurs champs concernés sont encore au type simple (`string`/`text`/`array`), pas `localizedString`/`localizedText`/`localizedBlock`. |
| `libraryPage` | Exclu de cette comparaison, comme de la migration — schéma-stub à un seul champ `test`, décision phase 5A, sans rapport avec ce déploiement. |

**Conséquence pour cette étape** : Sanity ne propose pas de déploiement partiel ou différentiel — `sanity deploy` publie toujours le schéma compilé en entier, il n'existe pas de commande qui ne pousserait que « ce qui manque ». La commande ci-dessous reste donc un déploiement complet, comme avant. Ce qui change, c'est son effet réel : pour `careerPage`, redéployer un schéma déjà identique ne fait rien de visible — pour les 28 (29 avec `navigation`) autres types, c'est la toute première fois que l'éditrice de contenu verra l'écran à deux colonnes.

**[PRODUCTION] [IRRÉVERSIBLE-partiel — voir Rollback]**
```bash
cd studio
SANITY_STUDIO_PROJECT_ID=col2tg5g SANITY_STUDIO_DATASET=production npx sanity deploy
```

**C'est la seule étape de tout ce mandat i18n où cibler intentionnellement `production` pour le Studio est correct** — à ne pas confondre avec toute autre commande de ce projet, qui doit toujours cibler `staging` sauf ici et à l'étape 4.

**Succès si** : la commande se termine en indiquant le Studio déployé avec succès (URL affichée).

**Vérifier avant de continuer** :
1. Ouvrir le Studio déployé et confirmer qu'un type **jusqu'ici non localisé** (ex. `homePage`, pas `careerPage`) affiche désormais des champs à deux colonnes français/arménien. C'est le vrai test — `careerPage` les avait déjà et ne prouve rien sur ce déploiement-ci.
2. Confirmer que `careerPage` n'a **rien changé visuellement** — s'il a changé, le schéma qui vient d'être déployé diffère de celui déjà en place pour ce type, ce qui mérite d'être compris avant de continuer.

**Ne pas modifier de contenu à cette étape** — vérification visuelle seulement.

**ARRÊTER si** : le déploiement échoue, si un type jusqu'ici non localisé ne montre pas les champs à deux colonnes attendus après un rafraîchissement complet du navigateur, ou si `careerPage` a changé de façon inattendue.

**Rollback** : revenir au commit précédent dans `studio/schemaTypes/`, puis relancer la commande ci-dessus depuis cet état. Il n'existe pas de mécanisme de retour en arrière automatique côté Sanity pour un déploiement de Studio — la seule méthode fiable est de redéployer un état antérieur connu. C'est rapide (une commande) mais pas instantané (nécessite un nouveau déploiement) — d'où le marquage « partiel » plutôt que pleinement irréversible.

---

## Étape 4 — Migration des données

### 4.1 — Dry-run (jamais l'inverse de l'ordre ci-dessous)

**[PRODUCTION] — lecture seule (dry-run, aucune écriture)**
```bash
MIGRATION_DATASET=production node -r dotenv/config scripts/migrate-localize-fields.mjs dotenv_config_path=.env.local
```

**Succès si** :
- La première ligne affichée est exactement `[write-guard] about to write to dataset "production"`. C'est la seule fois dans tout ce mandat où cette phrase doit apparaître intentionnellement.
- Les totaux rapportés sont proches de ceux observés lors de la répétition de phase 5B sur un clone frais de production : **219 entrées de manifeste, ~605 instances de valeurs transformées, ~21 déjà localisées, ~70 absences, 0 forme inattendue**.

**ARRÊTER si** :
- La ligne `[write-guard]` annonce un dataset différent de `"production"` — Ctrl+C immédiatement, la commande ne cible pas ce qui est prévu.
- Le nombre de « formes inattendues » (`unexpected`) est supérieur à `0` — cela signifie que le contenu de production a changé d'une façon que l'inventaire n'a pas anticipée. Ne pas appliquer sans comprendre l'écart.
- Le payload de transaction rapporté dépasse 2 Mo — le script refuse déjà de lui-même de continuer au-delà de ce seuil ; ne pas contourner ce refus.

**Vérifier avant de continuer** : relire la sortie complète, pas seulement le résumé — en particulier la section « Absent fields » et « Unexpected-shape fields » doivent correspondre à ce qui est attendu (voir ci-dessus).

**Rollback** : aucun — dry-run, aucune écriture n'a lieu.

### 4.2 — Application réelle

**[PRODUCTION] [IRRÉVERSIBLE]**
```bash
MIGRATION_DATASET=production node -r dotenv/config scripts/migrate-localize-fields.mjs --apply dotenv_config_path=.env.local
```

**Avant d'exécuter** : relire à nouveau la ligne `[write-guard] about to write to dataset "production"` avant que la transaction ne se valide. Même vérification qu'à l'étape 4.1.

**Succès si** : la commande rapporte `[migrate] APPLY: committed.` et les mêmes totaux que le dry-run de l'étape 4.1 (transformés, absents, etc. — la transaction est atomique : soit tout est appliqué, soit rien ne l'est, donc les nombres ne peuvent pas différer entre le dry-run immédiatement précédent et l'apply).

**ARRÊTER si** : la commande se termine en erreur avant `committed.` — dans ce cas, grâce à l'atomicité de la transaction Sanity, **aucune donnée n'a été modifiée** ; il n'y a rien à défaire, seulement à diagnostiquer avant de retenter.

**Vérifier avant de continuer (obligatoire, pas optionnel)** : re-exécuter immédiatement le dry-run de l'étape 4.1 (sans `--apply`). Doit rapporter **0 document touché, 0 instance transformée** — c'est la preuve d'idempotence sur les données réelles, immédiatement après l'écriture. Si ce n'est pas le cas, **ARRÊTER et ne pas poursuivre vers l'étape 5**.

**Rollback** : restaurer **uniquement les documents concernés** depuis la sauvegarde, **sans jamais supprimer le dataset `production`** :
```bash
npx sanity dataset import "D:\sanity-backups\production-backup-2026-08-26.tar.gz" production --replace
```
`--replace` écrase les documents existants par leur version sauvegardée sans toucher au reste du dataset. **Ne jamais utiliser `sanity dataset delete` sur `production`, à aucun moment, pour aucune raison.** Marqué **[IRRÉVERSIBLE]** ci-dessus parce que tout contenu entré dans `production` *après* l'apply et *avant* qu'un problème soit détecté (par exemple si la personne responsable du contenu rouvre le Studio prématurément) serait perdu par ce rollback — la fenêtre de maintenance de l'étape 0 existe précisément pour réduire ce risque à zéro.

---

## Étape 5 — Déploiement de l'application (Vercel)

**[PRODUCTION] [IRRÉVERSIBLE-partiel — voir Rollback]**

1. Confirmer que la branche déployée en production contient bien les requêtes localisées de la phase 6A pour les fonctions concernées, et que `getPourquoiPage`/`getLibraryPage` restent dans l'état décidé (non localisées, en attente de décision du porteur de projet — étape 0, point 4).
2. Déclencher le déploiement de production selon le processus Vercel habituel du projet (fusion vers la branche de production, ou promotion manuelle d'un déploiement).
3. Attendre la fin du déploiement avant de passer à l'étape 6.

**Succès si** : le déploiement Vercel se termine avec un statut « Ready ».

**ARRÊTER si** : le build échoue — dans ce cas la production continue de servir l'ancien déploiement automatiquement (Vercel ne bascule jamais le trafic vers un build qui a échoué), donc il n'y a **aucune urgence de rollback** dans ce cas précis ; diagnostiquer avant de retenter.

**Vérifier avant de continuer** : passer à l'étape 6 seulement une fois le déploiement confirmé « Ready », pas seulement « Building ».

**Rollback** : utiliser la fonction de retour en arrière de Vercel (promotion du déploiement de production précédent) — action immédiate, ne nécessite pas de nouveau build. Marqué « partiel » plutôt que pleinement irréversible pour cette raison précise : le rollback applicatif est rapide, mais si l'étape 4 a déjà été appliquée, l'application revenue en arrière lira quand même des données migrées — voir la note de l'étape 8 (le rollback de l'app seule, sans celui des données, recrée exactement le problème que ce runbook existe pour éviter).

---

## Étape 6 — Vérification post-déploiement

### 6.1 — Smoke test contre l'URL réelle de production

**[PRODUCTION] — lecture seule**
```bash
SMOKE_BASE_URL=https://<domaine-de-production> npm run smoke
```
*(Remplacer `<domaine-de-production>` par le domaine réel au moment de l'exécution — c'est la seule valeur de ce document qui dépend de l'environnement Vercel courant plutôt que d'être fixe.)*

**Succès si** : `66/66 passing` (ou le compte total de routes en vigueur à ce moment).

**ARRÊTER si** : un nombre inférieur à 66/66 — revenir à l'étape 5, section Rollback, avant de diagnostiquer plus avant sur un site cassé pour de vrais visiteurs.

**Rollback** : voir étape 5.

### 6.2 — Vérification manuelle

Charger manuellement au moins 5 pages, dans les deux langues, sur le site réel — pas seulement en local. Confirmer l'absence de `[object Object]`, de `undefined`, de clés brutes (`_type`, `fr`, `hy` visibles comme texte), et de page blanche.

**ARRÊTER si** : l'un de ces symptômes apparaît sur une seule page — retour à l'étape 5, section Rollback.

### 6.3 — Confirmation par la personne responsable du contenu

Lui demander de se reconnecter au Studio et de confirmer que son contenu est bien là, intact, dans la nouvelle présentation à deux colonnes. **C'est la vérification qui compte le plus** — une vérification purement technique ne remplace pas sa confirmation.

### 6.4 — Fin de la fenêtre

Confirmer que la fenêtre de maintenance est terminée et en informer explicitement le porteur de projet et la personne responsable du contenu.

---

## Ce qui reste délibérément hors de ce runbook

- **La traduction du contenu** (208 champs) et **des libellés d'interface** (335 chaînes, `docs/chaines-a-traduire.md`) — aucun des deux ne bloque ni ne suit ce runbook. Le mécanisme de repli (`coalesce`/`select`, voir `lib/localizedFieldQuery.js`) sert le français tant qu'aucune traduction arménienne n'existe pour un champ donné — c'est vérifié, pas supposé (voir `lib/sanity-locale-fallback.test.js`). La personne responsable du contenu peut remplir les champs arméniens progressivement, à tout rythme, après la fin de ce runbook, sans jamais recasser le site.
- **Le retrait du `noindex` sur `/hy`** (`ARMENIAN_CONTENT_TRANSLATED` dans `lib/armenian-content-status.js`) — décision séparée et ultérieure du porteur de projet, basée sur l'existence réelle de contenu traduit, pas sur l'achèvement de ce runbook.

---

## Résumé des marqueurs

| Marqueur | Signification |
|---|---|
| **[PRODUCTION]** | La commande touche réellement le dataset ou l'environnement `production` — lecture ou écriture. |
| **[IRRÉVERSIBLE]** | Aucun chemin de retour en arrière rapide n'existe ; le rollback documenté est une restauration sélective, pas un simple redéploiement. |
| **[IRRÉVERSIBLE-partiel]** | Un rollback rapide existe (redéploiement, promotion Vercel), mais ne couvre pas tous les cas — voir la section Rollback de cette étape précise pour la limite exacte. |
| *(aucun marqueur)* | Lecture seule, ou ne touche que `staging`/le poste local — aucun risque pour `production`. |
