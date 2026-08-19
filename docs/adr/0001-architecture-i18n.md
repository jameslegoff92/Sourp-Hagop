# ADR 0001 — Architecture de l'internationalisation (i18n)

**Date** : 19 août 2026
**Statut** : en partie décidé, en partie proposé (voir la section « Points en attente d'approbation »)
**Portée** : phase 2 de la refonte i18n, branche `i18n`

Ce document explique les choix techniques faits pour ajouter le support de deux langues (français et arménien occidental) au site, et pourquoi. Il est écrit pour être compréhensible sans connaissances techniques préalables : chaque décision est accompagnée de son « pourquoi ».

---

## 1. Décision : la langue affichée dépend de l'URL, pas d'un simple bouton

**Aujourd'hui**, le changement de langue sur le site est géré par un petit composant React (`LangContext`) : un bouton change une variable en mémoire dans le navigateur, mais l'adresse (URL) de la page ne change pas. Cela veut dire :
- Un moteur de recherche (Google, etc.) ne peut pas indexer séparément la version française et la version arménienne d'une page — il ne voit qu'une seule URL.
- On ne peut pas partager un lien direct vers la version arménienne d'une page : le destinataire recevra toujours la langue par défaut.

**Décision retenue** : adopter une architecture où la langue fait partie de l'URL elle-même (ex. `/hyw/carrieres` pour la version arménienne, si un préfixe est utilisé). C'est l'approche standard pour un site multilingue destiné à être indexé par les moteurs de recherche, et c'est ce que permet la bibliothèque `next-intl`, désormais câblée dans le projet (mais pas encore activée — voir section 2).

Cette étape (phase 2) met en place la « plomberie » technique nécessaire, sans changer une seule page visible du site. Rien de ce que voit un visiteur aujourd'hui ne change tant que la phase 3 n'a pas eu lieu.

---

## 2. PROPOSÉ, PAS ENCORE DÉCIDÉ : comment les URL françaises et arméniennes seront structurées

Deux réglages ont été câblés dans le code à titre de **proposition technique**, mais **ils n'ont pas encore été validés par le porteur de projet** :

- **`localePrefix: 'as-needed'`** : le français resterait sur les URL actuelles, sans préfixe (`/carrieres`), et seul l'arménien recevrait un préfixe (`/hyw/carrieres`).
- **`localeDetection: false`** : le site ne devinerait jamais la langue automatiquement à partir des réglages du navigateur du visiteur. Une même adresse afficherait toujours le même contenu, peu importe qui la visite.

**Pourquoi cette proposition** : le site est actuellement en ligne et indexé par Google avec des URL françaises sans préfixe. Avec ce réglage, ces URL ne changeraient pas du tout — pas de redirection, pas de perte de référencement, pas de lien cassé. Seules les nouvelles pages en arménien recevraient un préfixe `/hyw/`.

**⚠️ Coût si ce choix est changé plus tard** : une fois la phase 3 déployée (activation réelle du changement de langue), revenir sur ce choix — par exemple décider que le français doit lui aussi avoir un préfixe comme `/fr/` — obligerait à rediriger en masse (redirections dites « 301 ») toutes les URL françaises existantes vers leurs nouvelles adresses. Sur un site déjà indexé et fréquenté, cela représente un risque réel de perte temporaire de référencement et nécessite une planification soigneuse. **C'est pourquoi cette décision doit être validée maintenant, avant la phase 3, plutôt que d'être changée après coup.**

---

## 3. Le code de langue « hyw » pour l'arménien occidental

Le projet utilise le code `hyw` (et non `hy`) pour désigner l'arménien occidental à orthographe classique — la variante parlée par la diaspora et enseignée à l'école Sourp Hagop, distincte de l'arménien oriental (`hy`, parlé en Arménie).

**Point ouvert, non résolu** : la norme technique du web pour indiquer aux moteurs de recherche qu'une page existe dans plusieurs langues (balise dite « hreflang ») attend un code de langue de la norme ISO 639-1, qui ne connaît que `hy` (arménien, sans distinction occidental/oriental) — `hyw` n'existe qu'au niveau ISO 639-3, une norme plus fine non reconnue par hreflang. Il faudra donc décider, avant l'activation en phase 3, si les balises hreflang afficheront `hy` (conforme à la norme mais linguistiquement imprécis) ou une syntaxe étendue comme `hy-Latn`/variante régionale. Cette question n'a pas d'incidence sur le fonctionnement du site lui-même, seulement sur la façon dont Google comprend la relation entre les deux versions linguistiques.

À noter : le schéma de contenu actuel dans Sanity (voir section 4) utilise déjà le code `hy` pour ses champs, alors que le code technique utilisera `hyw`. Cet écart de nommage entre le contenu et le code est une illustration concrète du sujet traité en section 5.

---

## 4. Frontière entre le texte de l'interface et le contenu éditorial

Deux catégories de texte cohabitent sur le site, et elles ne sont **pas** gérées de la même façon ni par les mêmes personnes :

- **Le texte de l'interface** (« chrome » de l'application) : libellés de boutons, menus, messages d'erreur, etc. Ce texte vit désormais dans des fichiers `messages/fr.json` et `messages/hyw.json`, gérés par l'équipe technique dans le code source.
- **Le contenu éditorial** : titres de pages, textes descriptifs, offres d'emploi, etc. Ce contenu continue de vivre dans Sanity (l'outil de gestion de contenu), modifiable par le personnel de l'école sans intervention technique.

Cette séparation est délibérée et doit rester ainsi : **le code possède l'interface, Sanity possède le contenu.** Aucun texte éditorial ne doit être copié dans les fichiers `messages/*.json`, et aucun libellé d'interface ne doit être ajouté dans Sanity.

Un script (`scripts/check-messages.mjs`, exécutable via `npm run check:messages`) vérifie automatiquement que les fichiers `messages/fr.json` et `messages/hyw.json` contiennent exactement les mêmes clés — pour éviter qu'un libellé d'interface existe dans une langue mais pas dans l'autre.

---

## 5. Points proposés, NON décidés — en attente d'approbation du porteur de projet

Les éléments suivants sont des pistes techniques évoquées durant cette phase, mais **aucun n'est une décision arrêtée**. Chacun nécessite une validation explicite avant d'être mis en œuvre :

1. **`localePrefix: 'as-needed'`** (voir section 2) — proposition, pas décision.
2. **`localeDetection: false`** (voir section 2) — proposition, pas décision.
3. **Remplacer les champs `fr`/`hy` codés en dur dans `localized.ts`** (le schéma Sanity, voir section 3) **par un type `internationalizedArray`**, une approche plus flexible et standard pour gérer plusieurs langues dans Sanity, qui permettrait d'ajouter une langue sans modifier le schéma à chaque fois.
4. **Déplacer la gestion de la navigation du site (menus) hors de Sanity, vers les fichiers `messages/*.json`** — actuellement la navigation est éditable par le personnel dans Sanity ; ce changement la ferait passer sous contrôle du code, ce qui a des implications sur qui peut la modifier au quotidien.
5. **Le phasage de la migration du schéma Sanity** (calendrier et ordre dans lequel les différents types de contenu seraient adaptés pour supporter deux langues) — **dépend d'une liste de priorité des pages que nous n'avons pas encore.** Sans cette liste, il est impossible de proposer un calendrier réaliste.

Ces cinq points doivent être discutés et tranchés par le porteur de projet avant d'être engagés dans le code.

---

## 6. DÉCIDÉ : indexation bloquée (`noindex`) pour la locale non traduite, jusqu'à traduction réelle

**Décision** : Au déploiement, la locale non par défaut (`hyw`, arménien occidental) restera marquée `noindex` pour les moteurs de recherche tant que son contenu n'est pas réellement traduit — page par page, pas globalement pour toute la locale d'un coup.

**Pourquoi** : Les requêtes GROQ vers Sanity (voir `lib/sanity-queries.js`) reposent sur un repli (fallback) qui sert le contenu français quand aucune traduction arménienne n'existe pour une page ou un champ donné. Concrètement, cela signifie qu'aujourd'hui, `/hyw/n'importe-quelle-page` répond HTTP 200 en affichant du contenu français — pas une erreur, pas une redirection, un vrai 200 avec du texte français sous une URL censée être en arménien. Pour un moteur de recherche, c'est du contenu dupliqué (identique à la version française, à une adresse différente), ce qui peut nuire au référencement des deux versions.

Le taux de remplissage du contenu en arménien est actuellement de **0 %** : aucune page n'a encore de traduction réelle dans Sanity. La traduction du contenu suit un calendrier séparé de ce chantier technique, porté par d'autres personnes — il ne serait pas raisonnable de faire dépendre l'indexation de la version arménienne de l'avancement de ce travail purement technique.

**Mise en œuvre** : Cette décision sera implémentée en **phase 7**, en même temps que les balises hreflang (voir section 3, point ouvert sur `hy` vs `hyw`) et le plan de site (`sitemap.xml`) — les trois relèvent de la même préoccupation (comment les moteurs de recherche perçoivent les deux versions du site) et seront traités ensemble.

**Ce qui N'EST PAS décidé ici** : Retirer le `noindex` — c'est-à-dire juger qu'une page arménienne est suffisamment traduite pour être indexée — est une **décision distincte et ultérieure**, qui appartient au porteur de projet, page par page, au fur et à mesure de l'avancement réel des traductions. Ce document ne préjuge pas de quand ni comment cette décision sera prise.
