import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'admissionsPage',
  title: 'Admissions',
  type: 'document',
  groups: [
    { name: 'header', title: 'En-tête' },
    { name: 'prescolairePrimaire', title: 'Bloc: Préscolaire et Primaire' },
    { name: 'secondaire', title: 'Bloc: Secondaire' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════
    // EN-TÊTE
    // ═══════════════════════════════════════════════════════════════
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
      type: 'localizedString',
      group: 'header'
    }),

    // ═══════════════════════════════════════════════════════════════
    // BLOC 1: PRÉSCOLAIRE ET PRIMAIRE
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'prescolairePrimaireTitle',
      title: 'Titre',
      type: 'localizedString',
      initialValue: { fr: 'Admission' },
      group: 'prescolairePrimaire'
    }),
    defineField({
      name: 'prescolairePrimaireSubtitle',
      title: 'Sous-titre',
      type: 'localizedString',
      initialValue: { fr: 'PRÉSCOLAIRE ET PRIMAIRE' },
      group: 'prescolairePrimaire'
    }),
    defineField({
      name: 'prescolairePrimaireText',
      title: 'Description',
      type: 'localizedText',
      group: 'prescolairePrimaire'
    }),
    defineField({
      name: 'prescolairePrimaireButtonText',
      title: 'Texte du bouton',
      type: 'localizedString',
      initialValue: { fr: 'Commencer' },
      group: 'prescolairePrimaire'
    }),
    defineField({
      name: 'prescolairePrimaireLink',
      title: 'Lien externe',
      type: 'url',
      group: 'prescolairePrimaire'
    }),

    // ═══════════════════════════════════════════════════════════════
    // BLOC 2: SECONDAIRE
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'secondaireTitle',
      title: 'Titre',
      type: 'localizedString',
      initialValue: { fr: 'Admission' },
      group: 'secondaire'
    }),
    defineField({
      name: 'secondaireSubtitle',
      title: 'Sous-titre',
      type: 'localizedString',
      initialValue: { fr: 'SECONDAIRE' },
      group: 'secondaire'
    }),
    defineField({
      name: 'secondaireText',
      title: 'Description',
      type: 'localizedText',
      group: 'secondaire'
    }),
    defineField({
      name: 'secondaireButtonText',
      title: 'Texte du bouton',
      type: 'localizedString',
      initialValue: { fr: 'Commencer' },
      group: 'secondaire'
    }),
    defineField({
      name: 'secondaireLink',
      title: 'Lien externe',
      type: 'url',
      group: 'secondaire'
    }),
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREVIEW
  // ═══════════════════════════════════════════════════════════════
  preview: {
    prepare() {
      return { title: 'Page Admissions' }
    }
  }
})