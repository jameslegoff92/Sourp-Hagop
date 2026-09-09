import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tuitionFeesPage',
  title: 'Droits de scolarité',
  type: 'document',
  groups: [
    { name: 'header', title: 'Entête' },
    { name: 'intro', title: 'Introduction' },
    { name: 'tableHeaders', title: 'Entêtes du tableau' },
    { name: 'fees', title: 'Frais de scolarité' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════
    // EN-TÊTE
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'headerImage',
      title: 'Image d\'entête',
      type: 'image',
      options: { hotspot: true },
      group: 'header'
    }),
    defineField({
      name: 'headerText',
      title: 'Titre de l\'entête',
      type: 'localizedString',
      group: 'header'
    }),

    // ═══════════════════════════════════════════════════════════════
    // INTRODUCTION
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'localizedText',
      group: 'intro'
    }),

    // ═══════════════════════════════════════════════════════════════
    // EN-TÊTES DU TABLEAU
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'tableTitle',
      title: 'Titre de la première colonne',
      type: 'localizedString',
      initialValue: { fr: 'Droits de scolarité et autres frais' },
      group: 'tableHeaders'
    }),
    defineField({
      name: 'prescolaireLabel',
      title: 'Label Préscolaire',
      type: 'localizedString',
      initialValue: { fr: 'Préscolaire' },
      group: 'tableHeaders'
    }),
    defineField({
      name: 'primaireLabel',
      title: 'Label Primaire',
      type: 'localizedString',
      initialValue: { fr: 'Primaire' },
      group: 'tableHeaders'
    }),
    defineField({
      name: 'secondaireLabel',
      title: 'Label Secondaire',
      type: 'localizedString',
      initialValue: { fr: 'Secondaire' },
      group: 'tableHeaders'
    }),

    // ═══════════════════════════════════════════════════════════════
    // FRAIS DE SCOLARITÉ
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'fees',
      title: 'Lignes du tableau',
      type: 'array',
      group: 'fees',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'category',
            title: 'Catégorie / Description',
            type: 'localizedString'
          },
          {
            name: 'prescolaire',
            title: 'Prix Préscolaire',
            type: 'string',
            description: 'Laisser vide pour afficher "—" et ne pas inclure le signe de $'
          },
          {
            name: 'primaire',
            title: 'Prix Primaire',
            type: 'string',
            description: 'Laisser vide pour afficher "—" et ne pas inclure le signe de $'
          },
          {
            name: 'secondaire',
            title: 'Prix Secondaire',
            type: 'string',
            description: 'Laisser vide pour afficher "—" et ne pas inclure le signe de $'
          },
          {
            name: 'rowType',
            title: 'Type de ligne',
            type: 'string',
            options: {
              list: [
                { title: 'Normal', value: 'regular' },
                { title: 'En-tête de section', value: 'header' },
                { title: 'Total', value: 'total' },
                { title: 'Spécial (avec icône)', value: 'special' }
              ]
            },
            initialValue: 'regular'
          }
        ],
        preview: {
          select: {
            title: 'category',
            rowType: 'rowType',
            prescolaire: 'prescolaire'
          },
          prepare({ title, rowType, prescolaire }) {
            const typeLabels = {
              regular: '',
              header: '📋 Section',
              total: '💰 Total',
              special: '⭐ Spécial'
            }
            return {
              title: title?.fr || 'Sans catégorie',
              subtitle: `${typeLabels[rowType] || ''} ${prescolaire ? `- ${prescolaire}` : ''}`
            }
          }
        }
      }]
    }),
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREVIEW
  // ═══════════════════════════════════════════════════════════════
  preview: {
    prepare() {
      return { title: 'Droits de scolarité et autres frais' }
    }
  }
})