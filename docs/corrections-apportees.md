# Corrections apportées — bugs préexistants trouvés et corrigés

**Pour** : le porteur de projet
**Portée** : l'ensemble du mandat i18n (phases 0 à 7)

Ce document est distinct du journal des dettes (`docs/dettes-preexistantes.md`), qui recense aussi des problèmes **documentés mais non corrigés** — laissés en l'état, en attente d'une décision qui n'appartient pas à l'équipe technique. Ici, seuls les bugs préexistants réellement **corrigés** pendant ce mandat sont listés — quatre au total, tous trouvés en marge du travail d'internationalisation lui-même, jamais comme objectif de départ.

---

### 1. Trois bugs de casse de nom de fichier qui auraient pu empêcher la mise en ligne du site

Un fichier (`Button.jsx`) était enregistré en minuscule dans l'historique du projet alors qu'il portait déjà un nom en majuscule sur le disque, et deux autres fichiers l'appelaient par son ancien nom en minuscule. **Conséquence pour l'école** : invisible sur les ordinateurs de l'équipe (Windows ignore la différence), mais le service qui héberge le site en production (Vercel) ne l'ignore pas — le prochain déploiement touchant l'un de ces trois fichiers aurait pu faire échouer la mise en ligne du site, sans avertissement. Trouvé et corrigé avant qu'un tel incident ne se produise.

### 2. Le site s'annonçait en anglais alors qu'il est en français

Le code déclarait « ce site est en anglais » à chaque page, depuis la création du site (juin 2024). **Conséquence pour l'école** : les personnes malvoyantes utilisant un lecteur d'écran entendaient une prononciation anglaise appliquée à du texte français, et Google recevait un signal erroné sur la langue réelle du site — un désavantage silencieux, à la fois pour l'accessibilité et pour le référencement. Corrigé en phase 3 ; la même correction indique maintenant automatiquement la bonne langue, y compris pour la version arménienne.

### 3. Une partie du texte du site ne s'affichait pas dans la police officielle, depuis deux ans

Une erreur de programmation (juin 2024) faisait qu'aucune police n'était jamais appliquée à une partie du texte brut du site — 755 endroits de texte, sur 32 des 33 pages, dont le nom de l'école dans le menu déroulant de navigation et les phrases du bas de page. **Conséquence pour l'école** : ce texte s'affichait dans la police par défaut du navigateur de chaque visiteur, jamais celle de l'école (Roboto) — un écart d'image de marque invisible à l'œil non averti, présent sur la majorité des pages du site pendant environ deux ans. Corrigé en phase 7 ; découvert seulement parce que l'ajout de la police arménienne exigeait un texte brut correctement stylé pour s'y accrocher.

### 4. Le sélecteur de langue n'avait aucune police prévue pour l'arménien

Le bouton « FR / ՀԱՅ » en haut du site utilisait, depuis sa création (juin 2024, le même jour que le bug précédent), une police qui ne couvre pas l'alphabet arménien — sans aucune police de secours déclarée pour ces caractères. **Conséquence pour l'école** : le seul mot arménien déjà visible sur le site en production reposait sur le choix, non maîtrisé, du navigateur de chaque visiteur pour trouver une police de remplacement — un risque d'affichage incohérent d'un appareil à l'autre. Corrigé en phase 7, en même temps que l'ajout de la police arménienne au reste du site.

---

**Ce que ces quatre corrections ont en commun** : aucune ne faisait partie de l'objectif annoncé de ce mandat (« ajouter l'arménien »). Toutes les quatre existaient déjà sur le site, silencieusement, avant que ce travail ne commence — trouvées uniquement parce que le travail d'internationalisation exigeait de toucher exactement les zones du code où elles se trouvaient. C'est la différence entre livrer une fonctionnalité et livrer un site qui fonctionne mieux qu'avant qu'on y touche.
