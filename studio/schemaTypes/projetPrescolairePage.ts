import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'prescolaire',
  title: 'Programme Préscolaire',
  type: 'document',
  groups: [
    { name: 'header', title: 'En-tête' },
    { name: 'activities', title: 'Activités Pédagogiques' },
    { name: 'courses', title: 'Cours Spécialisés' },
    { name: 'evaluation', title: 'Système d\'Évaluation' },
    { name: 'competencies', title: 'Compétences' },
    { name: 'schedule', title: 'Horaire' },
    { name: 'contact', title: 'Contact' },
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
      type: 'localizedString',
      group: 'header'
    }),
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'localizedText',
      group: 'header'
    }),

    // ===== ACTIVITIES =====
    defineField({
      name: 'activitiesTitle',
      title: 'Titre de la section Activités',
      type: 'localizedString',
      group: 'activities'
    }),
    defineField({
      name: 'activitiesDescription',
      title: 'Description des activités',
      type: 'localizedText',
      group: 'activities'
    }),
    defineField({
      name: 'activities',
      title: 'Liste des activités',
      type: 'array',
      group: 'activities',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icon',
            title: 'Icône (SVG)',
            type: 'image',
            options: { accept: 'image/svg+xml' }
          },
          { name: 'title', title: 'Nom de l\'activité', type: 'localizedString' }
        ],
        preview: {
          select: { title: 'title', media: 'icon' },
          prepare({ title, media }) {
            return { title: title?.fr || 'Sans titre', media }
          }
        }
      }]
    }),

    // ===== SPECIALIZED COURSES =====
    defineField({
      name: 'coursesTitle',
      title: 'Titre de la section Cours',
      type: 'localizedString',
      group: 'courses'
    }),
    defineField({
      name: 'coursesDescription',
      title: 'Description des cours',
      type: 'localizedText',
      group: 'courses'
    }),
    defineField({
      name: 'specializedCourses',
      title: 'Cours spécialisés',
      type: 'array',
      group: 'courses',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icon',
            title: 'Icône (SVG)',
            type: 'image',
            options: { accept: 'image/svg+xml' }
          },
          { name: 'title', title: 'Nom du cours', type: 'localizedString' },
          { name: 'hours', title: 'Durée (ex: 120 min/semaine)', type: 'localizedString' },
          {
            name: 'color',
            title: 'Couleur d\'accent',
            type: 'string',
            options: {
              list: [
                { title: 'Orange (Arts)', value: '#fd7e14' },
                { title: 'Vert (Sport)', value: '#28a745' },
                { title: 'Rouge (Arménien)', value: '#dc3545' },
                { title: 'Bleu (Défaut)', value: '#007bff' },
                { title: 'Violet', value: '#6f42c1' },
              ]
            }
          }
        ],
        preview: {
          select: { title: 'title', hours: 'hours' },
          prepare({ title, hours }) {
            return { title: title?.fr || 'Sans titre', subtitle: hours?.fr }
          }
        }
      }]
    }),

    // ===== EVALUATION =====
    defineField({
      name: 'evaluationTitle',
      title: 'Titre de la section Évaluation',
      type: 'localizedString',
      group: 'evaluation'
    }),
    defineField({
      name: 'evaluationDescription',
      title: 'Description du système d\'évaluation',
      type: 'localizedText',
      group: 'evaluation'
    }),
    defineField({
      name: 'grades',
      title: 'Échelle de notes',
      type: 'array',
      group: 'evaluation',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'letter',
            title: 'Lettre',
            type: 'string',
            options: {
              list: [
                { title: 'A', value: 'A' },
                { title: 'B', value: 'B' },
                { title: 'C', value: 'C' },
                { title: 'D', value: 'D' },
              ]
            }
          },
          { name: 'description', title: 'Description', type: 'localizedString' }
        ],
        preview: {
          select: { letter: 'letter', description: 'description' },
          prepare({ letter, description }) {
            return { title: `${letter} - ${description?.fr || ''}` }
          }
        }
      }]
    }),

    // ===== COMPETENCIES =====
    defineField({
      name: 'competenciesTitle',
      title: 'Titre de la section Compétences',
      type: 'localizedString',
      group: 'competencies'
    }),
    defineField({
      name: 'competenciesSubtitle',
      title: 'Sous-titre de la section Compétences',
      type: 'localizedString',
      group: 'competencies'
    }),
    defineField({
      name: 'competencies',
      title: 'Liste des compétences',
      type: 'array',
      group: 'competencies',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Numéro', type: 'number' },
          { name: 'title', title: 'Titre de la compétence', type: 'localizedString' },
          {
            name: 'items',
            title: 'Critères',
            type: 'array',
            of: [{ type: 'localizedString' }]
          }
        ],
        preview: {
          select: { number: 'number', title: 'title' },
          prepare({ number, title }) {
            return { title: `${number}. ${title?.fr || ''}` }
          }
        }
      }]
    }),

    // ===== DAILY SCHEDULE =====
    defineField({
      name: 'scheduleTitle',
      title: 'Titre de la section Horaire',
      type: 'localizedString',
      group: 'schedule'
    }),
    defineField({
      name: 'scheduleDescription',
      title: 'Description de l\'horaire',
      type: 'localizedText',
      group: 'schedule'
    }),
    defineField({
      name: 'scheduleNote',
      title: 'Note (encadré jaune)',
      type: 'localizedString',
      group: 'schedule'
    }),

    // ===== CONTACT CTA =====
    defineField({
      name: 'contactTitle',
      title: 'Titre de la section Contact',
      type: 'localizedString',
      group: 'contact'
    }),
    defineField({
      name: 'contactDescription',
      title: 'Description du contact',
      type: 'localizedString',
      group: 'contact'
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Programme Préscolaire' }
    }
  }
})