# Chaînes d'interface à traduire vers l'arménien occidental

**Portée** : ce document liste les 335 chaînes de texte d'interface (boutons, titres, menus, messages) extraites du code vers `messages/fr.json` pendant la phase 6B. Pour chaque chaîne, la colonne « Texte français » est le texte à traduire ; la colonne « Où ça apparaît » situe la chaîne sur le site. La colonne « Clé » est une référence technique pour l'équipe de développement — elle n'a pas besoin d'être lue pour traduire.

**Ce document ne couvre pas le contenu éditorial du site** (titres de page, descriptions, offres d'emploi, etc.) — ce contenu est géré séparément dans Sanity (l'outil de gestion de contenu de l'école) et suit son propre processus de traduction.

---

## Ce qui ne sera PAS traduit dans ce livrable, et pourquoi

Trois zones du site sont délibérément absentes de ce document. Ce ne sont pas des oublis — ce sont des décisions prises et documentées : les deux premières pendant la phase 6B (voir `docs/dettes-preexistantes.md`, items (r) et (v) pour le détail complet), la troisième lors de la mise en place de l'avis relatif aux témoins (branche `feat/cookie-notice`) :

1. **Les pages `/confidentialite` (politique de confidentialité) et `/termes` (conditions d'utilisation) resteront uniquement en anglais**, dans les deux langues du site. Ce texte n'est pas du contenu de l'école traduit en anglais par erreur — c'est un gabarit juridique générique anglais, jamais adapté ni relu, produit par un outil automatisé. Une école québécoise traitant des données de mineurs ne devrait pas se contenter d'un gabarit générique non vérifié ; une révision juridique est nécessaire avant toute décision sur ce texte (le traduire, le remplacer, ou le faire réviser). Ce n'est pas une tâche de traduction — ni cette phase technique ni ce document ne s'y substituent.

2. **Le niveau, le type et le lieu de chaque offre d'emploi sur la page Carrières resteront en français**, même sur la version arménienne du site. Ces trois informations ne sont pas du texte d'interface codé dans le site — ce sont des champs de texte libre saisis directement par le personnel de l'école dans l'outil de gestion de contenu (Sanity). Les traduire demanderait de modifier la façon dont ces champs sont stockés et gérés, une décision qui appartient au porteur du projet, pas à ce livrable de traduction.

3. **Les quatre chaînes de l'avis relatif aux témoins (`CookieNotice.*`, `components/ui/CookieNotice.jsx`) portent depuis le 2026-09-09 un texte français provisoire, pas un texte juridique validé — elles restent hors de ce livrable de traduction.** Ce texte énonce ce que le site dépose réellement avant toute interaction — un énoncé à portée légale, pas un texte d'interface ordinaire — et son libellé de bouton (« Fermer », choisi précisément pour ne jamais laisser entendre un consentement — voir la section dédiée plus bas pour le détail du raisonnement) reste provisoire au même titre que le reste. Le texte actuel est lisible et plausible, mais n'a pas été rédigé ni approuvé par la personne responsable de la politique de confidentialité — voir la section dédiée plus bas (« Avis relatif aux témoins ») pour le détail des quatre clés.

---

## Comment lire ce document

- Une section par zone du site, dans l'ordre où un visiteur les rencontre à peu près (éléments communs, page d'accueil, puis les pages du menu).
- Le texte entre accolades comme `{count}` ou `{name}` est une valeur qui change automatiquement (un nombre, un nom, une date) — ne pas traduire ce qui est entre accolades, seulement le texte autour.
- Le texte entre chevrons comme `<strong>...</strong>` ou `<bold>...</bold>` contrôle la mise en forme (gras, retour à la ligne) — ne pas traduire ni supprimer ces balises, seulement le texte qu'elles contiennent.
- Certaines chaînes sont **volontairement en anglais** — voir la section « Textes anglais » à la fin, qui explique lesquelles et pourquoi.

---

## 1. Éléments communs à tout le site

### Messages génériques de formulaire (`Common.forms`)

Ces deux messages sont réutilisés tels quels dans trois formulaires différents du site (réservation d'espace, candidature à un emploi, formulaire de contact) — ils apparaissent quand l'envoi échoue.

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Erreur lors de l'envoi. | Message d'erreur générique si le serveur refuse l'envoi | `Common.forms.genericSubmitError` |
| Impossible d'envoyer le formulaire. | Message d'erreur générique si la connexion échoue | `Common.forms.genericNetworkError` |

### Pied de page (`components/ui/Footer.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| PORTAIL | Lien du pied de page | `Footer.nav.portal` |
| CARRIÈRES | Lien du pied de page | `Footer.nav.careers` |
| ADMISSIONS | Lien du pied de page | `Footer.nav.admissions` |
| CALENDRIER | Lien du pied de page | `Footer.nav.calendar` |
| PROTECTEUR NATIONAL DE L'ÉLÈVE | Lien du pied de page | `Footer.nav.studentOmbudsman` |
| LA FONDATION | Lien du pied de page | `Footer.nav.foundation` |
| ANCIENS ET ANCIENNES | Lien du pied de page | `Footer.nav.alumni` |
| LOCATION D'ESPACES | Lien du pied de page | `Footer.nav.spaceRentals` |
| NOUS JOINDRE | Lien du pied de page | `Footer.nav.contactUs` |
| L'École arménienne Sourp Hagop dispense un enseignement en langue française, conduisant les élèves du secondaire à l'obtention du Diplôme d'études secondaires du Québec. | Phrase de bas de page (sur deux lignes) | `Footer.tagline` |
| Facebook / Instagram / LinkedIn / X | Texte descriptif (invisible) des icônes de réseaux sociaux | `Footer.socialAlt.*` |

⚠️ Voir la section « Textes anglais » pour `Footer.logoAlt`, `Footer.osblLogoAlt`, `Footer.schoolImageAlt`.

### Menu de navigation (`components/ui/Nav.jsx`)

C'est le menu principal du site — celui qui liste toutes les pages.

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Menu de navigation | Texte descriptif (invisible) du bouton menu mobile | `Nav.menuAriaLabel` |
| Fermer le menu | Texte descriptif (invisible) du bouton pour fermer le menu mobile | `Nav.closeMenuAriaLabel` |
| Accès rapide | Titre de section dans le menu mobile | `Nav.quickAccessLabel` |
| L'école | Titre de groupe du menu | `Nav.groups.school.title` |
| Historique | Lien du menu | `Nav.groups.school.items.historique` |
| L'équipe | Lien du menu | `Nav.groups.school.items.equipe` |
| Conseil d'administration | Lien du menu | `Nav.groups.school.items.administration` |
| Projet éducatif | Lien du menu | `Nav.groups.school.items.projetEducatif` |
| Comité de parents | Lien du menu | `Nav.groups.school.items.comiteParents` |
| Anciens et anciennes | Lien du menu | `Nav.groups.school.items.anciens` |
| Protecteur national de l'élève | Lien du menu | `Nav.groups.school.items.ombudsman` |
| Pédagogie | Titre de groupe du menu | `Nav.groups.pedagogy.title` |
| Programme éducatif au préscolaire | Lien du menu | `Nav.groups.pedagogy.items.prescolaire` |
| Programme éducatif au primaire | Lien du menu | `Nav.groups.pedagogy.items.primaire` |
| Programme éducatif au secondaire | Lien du menu | `Nav.groups.pedagogy.items.secondaire` |
| Vie Étudiante | Titre de groupe du menu | `Nav.groups.studentLife.title` |
| Activités parascolaires | Lien du menu | `Nav.groups.studentLife.items.activitesParascolaires` |
| Conseil étudiant | Lien du menu | `Nav.groups.studentLife.items.conseilEtudiant` |
| Équipe des Aigles | Lien du menu | `Nav.groups.studentLife.items.aigles` |
| Sorties scolaires et voyages | Lien du menu | `Nav.groups.studentLife.items.sorties` |
| Services à l'élève | Titre de groupe du menu | `Nav.groups.studentServices.title` |
| Soutien aux élèves | Lien du menu | `Nav.groups.studentServices.items.soutien` |
| Agora Anna et Manouk Djoukhadjian | Lien du menu | `Nav.groups.studentServices.items.agora` |
| Bibliothèque | Lien du menu | `Nav.groups.studentServices.items.bibliotheque` |
| Mer Aykin: un jardin littéraire | Lien du menu | `Nav.groups.studentServices.items.jardinLitteraire` |
| Créalab | Lien du menu | `Nav.groups.studentServices.items.crealab` |
| Service de garde | Lien du menu | `Nav.groups.studentServices.items.serviceDeGarde` |
| Transport | Lien du menu | `Nav.groups.studentServices.items.transport` |
| Uniforme scolaire | Lien du menu | `Nav.groups.studentServices.items.uniforme` |
| Admissions | Titre de groupe du menu | `Nav.groups.admissions.title` |
| Pourquoi Sourp Hagop | Lien du menu | `Nav.groups.admissions.items.pourquoi` |
| Demande d'admission | Lien du menu | `Nav.groups.admissions.items.demande` |
| Droits de scolarité et autres frais | Lien du menu | `Nav.groups.admissions.items.droits` |
| Carrières | Lien rapide (menu mobile) | `Nav.quickLinks.careers` |
| Calendrier | Lien rapide (menu mobile) | `Nav.quickLinks.calendar` |
| Location d'espaces | Lien rapide (menu mobile) | `Nav.quickLinks.locations` |
| Nous joindre | Lien rapide (menu mobile) | `Nav.quickLinks.contact` |

⚠️ Voir la section « Textes anglais » pour `Nav.logoAlt` (« logo » — mot identique en français, pas vraiment un cas à traduire, mais listé par souci de complétude).

### Barre du haut (`components/ui/topNav.jsx`)

Une deuxième barre de liens, affichée au-dessus du menu principal sur certaines pages.

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Portail | Lien vers le portail parents/élèves | `TopNav.portalLink` |
| Carrières | Lien de la barre du haut | `TopNav.items.careers` |
| Calendrier | Lien de la barre du haut | `TopNav.items.calendar` |
| Location d'espaces | Lien de la barre du haut | `TopNav.items.locations` |
| La Fondation | Lien de la barre du haut | `TopNav.items.foundation` |
| Nous joindre | Lien de la barre du haut | `TopNav.items.contact` |

*(`TopNav.legacyLogoAlt` = « 50e logo » existe dans le code mais ne s'affiche actuellement nulle part — laissé de côté, aucune traduction requise pour le moment.)*

### Bandeau d'alerte (`components/ui/AlertBanner.jsx`)

Le bandeau qui peut apparaître en haut de la page d'accueil (ex. fermeture pour tempête de neige).

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| En savoir plus | Lien du bandeau, si aucun texte personnalisé n'est fourni | `AlertBanner.learnMore` |

### Avis relatif aux témoins (`components/ui/CookieNotice.jsx`)

Ce site ne charge aucun script tiers et ne dépose aucun témoin de suivi avant l'interaction d'un visiteur. Ce qui existe réellement avant toute interaction : deux témoins déposés par NextAuth (`authjs.csrf-token`, `authjs.callback-url`) — effet de bord de `<SessionProvider>`, qui englobe tout le site public pour permettre la connexion Google de la personne responsable du contenu, sans rapport avec la navigation d'un visiteur ordinaire — et un témoin `NEXT_LOCALE` de next-intl qui, en pratique, ne se dépose jamais ici puisque `i18n/routing.ts` fixe `localeDetection: false`. Cet avis est donc une notice de **transparence**, pas un gestionnaire de consentement : une seule action (« pris connaissance ») et un lien vers `/confidentialite` — aucune case à cocher, aucun accepter/refuser, aucun stockage de préférences par catégorie.

**Aucune des quatre chaînes ci-dessous n'est prête à traduire** (voir aussi le point 3 de la section précédente). Depuis le 2026-09-09, `messages/fr.json` et `messages/hy.json` portent un texte français **provisoire** — lisible et plausible, mais pas un texte juridique validé — identique dans les deux fichiers (ce n'est plus l'espace réservé entre crochets d'avant : ne pas confondre ce texte provisoire, qui se lit comme un vrai avis, avec du texte signé et prêt à traduire). Il doit encore être rédigé ou confirmé par la personne responsable de la politique de confidentialité avant toute traduction vers l'arménien :

| Clé | Rôle | Statut |
|---|---|---|
| `CookieNotice.message` | Texte principal de l'avis | Texte provisoire en place, en attente de validation légale |
| `CookieNotice.acknowledge` | Libellé du bouton d'acquittement (« Fermer » — voir ci-dessous pourquoi) | Texte provisoire en place, en attente de validation légale |
| `CookieNotice.policyLinkText` | Libellé du lien vers `/confidentialite` | Texte provisoire en place, en attente de validation légale |
| `CookieNotice.ariaLabel` | Étiquette d'accessibilité (lecteur d'écran) de la région | Texte provisoire en place, en attente de validation légale |

**Pourquoi « Fermer » et non « J'accepte » ou « Compris »** : cet avis est une notice de transparence, pas un gestionnaire de consentement — il n'y a rien à accepter, aucun choix n'est proposé au visiteur qui changerait quoi que ce soit au comportement du site (voir plus haut : aucun script tiers, aucun témoin de suivi). Un libellé comme « J'accepte » laisserait croire qu'un consentement a été recueilli, alors qu'aucun n'est requis ni collecté ici. « Fermer » reconnaît seulement que l'avis a été vu, sans rien impliquer de plus — ce choix de mot fait partie du texte provisoire ci-dessus et devra être confirmé (ou changé en connaissance de cause) par la même révision légale que le reste.

### Sélecteur de langue (`components/ui/LangSwitcher.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Changer de langue | Texte descriptif (invisible) du bouton FR / ՀԱՅ | `LangSwitcher.ariaLabel` |

*(Les libellés visibles « FR » et « ՀԱՅ » eux-mêmes ne sont pas dans ce document — ce sont des abréviations fixes qui ne varient jamais selon la langue active, voir `scripts/hardcoded-strings-allowlist.json`.)*

---

## 2. Page d'accueil

### En-tête principal (`components/display/MainHeading.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Toujours plus haut, toujours plus loin! | Grand titre sous le logo, page d'accueil | `MainHeading.title` |
| Préscolaire \| Primaire \| Secondaire | Sous-titre sous le grand titre | `MainHeading.subtitle` |

### Introduction (`components/display/Intro.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Bienvenue | Petit titre au-dessus du titre de section | `Intro.subtitle` |

### Valeurs et forces (`app/[locale]/page.jsx`, `components/ui/Values.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| NOS VALEURS | Titre de section, si aucun titre personnalisé n'est fourni | `HomePage.defaultValuesTitle` |
| NOS FORCES | Titre de section, si aucun titre personnalisé n'est fourni | `HomePage.defaultStrengthsTitle` |
| Ce qui nous définit | Petit titre au-dessus de « Nos Valeurs » | `Values.subtitle` |
| Nos Valeurs | Titre de secours si aucun titre n'est fourni du tout | `Values.defaultSectionTitle` |

### Fil Instagram (`components/display/Instagram.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| DERNIÈRES NOUVELLES | Titre de la section Instagram | `Instagram.title` |
| EN SAVOIR PLUS | Bouton sous chaque publication | `Instagram.learnMore` |

⚠️ Voir la section « Textes anglais » pour `Instagram.fallbackCaption`.

---

## 3. L'école

### Historique (`components/Historique.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| NOTRE HISTOIRE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Historique.defaultHeaderText` |

### Conseil d'administration (`components/Administration.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| CONSEIL ADMINISTRATION | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Administration.defaultHeaderText` |
| Rôle et Responsabilités | Petit titre de section, si aucun titre personnalisé n'est fourni | `Administration.defaultRoleTitle` |
| Membre | Texte descriptif (invisible) de la photo d'un membre, si son nom n'est pas disponible | `Administration.defaultMemberAlt` |

### Projet éducatif (`components/ProjetEducatif.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| PROJET ÉDUCATIF | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `ProjetEducatif.defaultHeaderText` |
| Ce que nous faisons | Petit titre au-dessus de « Notre Mission » | `ProjetEducatif.missionSubtitle` |
| Notre Mission | Titre de secours si aucun titre n'est fourni | `ProjetEducatif.defaultMissionTitle` |
| Où nous allons | Petit titre au-dessus de « Notre vision » | `ProjetEducatif.visionSubtitle` |
| Notre vision | Titre de secours si aucun titre n'est fourni | `ProjetEducatif.defaultVisionTitle` |
| Notre slogan | Petit titre de la section slogan, si aucun n'est fourni | `ProjetEducatif.defaultSloganLabel` |
| Nos promesses | Petit titre au-dessus de « Nos engagements » | `ProjetEducatif.engagementsSubtitle` |
| Nos engagements | Titre de secours si aucun titre n'est fourni | `ProjetEducatif.defaultEngagementsTitle` |
| Notre direction | Petit titre au-dessus de « Orientations générales » | `ProjetEducatif.orientationsSubtitle` |
| Orientations générales | Titre de secours si aucun titre n'est fourni | `ProjetEducatif.defaultOrientationsTitle` |

### Comité de parents (`components/ComiteParents.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| COMITÉ DE PARENTS | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `ComiteParents.defaultHeaderText` |

### Anciens et anciennes (`components/Anciens.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| ANCIENS ET ANCIENNES | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Anciens.defaultHeaderText` |
| Notre communauté | Petit titre de section | `Anciens.subtitle` |
| Que signifie être un ancien de Sourp Hagop ? | Grand titre, si aucun titre personnalisé n'est fourni | `Anciens.defaultMainTitle` |
| La mission des anciens élèves de Sourp Hagop | Titre de sous-section, si aucun titre personnalisé n'est fourni | `Anciens.defaultMissionTitle` |
| FORMULAIRE | Texte du bouton/lien du formulaire, si aucun texte personnalisé n'est fourni | `Anciens.defaultFormLinkText` |
| Facebook / Instagram / LinkedIn | Texte descriptif (invisible) des icônes de réseaux sociaux | `Anciens.socialAlt.*` |

### Protecteur national de l'élève (`components/ProtecteurNational.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| PROTECTEUR NATIONAL DE L'ÉLÈVE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `ProtecteurNational.defaultHeaderText` |
| Vos droits | Petit titre de section | `ProtecteurNational.subtitle` |
| Processus de traitement des plaintes | Grand titre, si aucun titre personnalisé n'est fourni | `ProtecteurNational.defaultMainTitle` |
| Comment déposer une plainte ? | Titre de la section des étapes, si aucun titre personnalisé n'est fourni | `ProtecteurNational.defaultStepsTitle` |
| La personne responsable du traitement des plaintes à l'École arménienne Sourp Hagop est **{name}**, {role}. Elle dispose de 15 jours ouvrables pour répondre à la plainte soumise. | Encadré avec le nom de la personne-contact (le nom et le rôle changent automatiquement) | `ProtecteurNational.contactPersonNotice` |
| Formulaire de plainte | Texte du bouton, si aucun texte personnalisé n'est fourni | `ProtecteurNational.defaultFormButtonText` |
| Processus de traitement des plaintes | Texte descriptif (invisible) de l'image du processus | `ProtecteurNational.processImageAlt` |

---

## 4. Pédagogie (préscolaire, primaire, secondaire)

### Préscolaire (`components/Prescolaire.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Éducation préscolaire | Petit titre de section | `Prescolaire.subtitle` |
| Programme préscolaire | Grand titre, si aucun titre personnalisé n'est fourni | `Prescolaire.defaultPageTitle` |
| Apprentissage | Petit titre, section activités | `Prescolaire.activitiesSubtitle` |
| Nos programmes | Petit titre, section cours spécialisés | `Prescolaire.coursesSubtitle` |
| Suivi de l'élève | Petit titre, section évaluation | `Prescolaire.evaluationSubtitle` |
| Développement | Petit titre, section compétences | `Prescolaire.developmentSubtitle` |
| Organisation | Petit titre, section horaire | `Prescolaire.scheduleSubtitle` |
| Nous joindre | Petit titre, section contact | `Prescolaire.contactSubtitle` |

### Primaire (`components/Primaire.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| PROGRAMME ÉDUCATIF AU PRIMAIRE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Primaire.defaultHeaderText` |
| Éducation primaire | Petit titre de section | `Primaire.subtitle` |
| Programme primaire | Grand titre, si aucun titre personnalisé n'est fourni | `Primaire.defaultPageTitle` |
| Structure du programme | Petit titre, section des cycles | `Primaire.cyclesSubtitle` |
| Les Trois Cycles du Primaire | Titre de la section des cycles | `Primaire.cyclesTitle` |
| Nos langues | Petit titre, section langues | `Primaire.languagesSubtitle` |
| Apprentissage des Langues | Titre de la section langues | `Primaire.languagesTitle` |
| Programme enrichi | Petit titre, section enrichissement | `Primaire.enrichmentSubtitle` |
| Domaines d'apprentissage | Petit titre, section matières | `Primaire.subjectAreasSubtitle` |
| Arts et culture | Petit titre, section arts | `Primaire.artsSubtitle` |
| Grille-matières | Petit titre, section grille horaire | `Primaire.scheduleTableSubtitle` |
| 📊 Tableau détaillé de la maquette de cours disponible sur demande | Note sous la grille-matières | `Primaire.scheduleTableNote` |
| Organisation | Petit titre, section horaire type | `Primaire.scheduleSubtitle` |
| Horaire Type d'une Journée au Primaire | Titre de la section horaire | `Primaire.scheduleTitle` |
| Contactez-nous pour obtenir plus d'informations sur l'horaire détaillé et la répartition des matières. | Texte sous le titre de l'horaire | `Primaire.scheduleContactText` |

### Secondaire (`components/Secondaire.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Éducation secondaire | Petit titre de section | `Secondaire.subtitle` |
| Programme secondaire | Grand titre, si aucun titre personnalisé n'est fourni | `Secondaire.defaultPageTitle` |
| Structure du programme | Petit titre, section des cycles | `Secondaire.cyclesSubtitle` |
| Focus: {focus} | Étiquette sur chaque carte de cycle (le mot après « Focus: » change automatiquement) | `Secondaire.focusLabel` |
| Notre approche | Petit titre, section pédagogie | `Secondaire.pedagogySubtitle` |
| Cours enrichis | Petit titre, section cours enrichis | `Secondaire.enrichedSubtitle` |
| Parcours disponibles | Petit titre, section parcours | `Secondaire.optionsSubtitle` |
| Vie scolaire | Petit titre, section activités | `Secondaire.activitiesSubtitle` |
| Grille-matières | Petit titre, section grille horaire | `Secondaire.scheduleTableSubtitle` |

---

## 5. Vie étudiante

### Conseil étudiant (`components/StudentCouncil.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| CONSEIL ÉTUDIANT | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `StudentCouncil.defaultHeaderText` |
| Vie étudiante | Petit titre de section | `StudentCouncil.subtitle` |

### Équipe des Aigles (`components/Aigle.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| ÉQUIPE DES AIGLES | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Aigle.defaultHeaderText` |
| Sports et activités | Petit titre de section | `Aigle.subtitle` |

### Sorties scolaires et voyages (`components/Trips.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| SORTIES SCOLAIRES ET VOYAGES | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Trips.defaultHeaderText` |
| Découvertes et aventures | Petit titre de section | `Trips.subtitle` |

---

## 6. Services à l'élève

### Soutien aux élèves (`components/Soutien.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| SOUTIEN AUX ÉLÈVES | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Soutien.defaultHeaderText` |
| Accompagnement | Petit titre de section | `Soutien.subtitle` |
| Nos Services | Grand titre, si aucun titre personnalisé n'est fourni | `Soutien.defaultMainTitle` |

### Agora — cafétéria (`components/Agora.jsx`, `components/ui/Menu.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| AGORA ANNA & MANOUK DJOUKHADJIAN | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Agora.defaultHeaderText` |
| Nutrition | Petit titre de section | `Agora.nutritionLabel` |
| Agora Anna et Manouk Djoukhadjian | Grand titre, si aucun titre personnalisé n'est fourni | `Agora.defaultMainTitle` |
| Bien plus qu'un lieu où l'on sert un repas chaud et nutritif, l'Agora est un espace de rassemblement multifonctionnel moderne et lumineux. Ici se rencontrent à différents moments de la journée camarades et collègues pour partager un repas, discuter, apprendre et se divertir. | Texte d'introduction, si aucun texte personnalisé n'est fourni | `Agora.defaultIntroText` |
| Découvrez le menu de la semaine à l'Agora! | Texte d'appel à l'action, si aucun texte personnalisé n'est fourni | `Agora.defaultMenuCallToAction` |
| Aucun menu disponible pour le moment. | Message si le menu de la semaine n'est pas encore prêt | `Menu.noMenuAvailable` |
| Primaire / Secondaire | Boutons pour choisir le menu du primaire ou du secondaire | `Menu.toggle.*` |
| Semaine {number} | Étiquette de la semaine affichée (le numéro change automatiquement) | `Menu.weekLabel` |
| Lundi / Mardi / Mercredi / Jeudi / Vendredi | Étiquettes des jours sur les cartes de repas | `Menu.days.*` |
| \* Avec chaque repas, un dessert est offert parmi le yogourt, la pomme, le jello, le pudding au chocolat ou la salade de fruits. | Note de bas de menu (primaire), si aucune note personnalisée n'est fournie | `Common.agoraDessertNotes.primaire` |
| \* Avec chaque repas, un dessert est offert soit un biscuits au brisure du chocolat ou un gâteau. | Note de bas de menu (secondaire), si aucune note personnalisée n'est fournie | `Common.agoraDessertNotes.secondaire` |

*(Les deux notes de dessert ci-dessus apparaissent une seule fois dans `messages/fr.json`, mais servent à deux endroits du code — traduire une seule fois suffit.)*

### Bibliothèque (`app/[locale]/bibliotheque/page.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Bibliothèque | Titre d'en-tête et grand titre de page | `BibliothequePage.title` |
| Espace d'apprentissage | Petit titre de section | `BibliothequePage.subtitle` |
| La bibliothèque de Sourp Hagop offre un espace calme et accueillant, où élèves et enseignants peuvent lire, étudier et explorer une variété de ressources imprimées et numériques. | Texte d'introduction | `BibliothequePage.introText` |
| bibliotheque image {index} | Texte descriptif (invisible) de chaque photo de la galerie (le numéro change automatiquement) | `BibliothequePage.imageAlt` |

### Mer Aykin, jardin littéraire (`components/JardinLitteraire.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| MER AYKIN: UN JARDIN LITTÉRAIRE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `JardinLitteraire.defaultHeaderText` |
| Épanouissement | Petit titre de section | `JardinLitteraire.subtitle` |

### Créalab (`components/Crealab.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| CRÉALAB | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Crealab.defaultHeaderText` |
| Innovation | Petit titre de section | `Crealab.subtitle` |

### Service de garde (`components/ServiceDeGarde.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| SERVICE DE GARDE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `ServiceDeGarde.defaultHeaderText` |
| Au-delà des cours | Petit titre de section | `ServiceDeGarde.subtitle` |
| Contact | Titre en gras au-dessus des coordonnées de contact | `ServiceDeGarde.contactLabel` |

### Transport (`components/Transport.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Service de Transport | Titre d'en-tête | `Transport.headerText` |
| Logistique | Petit titre de section | `Transport.subtitle` |
| {contactTitle} **{contactName}**, tél: **{contactPhone}** poste: **{contactExtension}** | Bloc de coordonnées de la personne-ressource (les valeurs en accolades changent automatiquement — seuls « tél: » et « poste: » sont à traduire) | `Transport.contactLine` |
| Tournez votre apareil pour une meilleure visualisation | Message sur mobile, invite à tourner l'écran pour voir la carte | `Transport.rotateMessage` |
| Zones couvertes par le transport | Légende de la carte des zones | `Transport.legendCovered` |
| Zones non couvertes par le transport | Légende de la carte des zones | `Transport.legendNotCovered` |
| Plan des zones couvertes par le transport scolaire | Titre au-dessus de la carte, si aucun titre personnalisé n'est fourni | `Transport.defaultMapTitle` |

### Uniforme scolaire (`components/Uniform.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| UNIFORME SCOLAIRE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Uniform.defaultHeaderText` |
| Code vestimentaire | Petit titre de section | `Uniform.subtitle` |
| Service Uniforme | Grand titre, si aucun titre personnalisé n'est fourni | `Uniform.defaultTitle` |

---

## 7. Admissions

### Admissions (`components/Admissions.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| ADMISSIONS | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Admissions.defaultHeaderText` |
| Inscriptions | Petit titre de section | `Admissions.subtitle` |
| Processus d'admission | Grand titre de page | `Admissions.title` |
| Commencer | Texte du bouton, si aucun texte personnalisé n'est fourni | `Admissions.defaultButtonText` |

### Pourquoi Sourp Hagop (`components/PourquoiSourpHagop.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| POURQUOI SOURP HAGOP | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `PourquoiSourpHagop.defaultHeaderText` |
| L'expérience Sourp Hagop | Petit titre de section | `PourquoiSourpHagop.subtitle` |
| au | Mot de liaison entre deux dates (ex. « 8 décembre **au** 19 décembre ») | `PourquoiSourpHagop.dateRangeSeparator` |
| Non, merci | Bouton pour fermer la fenêtre contextuelle | `PourquoiSourpHagop.dismiss` |
| Réserver | Bouton de réservation dans la fenêtre contextuelle | `PourquoiSourpHagop.reserve` |
| En savoir plus | Lien en bas de page, si aucun texte personnalisé n'est fourni | `PourquoiSourpHagop.footerLearnMore` |

### Frais de scolarité (`components/TuitionFees.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| FRAIS DE SCOLARITÉ | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `TuitionFees.defaultHeaderText` |
| Grille tarifaire | Petit titre de section | `TuitionFees.subtitle` |
| Grille tarifaire | Grand titre, si aucun titre personnalisé n'est fourni | `TuitionFees.defaultTableTitle` |
| Catégorie | En-tête de la première colonne du tableau des frais | `TuitionFees.categoryHeader` |

---

## 8. Carrières

### Page carrières (`components/Career.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| REJOIGNEZ NOTRE ÉQUIPE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Career.defaultHeaderText` |
| Voir l'offre | Bouton sur une carte d'offre d'emploi, si des postes sont disponibles | `Career.viewOffer` |
| Aucun poste disponible | Bouton sur une carte d'offre d'emploi, si aucun poste n'est disponible | `Career.noPostsAvailable` |
| {count, plural, one {POSTE} other {POSTES}} dispo. | Badge indiquant le nombre de postes disponibles (le mot POSTE/POSTES s'accorde automatiquement selon le nombre — voir la note ci-dessous) | `Career.postsAvailableBadge` |
| Aucune offre disponible pour l'instant | Message si aucune offre d'emploi n'est publiée | `Career.emptyStateTitle` |
| Restez à l'affût de nos prochaines opportunités ! | Message sous le précédent | `Career.emptyStateSubtitle` |

**Note sur `Career.postsAvailableBadge`** : ce texte utilise une syntaxe spéciale (« pluriel ICU ») qui choisit automatiquement le bon mot selon le nombre de postes. Pour l'arménien occidental, il faut fournir au minimum deux formes : `one` (utilisée pour 1) et `other` (utilisée pour tous les autres nombres). Une clause `=0` explicite peut aussi être ajoutée pour le cas où il n'y a aucun poste, si la formulation change pour zéro (ex. « aucun poste » plutôt que le pluriel générique) — la version arménienne actuelle dans `messages/hy.json` inclut déjà cette structure à titre d'exemple ; il suffit de remplacer les mots français par leurs équivalents arméniens.

### Formulaire de candidature — fenêtre contextuelle (`components/modal/careerModal.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Postuler maintenant | Petit titre de la fenêtre de candidature | `CareerModal.eyebrow` |
| Poste | Titre de secours si le poste n'a pas de titre | `CareerModal.fallbackTitle` |
| Vos informations | Titre de section du formulaire | `CareerModal.sectionYourInfo` |
| Nom complet | Étiquette de champ | `CareerModal.fields.fullName` |
| Courriel | Étiquette de champ | `CareerModal.fields.email` |
| Téléphone | Étiquette de champ | `CareerModal.fields.phone` |
| Poste visé | Étiquette de champ | `CareerModal.fields.targetPosition` |
| Votre candidature | Titre de section du formulaire | `CareerModal.sectionApplication` |
| Message | Étiquette de champ | `CareerModal.fields.message` |
| Lien vers votre CV | Étiquette de champ | `CareerModal.fields.cvLink` |
| Google Drive, Dropbox, etc. | Texte d'exemple dans les champs de lien (utilisé deux fois) | `CareerModal.fields.cvLinkPlaceholder` |
| Ajoutez un lien partageable vers votre document | Texte d'aide sous le champ CV | `CareerModal.fields.cvLinkHelper` |
| Lien vers votre lettre de motivation | Étiquette de champ | `CareerModal.fields.coverLetterLink` |
| Fermer | Bouton pour fermer la fenêtre (utilisé deux fois) | `CareerModal.close` |
| Postuler | Bouton d'envoi du formulaire | `CareerModal.submitCta` |
| Envoi… | Bouton d'envoi pendant l'envoi | `CareerModal.submitCtaPending` |
| Candidature envoyée ! | Titre après envoi réussi | `CareerModal.successTitle` |
| Merci pour votre intérêt. Nous vous contacterons si votre profil correspond. | Message après envoi réussi | `CareerModal.successBody` |

### Détails d'une offre — fenêtre contextuelle (`components/modal/careerDetailModal.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Fermer | Texte descriptif (invisible) du bouton de fermeture, et bouton du bas | `CareerDetailModal.close` |
| Offre d'emploi | Petit titre de la fenêtre de détails | `CareerDetailModal.eyebrow` |
| Aucune description disponible. | Message si l'offre n'a aucune section de contenu | `CareerDetailModal.noDescription` |
| Jusqu'au {date} | Étiquette de la date limite (la date change automatiquement) | `CareerDetailModal.deadlineLabel` |
| Postuler maintenant | Bouton pour ouvrir le formulaire de candidature | `CareerDetailModal.applyNow` |
| INFORMATION ADDITIONNELLE | Titre de secours pour une section sans titre personnalisé | `CareerDetailModal.additionalInfoFallback` |
| DESCRIPTION DU POSTE | Titre de section fixe | `CareerDetailModal.sectionTitles.description` |
| PROFIL CHERCHÉ | Titre de section fixe | `CareerDetailModal.sectionTitles.profil` |
| PRINCIPALES RESPONSABILITÉS | Titre de section fixe | `CareerDetailModal.sectionTitles.responsabilites` |
| CONDITIONS DE TRAVAIL ET AVANTAGES | Titre de section fixe | `CareerDetailModal.sectionTitles.conditions` |
| EXIGENCES | Titre de section fixe | `CareerDetailModal.sectionTitles.exigences` |

---

## 9. Location d'espaces

### Page de location (`components/RentalSpaces.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| LOCATION D'ESPACES | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `RentalSpaces.defaultHeaderText` |
| Nos installations | Petit titre de section | `RentalSpaces.subtitle` |
| Nos espaces à votre disposition | Grand titre de page | `RentalSpaces.title` |
| En savoir plus | Bouton sur chaque carte d'espace | `RentalSpaces.learnMore` |

### Formulaire de réservation — fenêtre contextuelle (`components/modal/LocationModal.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Fermer | Texte descriptif (invisible) du bouton de fermeture | `LocationModal.closeAlt` |
| Demande envoyée! | Titre après envoi réussi | `LocationModal.successTitle` |
| Nous avons bien reçu votre demande de réservation pour **{spaceName}**. Notre équipe vous contactera dans les plus brefs délais. | Message après envoi réussi (le nom de l'espace change automatiquement) | `LocationModal.successBody` |
| ← Retour aux détails | Lien pour revenir à la fiche de l'espace | `LocationModal.backToDetails` |
| Formulaire de réservation | Titre du formulaire | `LocationModal.formTitle` |
| Prénom * | Étiquette de champ | `LocationModal.fields.firstName` |
| Nom * | Étiquette de champ | `LocationModal.fields.lastName` |
| Courriel * | Étiquette de champ | `LocationModal.fields.email` |
| Téléphone * | Étiquette de champ | `LocationModal.fields.phone` |
| Date souhaitée * | Étiquette de champ | `LocationModal.fields.date` |
| Type d'événement * | Étiquette de champ (liste déroulante) | `LocationModal.fields.eventType` |
| Sélectionnez | Option par défaut de la liste déroulante | `LocationModal.eventTypeOptions.placeholder` |
| Conférence | Option de la liste déroulante | `LocationModal.eventTypeOptions.conference` |
| Réunion | Option de la liste déroulante | `LocationModal.eventTypeOptions.meeting` |
| Événement | Option de la liste déroulante | `LocationModal.eventTypeOptions.event` |
| Autre | Option de la liste déroulante | `LocationModal.eventTypeOptions.other` |
| Commentaires | Étiquette de champ | `LocationModal.fields.comments` |
| Détails supplémentaires... | Texte d'exemple dans le champ commentaires | `LocationModal.fields.commentsPlaceholder` |
| Envoyer la demande | Bouton d'envoi du formulaire | `LocationModal.submitCta` |
| Envoi en cours... | Bouton d'envoi pendant l'envoi | `LocationModal.submitCtaPending` |
| Demande de réservation | Bouton sur la fiche d'un espace, pour ouvrir le formulaire | `LocationModal.detailsCta` |

---

## 10. Calendrier

### Mini-calendrier — page d'accueil (`components/display/Calendar.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Événements à venir | Petit titre de section | `Calendar.subtitle` |
| CALENDRIER | Titre de section | `Calendar.title` |
| Voir le calendrier complet | Lien vers la page calendrier complète | `Calendar.viewAllLink` |
| — | Texte affiché sur une case de jour sans évènement (un simple tiret) | `Calendar.noEventPlaceholder` |
| janvier / février / mars / avril / mai / juin / juillet / août / septembre / octobre / novembre / décembre | Noms des mois affichés sur les cases de jour | `Calendar.months.*` |
| dim / lun / mar / mer / jeu / ven / sam | Abréviations des jours affichées sur les cases de jour | `Calendar.days.*` |

**Note sur les mois et les jours** : ces libellés ne sont **pas** générés automatiquement par le navigateur (voir `docs/adr/0001-architecture-i18n.md` section 10 pour l'explication technique) — chacun doit être écrit à la main en arménien occidental.

### Calendrier complet (`components/display/ReactCalendar.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| CALENDRIER | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `ReactCalendar.defaultHeaderText` |

⚠️ Voir la section « Textes anglais » pour `ReactCalendar.errorTitle`, `errorBody`, `retry`, `goBack`.

### Détails d'un évènement (`app/[locale]/calendrier/evenement/[id]/page.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| Chargement... | Message pendant le chargement de la page | `CalendrierEvenementPage.loading` |
| Événement introuvable | Titre si l'évènement demandé n'existe pas | `CalendrierEvenementPage.notFoundTitle` |
| Retour au calendrier | Bouton sous le message précédent | `CalendrierEvenementPage.backToCalendar` |
| « Tous les Évènements | Lien pour revenir à la liste des évènements | `CalendrierEvenementPage.backToAllEvents` |
| Cet évènement est passé. | Mention si l'évènement est déjà terminé | `CalendrierEvenementPage.pastEventNotice` |
| DÉTAILS | Titre de la section détails | `CalendrierEvenementPage.detailsTitle` |
| Date : | Étiquette de champ | `CalendrierEvenementPage.dateLabel` |
| Heure : | Étiquette de champ | `CalendrierEvenementPage.timeLabel` |
| Catégorie d'Évènement: | Étiquette de champ | `CalendrierEvenementPage.categoryLabel` |
| Événement sans titre | Titre de secours si l'évènement n'a pas de titre | `CalendrierEvenementPage.untitledEvent` |
| Secondaire / Primaire / Préscolaire / Réunion / Spectacle / Sortie / Général | Catégories attribuées automatiquement selon des mots-clés dans le titre de l'évènement | `CalendrierEvenementPage.categories.*` |

---

## 11. Nous joindre

### Formulaire de contact (`app/[locale]/nous-joindre/page.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| CONTACTEZ-NOUS | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `NousJoindrePage.defaultHeaderText` |
| Nous sommes là pour vous | Grand titre, si aucun titre personnalisé n'est fourni | `NousJoindrePage.defaultIntroTitle` |
| Notre équipe est prête à répondre à toutes vos questions et à vous accompagner dans vos projets. N'hésitez pas à nous contacter pour discuter de vos besoins. | Texte d'introduction, si aucun texte personnalisé n'est fourni | `NousJoindrePage.defaultIntroText` |
| Notre adresse | Titre de la carte d'adresse | `NousJoindrePage.addressCardTitle` |
| Notre localisation | Texte descriptif (invisible) de la carte Google Maps | `NousJoindrePage.mapTitle` |
| Cliquez pour ouvrir dans Google Maps | Texte sur la carte Google Maps | `NousJoindrePage.mapOverlay` |
| Téléphone | Titre de la carte téléphone | `NousJoindrePage.phoneCardTitle` |
| Lun - Ven: 9h00 - 16h00 | Heures d'ouverture sous le numéro de téléphone | `NousJoindrePage.businessHours` |
| Envoyez-nous un message | Titre du formulaire | `NousJoindrePage.formTitle` |
| Prénom * | Étiquette de champ | `NousJoindrePage.fields.firstName` |
| Nom * | Étiquette de champ | `NousJoindrePage.fields.lastName` |
| Courriel * | Étiquette de champ | `NousJoindrePage.fields.email` |
| Téléphone | Étiquette de champ | `NousJoindrePage.fields.phone` |
| Sujet * | Étiquette de champ | `NousJoindrePage.fields.subject` |
| Message * | Étiquette de champ | `NousJoindrePage.fields.message` |
| Décrivez votre projet ou votre demande... | Texte d'exemple dans le champ message | `NousJoindrePage.fields.messagePlaceholder` |
| Envoyer le message | Bouton d'envoi du formulaire | `NousJoindrePage.submitCta` |
| Envoi en cours... | Bouton d'envoi pendant l'envoi | `NousJoindrePage.submitCtaPending` |
| Message envoyé avec succès! | Titre après envoi réussi | `NousJoindrePage.successTitle` |
| Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais. | Message après envoi réussi | `NousJoindrePage.successBody` |
| Envoyer un autre message | Bouton pour réinitialiser le formulaire | `NousJoindrePage.sendAnother` |

*(L'adresse, le numéro de téléphone et le courriel du pied de page/de cette page ne sont pas dans ce document — ce sont des coordonnées qui restent identiques dans les deux langues, voir `scripts/hardcoded-strings-allowlist.json`.)*

---

## 12. Notre équipe

### Page équipe (`components/Team.jsx`)

| Texte français | Où ça apparaît | Clé |
|---|---|---|
| NOTRE ÉQUIPE | Titre d'en-tête, si aucun titre personnalisé n'est fourni | `Team.defaultHeaderText` |
| Notre équipe | Petit titre de section | `Team.subtitle` |
| Découvrez nos offres | Bouton vers la page carrières | `Team.viewOffersButton` |

---

## 13. Page d'authentification (réservée à l'école)

Cette page (`/admin/login`) n'est pas destinée aux visiteurs du site — elle sert uniquement à la personne responsable du contenu pour se connecter au Studio. Elle est incluse ici par souci de complétude, mais sa traduction est une priorité bien plus faible que le reste du site.

⚠️ Voir la section « Textes anglais » pour `Login.signInWithGoogle`, `FacebookLogin.signIn` et `FacebookLogin.logout`.

---

## Textes anglais

Deux catégories bien différentes de texte anglais existent dans ce livrable. Il est important de ne pas les confondre.

### A. Texte anglais dont l'origine est incertaine — à vérifier avant de traduire

Ces **quatre** chaînes sont du texte alternatif d'image (invisible à l'écran, lu par les lecteurs d'écran pour l'accessibilité) resté en anglais sur un site par ailleurs entièrement français. Rien dans le code n'indique si c'est intentionnel ou un oubli — voir `docs/dettes-preexistantes.md` item (w). **Ne pas traduire ces quatre chaînes sans consulter le porteur de projet** : la bonne solution est probablement de les corriger en français plutôt que de les traduire en arménien à partir d'un texte anglais qui n'aurait jamais dû être là.

| Texte anglais | Clé | Où ça apparaît |
|---|---|---|
| School Logo | `Footer.logoAlt` | Texte descriptif du logo de l'école, pied de page |
| OSBL Logo | `Footer.osblLogoAlt` | Texte descriptif du logo de l'organisme à but non lucratif, pied de page |
| Sourp Hagop School | `Footer.schoolImageAlt` | Texte descriptif de la photo de l'école, pied de page |
| Background | `BackgroundVideo.fallbackAlt` | Texte descriptif de l'image de secours quand la vidéo d'arrière-plan ne peut pas jouer |

*(`BackgroundVideo.unsupportedVideoTag` — « Your browser does not support the video tag. » — est aussi en anglais, mais appartient à la catégorie B ci-dessous : c'est un message technique de secours, visible uniquement sur un navigateur trop ancien pour lire une vidéo HTML, pas un oubli de traduction.)*

*(Une cinquième chaîne, le texte alternatif « chevron down » dans `components/ui/topNav.jsx`, avait été identifiée à un moment donné mais s'est révélée être du code commenté, jamais affiché sur le site — elle n'existe pas dans `messages/fr.json` et n'a donc pas à être traduite. Voir `docs/dettes-preexistantes.md` item (w), note de correction.)*

### B. Texte anglais dont le maintien est une décision délibérée — à extraire tel quel, sans traduire ni corriger

Ces chaînes sont du texte fonctionnel anglais (boutons de connexion à des services tiers, messages d'erreur techniques) — voir `docs/dettes-preexistantes.md` item (s). La décision prise pendant ce chantier a été de les extraire telles quelles, sans les traduire ni les corriger, en attendant une décision séparée du porteur de projet. **Elles ne font pas partie de ce livrable de traduction.**

| Texte anglais | Clé | Où ça apparaît |
|---|---|---|
| Sign in with Google | `Login.signInWithGoogle` | Bouton de connexion, page d'administration |
| Sign in with Facebook | `FacebookLogin.signIn` | Bouton de connexion, page d'administration |
| Logout from Facebook | `FacebookLogin.logout` | Bouton de déconnexion, page d'administration |
| Something went wrong | `ReactCalendar.errorTitle` | Titre si le calendrier ne charge pas |
| We couldn't load the calendar right now. | `ReactCalendar.errorBody` | Message sous le titre précédent |
| Try again | `ReactCalendar.retry` | Bouton de la page d'erreur du calendrier |
| Go back | `ReactCalendar.goBack` | Bouton de la page d'erreur du calendrier |
| Fond memories | `Instagram.fallbackCaption` | Légende de secours si une publication Instagram n'a pas de légende |
| Your browser does not support the video tag. | `BackgroundVideo.unsupportedVideoTag` | Message de secours si le navigateur ne peut pas lire la vidéo d'arrière-plan |

---

*Document généré à la fin de la phase 6B (extraction des chaînes d'interface, `i18n` branche). `messages/fr.json`/`messages/hy.json` contiennent 335 clés au total ; ce document liste chacune d'elles, regroupées par page plutôt que par ordre technique. Les 8 chaînes anglaises de la section B (« décision délibérée ») sont incluses dans les 335 mais ne font pas partie du travail de traduction — voir la note qui les accompagne.*
