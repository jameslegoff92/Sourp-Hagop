# ADR 0001 — Architecture de l'internationalisation (i18n)

**Date** : 19 août 2026
**Statut** : en partie décidé, en partie proposé (voir la section « Points en attente d'approbation »)
**Portée** : phase 2 de la refonte i18n, branche `i18n`

Ce document explique les choix techniques faits pour ajouter le support de deux langues (français et arménien occidental) au site, et pourquoi. Il est écrit pour être compréhensible sans connaissances techniques préalables : chaque décision est accompagnée de son « pourquoi ».

---

## 1. Décision : la langue affichée dépend de l'URL, pas d'un simple bouton

**Avant la phase 4**, le changement de langue sur le site était géré par un petit composant React de contexte : un bouton changeait une variable en mémoire dans le navigateur, mais l'adresse (URL) de la page ne changeait pas. Cela voulait dire :
- Un moteur de recherche (Google, etc.) ne peut pas indexer séparément la version française et la version arménienne d'une page — il ne voit qu'une seule URL.
- On ne peut pas partager un lien direct vers la version arménienne d'une page : le destinataire recevra toujours la langue par défaut.

**Décision retenue** : adopter une architecture où la langue fait partie de l'URL elle-même (ex. `/hy/carrieres` pour la version arménienne, si un préfixe est utilisé). C'est l'approche standard pour un site multilingue destiné à être indexé par les moteurs de recherche, et c'est ce que permet la bibliothèque `next-intl`, désormais câblée dans le projet (mais pas encore activée — voir section 2).

Cette étape (phase 2) met en place la « plomberie » technique nécessaire, sans changer une seule page visible du site. Rien de ce que voit un visiteur aujourd'hui ne change tant que la phase 3 n'a pas eu lieu.

---

## 2. PROPOSÉ, PAS ENCORE DÉCIDÉ : comment les URL françaises et arméniennes seront structurées

Deux réglages ont été câblés dans le code à titre de **proposition technique**, mais **ils n'ont pas encore été validés par le porteur de projet** :

- **`localePrefix: 'as-needed'`** : le français resterait sur les URL actuelles, sans préfixe (`/carrieres`), et seul l'arménien recevrait un préfixe (`/hy/carrieres`).
- **`localeDetection: false`** : le site ne devinerait jamais la langue automatiquement à partir des réglages du navigateur du visiteur. Une même adresse afficherait toujours le même contenu, peu importe qui la visite.

**Pourquoi cette proposition** : le site est actuellement en ligne et indexé par Google avec des URL françaises sans préfixe. Avec ce réglage, ces URL ne changeraient pas du tout — pas de redirection, pas de perte de référencement, pas de lien cassé. Seules les nouvelles pages en arménien recevraient un préfixe `/hy/`.

**⚠️ Coût si ce choix est changé plus tard** : une fois la phase 3 déployée (activation réelle du changement de langue), revenir sur ce choix — par exemple décider que le français doit lui aussi avoir un préfixe comme `/fr/` — obligerait à rediriger en masse (redirections dites « 301 ») toutes les URL françaises existantes vers leurs nouvelles adresses. Sur un site déjà indexé et fréquenté, cela représente un risque réel de perte temporaire de référencement et nécessite une planification soigneuse. **C'est pourquoi cette décision doit être validée maintenant, avant la phase 3, plutôt que d'être changée après coup.**

---

## 3. Le code de langue « hyw » pour l'arménien occidental — SUPERSEDÉ, voir section 10

> **Cette section documente une décision de la phase 2, renversée en phase 6B.** Le projet a utilisé le code `hyw` de fin phase 2 à la phase 6B ; il utilise maintenant `hy`, pour les raisons documentées à la section 10. Le texte ci-dessous est conservé tel quel pour la traçabilité historique — ce n'est plus l'état actuel du projet.

Le projet utilise le code `hyw` (et non `hy`) pour désigner l'arménien occidental à orthographe classique — la variante parlée par la diaspora et enseignée à l'école Sourp Hagop, distincte de l'arménien oriental (`hy`, parlé en Arménie).

**Point ouvert, non résolu** : la norme technique du web pour indiquer aux moteurs de recherche qu'une page existe dans plusieurs langues (balise dite « hreflang ») attend un code de langue de la norme ISO 639-1, qui ne connaît que `hy` (arménien, sans distinction occidental/oriental) — `hyw` n'existe qu'au niveau ISO 639-3, une norme plus fine non reconnue par hreflang. Il faudra donc décider, avant l'activation en phase 3, si les balises hreflang afficheront `hy` (conforme à la norme mais linguistiquement imprécis) ou une syntaxe étendue comme `hy-Latn`/variante régionale. Cette question n'a pas d'incidence sur le fonctionnement du site lui-même, seulement sur la façon dont Google comprend la relation entre les deux versions linguistiques.

*(Résolu en section 10 : ce point ouvert a motivé, en bonne partie, le renversement de cette décision.)*

À noter : le schéma de contenu actuel dans Sanity (voir section 4) utilise déjà le code `hy` pour ses champs, alors que le code technique utilisera `hyw`. Cet écart de nommage entre le contenu et le code est une illustration concrète du sujet traité en section 5.

*(Cet écart n'existe plus depuis la section 10 : le schéma Sanity et le code technique utilisent tous deux `hy`.)*

---

## 4. Frontière entre le texte de l'interface et le contenu éditorial

Deux catégories de texte cohabitent sur le site, et elles ne sont **pas** gérées de la même façon ni par les mêmes personnes :

- **Le texte de l'interface** (« chrome » de l'application) : libellés de boutons, menus, messages d'erreur, etc. Ce texte vit désormais dans des fichiers `messages/fr.json` et `messages/hy.json`, gérés par l'équipe technique dans le code source.
- **Le contenu éditorial** : titres de pages, textes descriptifs, offres d'emploi, etc. Ce contenu continue de vivre dans Sanity (l'outil de gestion de contenu), modifiable par le personnel de l'école sans intervention technique.

Cette séparation est délibérée et doit rester ainsi : **le code possède l'interface, Sanity possède le contenu.** Aucun texte éditorial ne doit être copié dans les fichiers `messages/*.json`, et aucun libellé d'interface ne doit être ajouté dans Sanity.

Un script (`scripts/check-messages.mjs`, exécutable via `npm run check:messages`) vérifie automatiquement que les fichiers `messages/fr.json` et `messages/hy.json` contiennent exactement les mêmes clés — pour éviter qu'un libellé d'interface existe dans une langue mais pas dans l'autre.

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

**Décision** : Au déploiement, la locale non par défaut (`hy`, arménien occidental) restera marquée `noindex` pour les moteurs de recherche tant que son contenu n'est pas réellement traduit — page par page, pas globalement pour toute la locale d'un coup.

**Pourquoi** : Les requêtes GROQ vers Sanity (voir `lib/sanity-queries.js`) reposent sur un repli (fallback) qui sert le contenu français quand aucune traduction arménienne n'existe pour une page ou un champ donné. Concrètement, cela signifie qu'aujourd'hui, `/hy/n'importe-quelle-page` répond HTTP 200 en affichant du contenu français — pas une erreur, pas une redirection, un vrai 200 avec du texte français sous une URL censée être en arménien. Pour un moteur de recherche, c'est du contenu dupliqué (identique à la version française, à une adresse différente), ce qui peut nuire au référencement des deux versions.

Le taux de remplissage du contenu en arménien est actuellement de **0 %** : aucune page n'a encore de traduction réelle dans Sanity. La traduction du contenu suit un calendrier séparé de ce chantier technique, porté par d'autres personnes — il ne serait pas raisonnable de faire dépendre l'indexation de la version arménienne de l'avancement de ce travail purement technique.

**Mise en œuvre** : Cette décision sera implémentée en **phase 7**, en même temps que les balises hreflang (le point ouvert de la section 3 sur `hy` vs `hyw` est résolu depuis la section 10 — `hy` est maintenant le code utilisé partout, y compris pour hreflang) et le plan de site (`sitemap.xml`) — les trois relèvent de la même préoccupation (comment les moteurs de recherche perçoivent les deux versions du site) et seront traités ensemble.

**Ce qui N'EST PAS décidé ici** : Retirer le `noindex` — c'est-à-dire juger qu'une page arménienne est suffisamment traduite pour être indexée — est une **décision distincte et ultérieure**, qui appartient au porteur de projet, page par page, au fur et à mesure de l'avancement réel des traductions. Ce document ne préjuge pas de quand ni comment cette décision sera prise.

**Mise à jour (phase 7, étape 4)** : cette condition est maintenant un interrupteur unique, nommé et documenté — `ARMENIAN_CONTENT_TRANSLATED` dans `lib/armenian-content-status.js` — plutôt qu'une logique enfouie dans `generateMetadata`. La bascule reste entièrement entre les mains du porteur de projet ; rien dans le code ne la déclenche automatiquement. C'est un interrupteur global pour l'instant (tout `hy` ou rien), cohérent avec le 0 % de traduction actuel — s'il fallait un jour indexer certaines pages arméniennes avant d'autres, ce fichier devra évoluer vers une vérification page par page, mais cette situation n'existe pas encore.

---

## 7. DÉCIDÉ (phase 5A) : un seul type `localizedBlock`, avec l'union de toutes les configurations de texte enrichi déjà utilisées

**Contexte** : en migrant les ~30 types de documents Sanity vers les champs localisés (`localizedString`/`localizedText`/`localizedBlock`), six champs de texte enrichi (portable text) de `protecteurNationalPage` se sont révélés avoir des configurations d'édition différentes du type `localizedBlock` partagé — et différentes entre eux : certains autorisaient les listes à puces/numérotées, le gras, l'italique, l'exposant et les liens ; d'autres n'autorisaient pas les listes ; un troisième n'autorisait pas l'italique.

**Décision retenue** : plutôt que de créer un type Sanity supplémentaire (ex. `localizedRichBlock`) pour préserver chaque configuration à l'identique, le type `localizedBlock` unique a été enrichi pour couvrir l'union de toutes les options déjà utilisées ailleurs dans le schéma : listes à puces et numérotées, gras/italique/exposant, et une annotation de lien (URL). Cette configuration s'applique désormais uniformément à **tous** les champs `localizedBlock` du site (y compris ceux de `teamPage`, `primaire` et `secondaire`, qui utilisaient auparavant un bloc simple sans ces options).

**Pourquoi** :
- Élargir les options disponibles sur un champ de texte enrichi n'invalide et ne modifie **aucun contenu déjà écrit** — un paragraphe existant sans lien ni exposant reste un paragraphe valide sous la configuration élargie. C'est un gain de capacité pur, jamais une perte. Vérifié empiriquement sur `staging` (requête GROQ avant/après sur les six champs concernés de `protecteurNationalPage`, résultat identique au bit près) plutôt que supposé.
- Un seul type partagé garde une surface d'édition cohérente pour quiconque remplira les 201 champs de la phase 5A (phase 6 et au-delà) — pas besoin de se demander « quelle variante de bloc riche s'applique ici ».
- Respecte le choix déjà arrêté de n'utiliser que trois types nommés (`localizedString`/`localizedText`/`localizedBlock`), sans en ajouter un quatrième pour une différence par ailleurs cosmétique.

**Effet de bord à noter explicitement** : deux champs de `protecteurNationalPage` — `additionalSections[].title` et `footnote` — gagnent la possibilité d'utiliser des listes à puces/numérotées, alors que leur configuration d'origine les en privait délibérément. Ce n'est pas un accident ni une régression : c'est la conséquence assumée du choix d'un type unique plutôt que de types multiples. Rien n'oblige à utiliser cette capacité si elle ne convient pas éditorialement à ces champs.

---

## 8. DÉCIDÉ (phase 5A, étape 4) : la phase 6 est un préalable obligatoire à la phase 5B — les trois éléments forment une seule livraison coordonnée

**Constaté empiriquement** : après avoir appliqué la migration de contenu sur `staging` (étape 4), le chargement de pages qui utilisent encore les requêtes GROQ non localisées (`lib/sanity-queries.js`, telles qu'elles existent avant la phase 6) — `/`, `/comite-parents`, `/historique`, `/transport`, et vraisemblablement la plupart des autres pages de contenu — provoque un **plantage complet côté client** : page blanche, message générique « Application error », erreur React #31 (« object with keys {_type, fr} »). Ce n'est pas un artefact cosmétique comme `[object Object]` ou une chaîne vide — React refuse de rendre l'objet et interrompt tout l'arbre de composants. Seule `/carrieres`, dont la requête a déjà été mise à jour en phase 4, continue de fonctionner normalement.

**Décision** : il n'existe **aucun ordre de déploiement en production** où l'un des trois éléments suivants peut être livré seul sans casser le site en direct :
1. Le déploiement du schéma Studio (types `localizedString`/`localizedText`/`localizedBlock`) — sans données migrées, le Studio attend une forme que le contenu n'a pas encore.
2. La migration des données de production (`scripts/migrate-localize-fields.mjs --apply` contre `production`) — sans requêtes mises à jour, chaque page dont la requête est encore « à plat » plante pour chaque visiteur, comme démontré ci-dessus sur `staging`.
3. Les requêtes GROQ localisées (phase 6, `lib/sanity-queries.js`) — sans données migrées, ces requêtes chercheraient `champ.fr`/`champ[$locale]` sur un champ qui est encore une chaîne simple, ce qui échouerait tout autant (de façon symétrique et opposée au cas ci-dessus).

**Conséquence concrète** : le déploiement du schéma Studio, la migration des données de `production`, et la mise à jour des requêtes de la phase 6 constituent **une seule livraison de production coordonnée**, à préparer et à exécuter ensemble — jamais l'une avant l'autre sur l'environnement de production. La phase 5B ne peut pas commencer tant que la phase 6 n'est pas prête à être déployée en même temps qu'elle.

## 9. DÉCIDÉ (phase 5A, étape 4) : la migration de production exige un gel des modifications de contenu

**Pourquoi** : le script de migration traite chaque brouillon (« draft ») comme un document à part entière — c'est le comportement correct, car un brouillon non migré qui serait publié après coup réintroduirait silencieusement des champs à l'ancien format (chaîne simple) dans du contenu par ailleurs déjà migré. Mais l'inverse pose un risque symétrique : un brouillon créé ou modifié par le personnel de l'école *pendant* l'exécution de la migration sur `production` pourrait ne pas être capturé par la requête `*[_type == $type]` si sa création survient après cette requête et avant la validation de la transaction — un tel brouillon resterait alors au format non localisé, invisible tant qu'il n'est pas publié, puis casserait le rendu au moment de sa publication.

**Décision** : avant d'exécuter la migration sur `production` (phase 5B), deux conditions doivent être vérifiées, pas supposées :
1. **Zéro brouillon en attente** sur le dataset `production`, confirmé par une requête directe (`count(*[_id in path("drafts.**")])`) immédiatement avant l'exécution.
2. **Confirmation explicite du porteur de projet** que la personne responsable du contenu de l'école n'est pas en train d'utiliser le Studio au moment de l'exécution — pas une supposition, une confirmation active demandée avant de lancer le script.

**Contexte ayant motivé cette décision** : durant la validation de l'étape 4 sur `staging`, un brouillon de `teamPage` a été observé absent puis de nouveau présent au moment de l'exécution de la migration, sans qu'aucune suppression n'apparaisse dans l'historique des transactions Sanity (`/data/history/.../transactions/`) — l'historique montre uniquement la création initiale du dataset (19 août 2026, sous le compte du porteur de projet) et l'écriture de la migration elle-même (sous l'identité du jeton API dédié). Rien n'indique qu'un tiers ait édité `staging` pendant cette session ; l'observation initiale est très probablement une incohérence de lecture transitoire côté Sanity plutôt qu'une véritable édition concurrente. Mais l'épisode illustre concrètement le risque : si un brouillon avait réellement été créé pendant l'exécution, il aurait pu échapper à la migration.

---

## 10. DÉCIDÉ (phase 6B) : le code de langue devient `hy` — renversement de la section 3

**Ce que cette décision change, et ce qu'elle ne change PAS** : cette décision remplace uniquement l'étiquette technique (le code BCP-47/ISO 639-1) utilisée par le routage, le schéma Sanity et les fichiers de messages. **La langue servie reste l'arménien occidental à orthographe classique, traduite par une personne dont c'est la langue** — exactement comme décidé en section 3. **Ceci n'est pas une décision de servir de l'arménien oriental.** Le projet emprunte à `hy` sa *machinerie* — la structure de ses dates, l'arithmétique de ses pluriels, sa reconnaissance par les navigateurs et les moteurs de recherche — pas son vocabulaire. Aucun texte visible par un visiteur ne sera jamais généré automatiquement par une API `Intl` pour cette locale : les 19 libellés de mois/jours de `Calendar.jsx` (voir `docs/dettes-preexistantes.md`, item x) sont extraits et traduits à la main, comme tout le reste du texte d'interface.

**Pourquoi renverser la section 3** : en préparant la phase 6B (extraction des chaînes d'interface codées en dur), il a fallu décider comment gérer `Calendar.jsx` (noms de mois/jours codés en dur) et la syntaxe des pluriels ICU pour l'arménien. Cela a mené à vérifier empiriquement (Node v22.19.0) le comportement réel des API `Intl` natives pour la balise `hyw` — jamais vérifié auparavant, seulement supposé fonctionnel par analogie avec `hy`/`fr` en section 3.

| Vérification | `hyw` | `hy` | `fr` |
|---|---|---|---|
| `Intl.DateTimeFormat(loc,{month:'long'})` | **« August » (anglais)** | « օգոստոս » | « août » |
| `Intl.DateTimeFormat(loc,{weekday:'long'})` | **« Tuesday » (anglais)** | « երեքշաբթի » | « mardi » |
| `Intl.PluralRules.supportedLocalesOf([loc])` | **`[]` — non reconnu** | `['hy']` | `['fr']` |
| `resolvedOptions().locale` | **`"en-US"`** | `"hy"` | `"fr"` |
| `.select(0)` | other *(règle anglaise)* | one | one |

`hyw` ne bascule pas vers une approximation arménienne — il bascule silencieusement, entièrement, vers l'anglais. Ce résultat, combiné à deux autres faits déjà connus mais non encore mis en relation (le point ouvert de la section 3 : `hyw` n'est pas une valeur `hreflang` valide au sens ISO 639-1 ; et le fait qu'un lecteur d'écran ne reconnaît pas `hyw` comme valeur de l'attribut `lang=""`), a fait basculer la décision : les trois angles (formatage/pluriels, référencement, accessibilité) pointaient dans la même direction.

**Effet de bord positif, découvert en vérifiant la portée du changement** : `app/[locale]/layout.jsx` pose `<html lang={locale}>` de façon entièrement générique — cette page émettait donc `lang="hyw"` à chaque visite, un code non reconnu, depuis la phase 3 (le déplacement du layout sous `[locale]`, voir `docs/dettes-preexistantes.md`). Ce changement corrige cet effet de bord sans code additionnel : `lang="hy"` est maintenant émis automatiquement, pour les navigateurs comme pour les technologies d'assistance.

**Coût du changement** : 6 fichiers fonctionnels (`i18n/routing.ts`, `studio/schemaTypes/localized.ts`, `messages/hy.json` — renommé depuis `hyw.json`, `components/ui/LangSwitcher.jsx`, `scripts/smoke-routes.mjs`, `lib/sanity-locale-fallback.test.js`), aucune migration de données (le script de migration n'a jamais écrit sous une clé `hyw` — le contenu arménien est à 0 % de remplissage, voir section 6 — et les autres fichiers du projet dérivent tous de `routing.locales` sans coder `hyw` en dur, vérifié fichier par fichier avant d'agir). Aucune redirection nécessaire : rien n'est déployé en production sous le préfixe `/hyw/`.

**Sur la convention d'écriture des pluriels ICU (`messages/hy.json`)** : `Intl.PluralRules('hy')` résout maintenant correctement `select(0) = "one"`, contrairement à `hyw`. Cela ne change pas la recommandation de l'item (x) du journal des dettes : une clause explicite `=0` reste la convention d'écriture recommandée pour toute chaîne comptable, non pas parce que la résolution automatique de `hy` serait fausse (elle est correcte), mais parce qu'une clause `=0` explicite est lisible directement par la personne qui traduit, indépendante des données CLDR sous-jacentes, et ne coûte que trois caractères de plus. La véritable leçon de l'item (x) survit intacte à ce renversement : tout appel `Intl` natif paramétré par une balise de locale non standard doit être vérifié empiriquement avant d'être utilisé, jamais supposé fonctionnel par analogie — c'est exactement cette vérification qui a permis de trouver ce problème.

---

## 11. DÉCIDÉ (phase 7, étape 3) : `text-transform: uppercase` est neutralisé sous `[lang="hy"]`, sur les 52 déclarations existantes

**Constaté** : un inventaire exhaustif (`grep` sur tout `app/` et `components/`) a recensé 52 déclarations `text-transform: uppercase` dans 34 fichiers — très majoritairement des libellés d'interface (`{t(...)}`) ou du texte éditorial Sanity (bannière d'alerte, offres d'emploi, rôle des membres du conseil d'administration). Aucune de ces 52 déclarations n'est du texte garanti de rester en français ou en anglais pour toujours : chacune est soit traduisible via `messages/hy.json`, soit du texte libre saisi dans Sanity, indépendant du calendrier de ce chantier technique.

**Décision** : sous `[lang="hy"]`, `text-transform: uppercase` est neutralisé (ramené à `none`) sur l'ensemble de ces 52 déclarations, plus le comportement de mise en majuscules intégré par défaut aux boutons MUI (`@mui/material`), découvert en vérifiant la portée réelle du changement — ce dernier n'apparaissait dans aucun `grep` du code source du projet, puisqu'il vit dans les styles internes de la bibliothèque, mais tombe sous la même règle centrale sans effort supplémentaire.

**Pourquoi** :
1. **L'arménien n'a pas d'équivalent à la convention française du tout-en-majuscules.** L'écriture arménienne n'a pas de distinction majuscule/minuscule au sens où le latin l'entend pour cet usage typographique précis — forcer un texte arménien en capitales ne reproduit pas une convention existante de cette langue, contrairement au français où « TOUT EN MAJUSCULES » est une convention de mise en page reconnue. Appliquer la même transformation aux deux langues traiterait l'arménien comme une simple variante du français plutôt que comme une langue avec ses propres conventions typographiques.
2. **La mise en majuscules nuit à la lisibilité de l'écriture arménienne** — un effet secondaire connu de forcer une transformation de casse sur une écriture dont les formes de lettres ne sont pas conçues autour d'une telle distinction.
3. **La ligature և se comporte de façon imprévisible sous cette transformation.** Vérifié empiriquement dans Chromium (le seul moteur disponible pour ce test — **ceci n'est pas une affirmation multi-navigateurs**, seulement ce qui a été observé sur ce moteur précis) : `text-transform: uppercase` appliqué à « և » le transforme en deux caractères distincts, Ե + Ւ, confirmé à la fois via `String.prototype.toUpperCase()`/`toLocaleUpperCase()` et via une capture d'écran du rendu réel montrant deux glyphes là où un seul caractère existait dans le texte source. Concrètement, tout mot arménien contenant cette ligature — courante dans l'orthographe classique — voit sa longueur augmenter d'un caractère au moment du rendu, ce qui casse la mise en page de tout badge ou pastille à largeur fixe conçu pour le texte français d'origine.

**Coût accepté, assumé délibérément** : les libellés arméniens ne seront pas en majuscules là où leurs équivalents français le sont. C'est une **asymétrie délibérée entre les deux rendus linguistiques, pas un défaut** — un rendu incohérent avec lui-même serait un défaut ; deux langues traitées différemment parce qu'elles ont des conventions typographiques différentes ne l'est pas. Il est possible que la personne responsable de la traduction conteste ce choix une fois qu'elle verra du contenu réel en arménien plutôt que les textes de test synthétiques utilisés ici — dans ce cas, la question sera rouverte avec du contenu réel en main, ce qui sera de toute façon plus instructif que cette décision prise avant qu'aucune traduction n'existe.

**Mise en œuvre — une seule règle centrale, pas 52 modifications individuelles** :
```css
:where([lang="hy"] *) {
  text-transform: none !important;
}
```
`:where()` maintient la spécificité de ce sélecteur à zéro — `!important` est donc l'unique mécanisme qui fait gagner cette règle, sans dépendre de l'ordre d'apparition dans la feuille de style. La plupart des 52 déclarations vivent dans des littéraux de gabarit `@emotion/styled`, qui compilent vers des noms de classes dérivés du contenu (hash), sans sélecteur stable qu'une feuille de style globale pourrait cibler une par une — et même pour celles qui auraient pu être ciblées individuellement, dupliquer 52 fois la même décision n'aurait rien apporté.

**Deux exceptions connues, gérées individuellement** : deux déclarations existantes utilisent `text-transform: capitalize` (pas `uppercase`) pour capitaliser des noms de mois français (`components/display/Calendar.jsx`, `components/display/ReactCalendar.css`) — hors du périmètre de cette décision, mais atteintes par la même règle universelle si rien n'est fait, puisque le sélecteur `*` ne distingue pas la valeur actuelle de `text-transform`. Chacune des deux a reçu son propre `!important` pour survivre à la règle centrale — à spécificité et importance égales avec une règle à spécificité nulle, la déclaration la plus spécifique gagne toujours, sans ambiguïté liée à l'ordre des règles. Recherche exhaustive de `capitalize`/`lowercase` effectuée avant d'écrire cette règle : ce sont les deux seules exceptions existantes.

**Vérifié** : sur `/hy/*`, les 52 déclarations plus le bouton MUI passent bien à `text-transform: none` (0 élément avec une transformation résiduelle sur une page de test, hors les deux exceptions protégées). Sur les pages françaises (`html lang="fr"`), aucun changement — le sélecteur ne correspond à rien, vérifié par capture d'écran avant/après.

**Ce qui N'EST PAS vérifié ici** : le test de la ligature ci-dessus n'a été effectué que dans Chromium, faute d'accès à Firefox ou WebKit dans l'environnement de vérification. Le comportement documenté dans d'autres moteurs n'a pas été observé directement pour ce projet.
