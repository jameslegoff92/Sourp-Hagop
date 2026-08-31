# État de la livraison — site en français et en arménien occidental

**Date** : 31 août 2026 · **Pour** : le porteur de projet · **Portée** : chantier i18n, phases 0 à 7

Où en est-on, et qu'est-ce qui empêche d'aller plus loin. Le détail technique est ailleurs : `docs/adr/0001-architecture-i18n.md` (les décisions et leur pourquoi) et `docs/dettes-preexistantes.md` (les problèmes trouvés en chemin).

---

## 1. Ce qui est fait et fonctionne

Tout le travail technique pour que le site existe en français et en arménien occidental est terminé et vérifié :

- **Routage** : chaque page a une adresse française (`/carrieres`) et une adresse arménienne (`/hy/carrieres`).
- **Typographie** : le site sait afficher l'alphabet arménien, sans alourdir les pages françaises (un ajustement récent a réduit ce coût de 27 Ko à moins de 2 Ko par page française).
- **Référencement** : chaque page indique à Google qu'elle existe dans les deux langues et où trouver l'autre version.
- **Interface** : 335 libellés (boutons, menus, messages) sont extraits du code et prêts à être traduits sans y retoucher.
- **Casse arménienne** : les majuscules forcées (convention française) sont désactivées pour l'arménien, qui n'a pas cette convention et s'affiche moins bien sous cette transformation.
- **Tout est testé automatiquement** : 66 pages vérifiées dans les deux langues à chaque changement.

**Ce qui manque, et qui reste le plus gros morceau** : le contenu est traduit en arménien à **0 %**. Toutes les pages arméniennes affichent encore le français, en attendant la traduction. Ce n'est pas un problème technique — tout est prêt à recevoir le texte arménien dès qu'il existe.

---

## 2. Ce qui est délibérément exclu, et pourquoi

1. **Confidentialité / Conditions d'utilisation** : resteront en anglais dans les deux langues. C'est un gabarit juridique générique, jamais relu par un avocat — le traduire figerait un texte qui devrait d'abord être validé légalement. *Débloqué par* : une révision juridique, indépendante de ce chantier.
2. **Niveau / type / lieu de chaque offre d'emploi** (page Carrières) : resteront en français des deux côtés. Ce sont des champs de texte libre saisis par le personnel dans l'outil de contenu, pas des libellés d'interface. *Débloqué par* : une décision du porteur de projet sur si et comment les rendre bilingues.
3. **« Pourquoi Sourp Hagop »** : aucune traduction pour l'instant — la page lit un document jamais correctement enregistré dans l'outil de contenu. *Débloqué par* : une décision du porteur de projet, requise avant la mise en production (section 4).

---

## 3. Ce qui reste bloqué sur une décision qui n'appartient pas à l'équipe technique

| Décision requise | Qui décide | Pour débloquer |
|---|---|---|
| Structure des adresses (`/carrieres` vs `/fr/carrieres`) | Porteur de projet | Une approbation explicite — **toujours pas donnée**, alors que les phases 3 à 7 sont bâties dessus. Revenir dessus après indexation obligerait à rediriger tout le site français. |
| Sort du document « Pourquoi » orphelin | Porteur de projet | Voir section 2.3 — bloque le démarrage de la migration. |
| Priorité des pages à traduire | Porteur de projet | Une liste, sans quoi aucun calendrier réaliste n'est possible. |
| Traduction (208 champs + 335 libellés) | Une personne traductrice (arménien occidental, langue maternelle) | Voir section 5. |
| Révision légale (Confidentialité/Conditions) | Un avocat | Indépendant de ce chantier. |

---

## 4. La fenêtre de mise en production

Trois éléments doivent être déployés **ensemble** — aucun ne fonctionne seul : le nouveau schéma bilingue de l'outil de contenu, la migration du français existant vers ce format (rien n'est perdu, recopié automatiquement), et la mise à jour du site pour le lire.

**Effet pour l'école** : chaque champ de texte devient une boîte à deux colonnes (français / arménien) au lieu d'une seule. Ce n'est pas une régression, mais la personne responsable du contenu doit le savoir avant, pas le découvrir en ouvrant l'outil.

**Avant de commencer, il faut** : une fenêtre de maintenance convenue (~15 minutes d'exécution, mesurées en test) ; la confirmation écrite que le contenu ne sera pas modifié pendant cette fenêtre ; un « GO » explicite du porteur de projet ; et la décision de la section 2.3, tranchée au préalable.

Marche à suivre complète : `docs/runbook-migration-production.md` — un guide d'exécution, pas une autorisation ; il suppose les quatre points ci-dessus déjà réglés.

---

## 5. Le volume de traduction

- **208 champs** de contenu (titres, descriptions, offres d'emploi...) — à traduire dans l'outil de contenu, sans toucher au code.
- **335 libellés d'interface** — listés avec leur contexte dans `docs/chaines-a-traduire.md`, à traduire dans un simple document.

Rien de tout cela ne peut commencer avant qu'une personne traductrice soit désignée — avec l'approbation de la structure des adresses (section 3), c'est le principal frein restant.
