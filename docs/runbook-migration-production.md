# Runbook — Migration de localisation en production

**Portée** : ce document couvre le déploiement coordonné en production de trois éléments qui doivent être livrés ensemble (voir `docs/adr/0001-architecture-i18n.md`, section 8) : le schéma Studio localisé, la migration des données existantes, et les requêtes GROQ localisées de la phase 6A. **Aucun des trois ne peut être déployé seul** — le schéma seul laisse le contenu incohérent avec ce que le Studio attend ; la migration des données seule casse toutes les pages dont la requête n'est pas encore mise à jour (démontré empiriquement en phase 5A étape 4 : React error #31, page blanche) ; les requêtes seules interrogent des champs qui n'existent pas encore sous cette forme.

**Prérequis pour utiliser ce document** : la phase 6A (requêtes localisées) doit être terminée et fusionnée. Ce runbook suppose que c'est le cas.

**Ce document est un guide d'exécution, pas une autorisation.** Chaque étape marquée « ARRÊTER » signifie : cesser immédiatement, ne pas improviser de solution de contournement, et revenir vers le porteur de projet.

---

## Étape 0 — Coordination non technique (avant toute commande)

Cette étape n'est pas optionnelle et n'est pas une formalité : le déploiement du schéma change immédiatement et visuellement la façon dont chaque champ de texte apparaît dans le Studio, pour quiconque l'ouvre après le déploiement.

1. **Fixer une fenêtre de maintenance explicite** avec le porteur de projet — date, heure de début, durée estimée (à titre indicatif, la répétition complète sur staging avec un jeu de données de taille comparable a pris environ 15 minutes de bout en bout, sauvegarde comprise, hors temps de construction/déploiement de l'application).

2. **Contacter directement la personne responsable du contenu à l'école** et lui expliquer concrètement, avant qu'elle ne le découvre par surprise :
   - **Ce qui va changer visuellement** : chaque champ de texte qu'elle modifie aujourd'hui comme une simple boîte (titre, paragraphe, etc.) va devenir un champ à deux colonnes — une pour le français, une pour l'arménien occidental. Ce n'est pas une régression ; c'est le nouveau format prévu.
   - **Ce qui ne change pas** : le contenu français existant sera automatiquement replacé dans la colonne française — rien n'est perdu, rien à ressaisir.
   - **Ce qu'elle doit faire** : ne pas ouvrir le Studio ni modifier de contenu pendant toute la fenêtre de maintenance. Confirmer explicitement (par écrit, courriel ou message) qu'elle a bien compris et qu'elle restera hors du Studio jusqu'au signal de fin.

3. **Obtenir un « GO » explicite** du porteur de projet avant de commencer l'étape 1. Ne jamais commencer sur la base d'une supposition de disponibilité.

4. **Décision préalable requise, hors de ce runbook** : le sort du document orphelin `pourquoi` vs. le document enregistré `pourquoiPage` (voir le rapport de comparaison remis séparément) doit être tranché par le porteur de projet *avant* cette migration, ou explicitement mis de côté en connaissance de cause — sans quoi `getPourquoiPage` restera non localisée après ce déploiement, comme c'est le cas sur staging.

---

## Étape 1 — Pré-vol technique

1. **Vérifier qu'aucun brouillon n'est en attente sur `production`** :
   ```bash
   cd studio
   npx sanity documents query "count(*[_id in path(\"drafts.**\")])" --dataset production
   ```
   Le résultat attendu est `0`. **Point d'attention** : lors de la répétition de la phase 5B, un brouillon orphelin de `teamPage` a été retrouvé sur `production` elle-même (pas seulement sur `staging`), sans lien avec une édition en cours — probablement un reliquat ancien. Si ce brouillon existe toujours au moment de la migration réelle, ARRÊTER et le faire examiner par la personne responsable du contenu (publier ou supprimer, selon son intention) avant de poursuivre — ne jamais publier ou supprimer un brouillon soi-même sans confirmation.

2. **Confirmer la disponibilité de `SANITY_API_WRITE_TOKEN`** dans `.env.local`, sans jamais l'afficher à l'écran ni le journaliser. Se rappeler (voir `docs/dettes-preexistantes.md`) que ce jeton est scoping **projet**, pas **dataset** — il peut techniquement écrire sur `production` comme sur `staging`. `assertSafeForWrite()` (`scripts/sanity-write-guard.mjs`) est la seule barrière réelle à ce stade ; ne jamais exécuter de script d'écriture qui ne l'appelle pas avant sa première mutation.

---

## Étape 2 — Sauvegarde de `production`

1. **Exporter `production`** vers un emplacement durable, **hors du dépôt git** :
   ```bash
   cd studio
   npx sanity dataset export production "<chemin-hors-du-depot>/production-backup-<AAAA-MM-JJ>.tar.gz"
   ```
   Compter environ 2 minutes pour ~310 entrées (33 documents + ~308 fichiers média) — chiffres observés lors de la répétition de phase 5B ; à ajuster si le contenu a grossi depuis.

2. **Vérifier l'intégrité de l'archive** avant de continuer :
   ```bash
   tar -tzf "<chemin>/production-backup-<AAAA-MM-JJ>.tar.gz" | wc -l
   ```
   Un nombre d'entrées cohérent avec le nombre de documents et d'assets attendu (vérifiable via `count(*)` sur le dataset juste avant l'export) confirme que l'archive est lisible et complète. Une archive tronquée ou illisible = ARRÊTER, ne pas poursuivre sans sauvegarde valide.

3. **Documenter l'emplacement exact** de cette sauvegarde quelque part que le porteur de projet peut retrouver sans dépendre de cette session de travail.

---

## Étape 3 — Déploiement du schéma Studio

1. Depuis `studio/`, avec les variables d'environnement pointant explicitement vers `production` :
   ```bash
   SANITY_STUDIO_PROJECT_ID=col2tg5g SANITY_STUDIO_DATASET=production npx sanity deploy
   ```
   **C'est la seule étape de tout ce mandat i18n où cibler intentionnellement `production` est correct** — à ne pas confondre avec toute autre commande de ce projet, qui doit toujours cibler `staging` sauf ici.

2. **Vérification** : ouvrir le Studio déployé (URL de production) et confirmer qu'un type de document connu (ex. `alertBanner`) affiche désormais des champs à deux colonnes français/arménien pour ses champs localisés. Ne pas modifier de contenu à cette étape — vérification visuelle seulement.

---

## Étape 4 — Migration des données

1. **Dry-run d'abord**, jamais l'inverse :
   ```bash
   MIGRATION_DATASET=production node -r dotenv/config scripts/migrate-localize-fields.mjs dotenv_config_path=.env.local
   ```

2. **Lire la première ligne affichée** : `[write-guard] about to write to dataset "production"`. C'est la seule fois dans tout ce mandat où cette phrase doit apparaître intentionnellement. Si le dataset annoncé n'est **pas** `"production"`, ARRÊTER immédiatement (Ctrl+C) — la commande ne cible pas ce qui est prévu.

3. **Comparer les totaux rapportés** à ceux observés lors de la répétition de phase 5B sur un clone frais de production (219 entrées de manifeste, ~605 instances de valeurs transformées, ~21 déjà localisées, ~70 absences, **0 forme inattendue**). Un écart matériel — en particulier tout nombre de « formes inattendues » supérieur à 0 — signifie que le contenu de production a changé d'une façon que l'inventaire n'a pas anticipée. ARRÊTER et ne pas appliquer sans comprendre l'écart.

4. **Vérifier la taille du payload de transaction** rapportée (doit rester très en dessous de la limite documentée de 10 Mo de l'API Sanity — observée à ~135 Ko lors de la répétition). Le script refuse de lui-même de continuer au-delà de 2 Mo ; si ce refus se déclenche, ne pas contourner — cela signifierait un volume de contenu bien supérieur à ce qui a été testé.

5. **Si tout est conforme**, appliquer :
   ```bash
   MIGRATION_DATASET=production node -r dotenv/config scripts/migrate-localize-fields.mjs --apply dotenv_config_path=.env.local
   ```
   Relire à nouveau la ligne `[write-guard] about to write to dataset "production"` avant que la transaction ne se valide. Même vérification qu'à l'étape 4.2.

6. **Re-exécuter immédiatement le dry-run** (sans `--apply`) :
   ```bash
   MIGRATION_DATASET=production node -r dotenv/config scripts/migrate-localize-fields.mjs dotenv_config_path=.env.local
   ```
   Doit rapporter **0 document touché, 0 instance transformée** — c'est la preuve d'idempotence sur les données réelles, immédiatement après l'écriture. Si ce n'est pas le cas, ARRÊTER et ne pas poursuivre vers l'étape 5.

---

## Étape 5 — Déploiement de l'application (Vercel)

1. Confirmer que la branche déployée en production contient bien les requêtes localisées de la phase 6A pour les 26 fonctions concernées, et que `getPourquoiPage`/`getLibraryPage` restent dans l'état décidé (non localisées, en attente de décision du porteur de projet).

2. Déclencher le déploiement de production selon le processus Vercel habituel du projet (fusion vers la branche de production, ou promotion manuelle d'un déploiement).

3. Attendre la fin du déploiement avant de passer à la vérification.

---

## Étape 6 — Vérification post-déploiement

1. Exécuter le smoke test contre l'URL réelle de production :
   ```bash
   SMOKE_BASE_URL=https://<domaine-de-production> npm run smoke
   ```
   Doit rapporter 66/66 (ou le compte total de routes en vigueur à ce moment).

2. **Charger manuellement au moins 5 pages, dans les deux langues**, sur le site réel — pas seulement en local. Confirmer l'absence de `[object Object]`, de `undefined`, de clés brutes (`_type`, `fr`, `hyw` visibles comme texte), et de page blanche.

3. **Vérifier avec la personne responsable du contenu**, pas seulement techniquement : lui demander de se reconnecter au Studio et de confirmer que son contenu est bien là, intact, dans la nouvelle présentation à deux colonnes. C'est la vérification qui compte le plus — une vérification purement technique ne remplace pas sa confirmation.

4. Confirmer que la fenêtre de maintenance est terminée et l'en informer explicitement.

---

## Procédure de retour en arrière (rollback)

**Étape 3 (schéma) — le Studio déployé est cassé ou incohérent** : revenir au commit précédent dans `studio/schemaTypes/`, puis relancer `sanity deploy` depuis cet état. Il n'existe pas de mécanisme de retour en arrière automatique côté Sanity pour un déploiement de Studio — la seule méthode fiable est de redéployer un état antérieur connu.

**Étape 4 (migration des données) — problème détecté après l'application** :
- Grâce à la transaction unique et atomique, soit toutes les 29 (ou N) écritures ont été appliquées, soit aucune ne l'a été — il ne peut pas y avoir d'état à moitié migré causé par cette commande elle-même.
- Si un problème est néanmoins détecté après coup (contenu incorrect, décision à annuler), restaurer **uniquement les documents concernés** depuis la sauvegarde de l'étape 2, **sans jamais supprimer le dataset `production`** :
  ```bash
  npx sanity dataset import "<chemin>/production-backup-<AAAA-MM-JJ>.tar.gz" production --replace
  ```
  `--replace` écrase les documents existants par leur version sauvegardée sans toucher au reste du dataset. **Ne jamais utiliser `sanity dataset delete` sur `production`, à aucun moment, pour aucune raison** — contrairement à la répétition sur `staging`, où la suppression complète du dataset était une méthode acceptée pour ce mandat.

**Étape 5 (déploiement de l'application) — le site casse après déploiement** : utiliser la fonction de retour en arrière de Vercel (promotion du déploiement de production précédent) — action immédiate, ne nécessite pas de nouveau build.

**Étape 6 — un problème est détecté après coup** : évaluer la gravité avant d'agir.
- Si le site affiche des pages cassées pour les visiteurs : revenir en arrière sur Vercel en premier (rétablit un état fonctionnel immédiatement), puis diagnostiquer avant de retenter.
- Si seul le contenu est en cause (pas de page cassée) : corriger via le Studio normalement, pas via un rollback de données.
