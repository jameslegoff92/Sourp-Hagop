import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pourquoiPage',
  title: 'Pourquoi Sourp Hagop',
  type: 'document',
  groups: [
    { name: 'header', title: 'En-tête' },
    { name: 'popup', title: 'Popup Visite Personnalisée' },
    { name: 'intro', title: 'Introduction' },
    { name: 'sections', title: 'Sections' },
    { name: 'footer', title: 'Pied de page' },
  ],
  fields: [
    // ===== HEADER =====
    defineField({
      name: 'headerImage',
      title: 'Image d\'en-tête',
      type: 'image',
      options: { hotspot: true },
      group: 'header'
    }),
    defineField({
      name: 'headerText',
      title: 'Titre de l\'en-tête',
      type: 'string',
      group: 'header'
    }),

    // ===== POPUP =====
    defineField({
      name: 'popupEnabled',
      title: 'Afficher le popup',
      description: 'Activer ou désactiver le popup de visite personnalisée',
      type: 'boolean',
      group: 'popup',
      initialValue: false
    }),
    defineField({
      name: 'popupTitle',
      title: 'Titre du popup',
      type: 'string',
      group: 'popup'
    }),
    defineField({
      name: 'popupText',
      title: 'Texte du popup',
      type: 'text',
      rows: 2,
      group: 'popup'
    }),
    defineField({
      name: 'popupDateStart',
      title: 'Date de début',
      type: 'string',
      group: 'popup'
    }),
    defineField({
      name: 'popupDateEnd',
      title: 'Date de fin',
      type: 'string',
      group: 'popup'
    }),
    defineField({
      name: 'popupButtonLink',
      title: 'Lien du bouton de réservation',
      type: 'url',
      group: 'popup'
    }),

    // ===== INTRO =====
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 4,
      group: 'intro'
    }),

    // ===== SECTIONS =====
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'sections',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Titre', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 4 },
          { 
            name: 'image', 
            title: 'Image', 
            type: 'image',
            options: { hotspot: true }
          },
          { 
            name: 'imagePosition', 
            title: 'Position de l\'image', 
            type: 'string',
            options: {
              list: [
                { title: 'Gauche', value: 'left' },
                { title: 'Droite', value: 'right' }
              ]
            },
            initialValue: 'left'
          }
        ],
        preview: {
          select: { title: 'title', media: 'image' },
          prepare({ title, media }) {
            return { title, media }
          }
        }
      }]
    }),

    // ===== FOOTER TEXT =====
    defineField({
      name: 'footerText',
      title: 'Texte de pied de page',
      type: 'text',
      rows: 2,
      group: 'footer'
    }),
    defineField({
      name: 'footerDateStart',
      title: 'Date de début (pied de page)',
      type: 'string',
      group: 'footer'
    }),
    defineField({
      name: 'footerDateEnd',
      title: 'Date de fin (pied de page)',
      type: 'string',
      group: 'footer'
    }),
    defineField({
      name: 'footerLinkText',
      title: 'Texte du lien',
      type: 'string',
      group: 'footer'
    }),
    defineField({
      name: 'footerLink',
      title: 'Lien de réservation',
      type: 'url',
      group: 'footer'
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pourquoi Sourp Hagop' }
    }
  }
})