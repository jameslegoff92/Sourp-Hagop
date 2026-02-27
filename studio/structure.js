export default (S) =>
    S.list()
        .title('Content')
        .items([
            // Group: Top navigation
            S.listItem()
                .title("Top navigation")
                .child(
                    S.list()
                        .title("Top navigation")
                        .items([
                            S.documentTypeListItem('careerPage').title('Carrières'),
                            S.documentTypeListItem('rentalSpacesPage').title('Locations'),
                        ])
                ),

            // Home Page
            ...S.documentTypeListItems().filter(
                (listItem) => listItem.getId() === 'homePage'
            ),

            S.documentTypeListItem('testDocument').title('TEST'),

            // Group: L'école
            S.listItem()
                .title("L'école")
                .child(
                    S.list()
                        .title("L'école")
                        .items([
                            S.documentTypeListItem('historyPage').title('Historique'),
                            S.documentTypeListItem('teamPage').title("L'équipe"),
                            S.documentTypeListItem("administrationPage").title("Conseil d’administration"),
                            S.documentTypeListItem("projetEducatifPage").title("Projet éducatif"),
                            S.documentTypeListItem("comiteParentsPage").title("Comité de parents"),
                            S.documentTypeListItem('anciensPage').title('Anciens et Anciennes'),
                            S.documentTypeListItem('protecteurNationalPage').title("Protecteur national de l'élève"),

                        ])
                ),

            // Group: Pédagogie
            S.listItem()
                .title("Pédagogie")
                .child(
                    S.list()
                        .title("Pédagogie")
                        .items([
                            S.documentTypeListItem('prescolaire').title('Programme éducatif au préscolaire'),
                            S.documentTypeListItem('primaire').title('Programme éducatif au primaire'),
                            S.documentTypeListItem('secondaire').title('Programme éducatif au secondaire'),
                        ])
                ),

            // Group: Vie étudiante
            S.listItem()
                .title("Vie étudiante")
                .child(
                    S.list()
                        .title("Vie étudiante")
                        .items([
                            S.documentTypeListItem('studentCouncilPage').title("Conseil étudiant"),
                            S.documentTypeListItem('aiglePage').title("Équipes des aigles"),
                            S.documentTypeListItem('tripsPage').title("Sorties scolaires et voyages"),
                        ])
                ),

            // Group: Services à l'élève
            S.listItem()
                .title("Services à l'élève")
                .child(
                    S.list()
                        .title("Services à l'élève")
                        .items([
                            S.documentTypeListItem('soutienPage').title('Soutien aux élèves'),
                            S.documentTypeListItem('libraryPage').title("Bibliothèque"),
                            S.documentTypeListItem('jardinLitterairePage').title("Mer Aykin: Un jardin littéraire"),
                            S.documentTypeListItem('crealabPage').title("Créalab"),
                            S.documentTypeListItem('serviceDeGardePage').title('Service de garde'),
                            S.documentTypeListItem('transportPage').title('Transport'),
                            S.documentTypeListItem('uniformPage').title("Uniforme scolaire"),
                        ])
                ),

            // Group: Admissions
            S.listItem()
                .title("Admissions")
                .child(
                    S.list()
                        .title("Admissions")
                        .items([
                            S.documentTypeListItem('pourquoiPage').title('Pourquoi Sourp Hagop'),
                            S.documentTypeListItem('admissionsPage').title('Admissions'),
                            S.documentTypeListItem('tuitionFeesPage').title("Droits de scolarité et autres frais"),
                        ])
                ),

        ])
