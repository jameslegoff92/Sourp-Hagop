import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'secondaire',
  title: 'Programme Secondaire',
  type: 'document',
  groups: [
    { name: 'header', title: 'En-tête' },
    { name: 'intro', title: 'Introduction' },
    { name: 'cycles', title: 'Cycles du Secondaire' },
    { name: 'pedagogy', title: 'Approche Pédagogique' },
    { name: 'enrichedCourses', title: 'Curriculum Enrichi' },
    { name: 'options', title: 'Options 5e Secondaire' },
    { name: 'activities', title: 'Activités Parascolaires' },
    { name: 'maquette', title: 'Maquette de Cours' },
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
      type: 'string',
      group: 'header'
    }),

    // ═══════════════════════════════════════════════════════════════
    // INTRODUCTION
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 4,
      group: 'intro'
    }),

    // ═══════════════════════════════════════════════════════════════
    // CYCLES DU SECONDAIRE
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'cyclesTitle',
      title: 'Titre de la section Cycles',
      type: 'string',
      initialValue: 'Les Deux Cycles du Secondaire',
      group: 'cycles'
    }),
    defineField({
      name: 'cycles',
      title: 'Cycles',
      type: 'array',
      group: 'cycles',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Nom du cycle', type: 'string' },
          { name: 'grades', title: 'Niveaux', type: 'string' },
          { name: 'focus', title: 'Focus', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 3 },
          { 
            name: 'image', 
            title: 'Image de fond', 
            type: 'image',
            options: { hotspot: true }
          }
        ],
        preview: {
          select: { title: 'name', subtitle: 'grades', media: 'image' },
          prepare({ title, subtitle, media }) {
            return { title, subtitle, media }
          }
        }
      }]
    }),

    // ═══════════════════════════════════════════════════════════════
    // APPROCHE PÉDAGOGIQUE
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'pedagogyTitle',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Approche Pédagogique : Résolution de Problèmes',
      group: 'pedagogy'
    }),
    defineField({
      name: 'pedagogyContent',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'pedagogy'
    }),

    // ═══════════════════════════════════════════════════════════════
    // CURRICULUM ENRICHI
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'enrichedTitle',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Curriculum Enrichi',
      group: 'enrichedCourses'
    }),
    defineField({
      name: 'enrichedIntro',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 2,
      group: 'enrichedCourses'
    }),
    defineField({
      name: 'enrichedCourses',
      title: 'Cours enrichis',
      type: 'array',
      group: 'enrichedCourses',
      of: [{
        type: 'object',
        fields: [
          { name: 'subject', title: 'Matière', type: 'string' },
          { name: 'levels', title: 'Niveaux', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
          { 
            name: 'type', 
            title: 'Type (pour la couleur)', 
            type: 'string',
            options: {
              list: [
                { title: 'Arts (orange)', value: 'arts' },
                { title: 'Mathématiques (violet)', value: 'math' },
                { title: 'Langues (bleu)', value: 'languages' },
                { title: 'Sciences (vert)', value: 'sciences' },
                { title: 'Défaut (bleu)', value: 'default' }
              ]
            },
            initialValue: 'default'
          }
        ],
        preview: {
          select: { title: 'subject', subtitle: 'levels' },
          prepare({ title, subtitle }) {
            return { title, subtitle }
          }
        }
      }]
    }),

    // ═══════════════════════════════════════════════════════════════
    // OPTIONS 5E SECONDAIRE
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'optionsTitle',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Options de 5e Secondaire',
      group: 'options'
    }),
    defineField({
      name: 'optionsIntro',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 2,
      group: 'options'
    }),
    defineField({
      name: 'programOptions',
      title: 'Options de programme',
      type: 'array',
      group: 'options',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Titre', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
          { name: 'target', title: 'Public cible', type: 'string' },
          { 
            name: 'type', 
            title: 'Type (pour la couleur)', 
            type: 'string',
            options: {
              list: [
                { title: 'Sciences (vert)', value: 'sciences' },
                { title: 'Sciences Humaines (rouge)', value: 'humanities' },
                { title: 'Arts (orange)', value: 'arts' },
                { title: 'Défaut (bleu)', value: 'default' }
              ]
            },
            initialValue: 'default'
          }
        ],
        preview: {
          select: { title: 'title', subtitle: 'target' },
          prepare({ title, subtitle }) {
            return { title, subtitle }
          }
        }
      }]
    }),

    // ═══════════════════════════════════════════════════════════════
    // ACTIVITÉS PARASCOLAIRES
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'activitiesTitle',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Activités Parascolaires et Projets Particuliers',
      group: 'activities'
    }),
    defineField({
      name: 'activitiesIntro',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 2,
      group: 'activities'
    }),
    defineField({
      name: 'activities',
      title: 'Activités',
      type: 'array',
      group: 'activities',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'activitiesNote',
      title: 'Note de bas de section',
      type: 'text',
      rows: 2,
      group: 'activities'
    }),

    // ═══════════════════════════════════════════════════════════════
    // MAQUETTE DE COURS
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'maquetteTitle',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Maquette de Cours au Secondaire',
      group: 'maquette'
    }),
    defineField({
      name: 'maquetteContent',
      title: 'Contenu',
      type: 'text',
      rows: 3,
      group: 'maquette'
    }),
    defineField({
      name: 'maquetteNote',
      title: 'Note (avec icône)',
      type: 'string',
      group: 'maquette'
    }),
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREVIEW
  // ═══════════════════════════════════════════════════════════════
  preview: {
    prepare() {
      return { title: 'Programme éducatif au secondaire' }
    }
  }
})