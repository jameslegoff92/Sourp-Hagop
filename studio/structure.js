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

            // Group: L'école
            S.listItem()
                .title("L'école")
                .child(
                    S.list()
                        .title("L'école")
                        .items([
                            S.documentTypeListItem('historyPage').title('Historique'),
                            S.documentTypeListItem('teamPage').title("L'équipe"),
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
                            S.documentTypeListItem('libraryPage').title("Bibliothèque"),
                            S.documentTypeListItem('uniformPage').title("Uniforme scolaire"),
                            S.documentTypeListItem('jardinLitterairePage').title("Mer Aykin: Un jardin littéraire"),
                            S.documentTypeListItem('crealabPage').title("Créalab"),

                        ])
                ),

            // Group: Admissions
            S.listItem()
                .title("Admissions")
                .child(
                    S.list()
                        .title("Admissions")
                        .items([
                            /*  S.documentTypeListItem('tuitionFees').title("Droits de scolarité et autres frais"), */
                        ])
                ),

        ])
