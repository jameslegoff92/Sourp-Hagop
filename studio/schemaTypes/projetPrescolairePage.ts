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
      type: 'string',
      group: 'header'
    }),
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 4,
      group: 'header'
    }),

    // ===== ACTIVITIES =====
    defineField({
      name: 'activitiesTitle',
      title: 'Titre de la section Activités',
      type: 'string',
      group: 'activities'
    }),
    defineField({
      name: 'activitiesDescription',
      title: 'Description des activités',
      type: 'text',
      rows: 3,
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
          { name: 'title', title: 'Nom de l\'activité', type: 'string' }
        ],
        preview: {
          select: { title: 'title', media: 'icon' },
          prepare({ title, media }) {
            return { title, media }
          }
        }
      }]
    }),

    // ===== SPECIALIZED COURSES =====
    defineField({
      name: 'coursesTitle',
      title: 'Titre de la section Cours',
      type: 'string',
      group: 'courses'
    }),
    defineField({
      name: 'coursesDescription',
      title: 'Description des cours',
      type: 'text',
      rows: 3,
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
          { name: 'title', title: 'Nom du cours', type: 'string' },
          { name: 'hours', title: 'Durée (ex: 120 min/semaine)', type: 'string' },
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
          select: { emoji: 'emoji', title: 'title', hours: 'hours' },
          prepare({ emoji, title, hours }) {
            return { title: `${emoji} ${title}`, subtitle: hours }
          }
        }
      }]
    }),

    // ===== EVALUATION =====
    defineField({
      name: 'evaluationTitle',
      title: 'Titre de la section Évaluation',
      type: 'string',
      group: 'evaluation'
    }),
    defineField({
      name: 'evaluationDescription',
      title: 'Description du système d\'évaluation',
      type: 'text',
      rows: 4,
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
          { name: 'description', title: 'Description', type: 'string' }
        ],
        preview: {
          select: { letter: 'letter', description: 'description' },
          prepare({ letter, description }) {
            return { title: `${letter} - ${description}` }
          }
        }
      }]
    }),

    // ===== COMPETENCIES =====
    defineField({
      name: 'competenciesTitle',
      title: 'Titre de la section Compétences',
      type: 'string',
      group: 'competencies'
    }),
    defineField({
      name: 'competenciesSubtitle',
      title: 'Sous-titre de la section Compétences',
      type: 'string',
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
          { name: 'title', title: 'Titre de la compétence', type: 'string' },
          {
            name: 'items',
            title: 'Critères',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ],
        preview: {
          select: { number: 'number', title: 'title' },
          prepare({ number, title }) {
            return { title: `${number}. ${title}` }
          }
        }
      }]
    }),

    // ===== DAILY SCHEDULE =====
    defineField({
      name: 'scheduleTitle',
      title: 'Titre de la section Horaire',
      type: 'string',
      group: 'schedule'
    }),
    defineField({
      name: 'scheduleDescription',
      title: 'Description de l\'horaire',
      type: 'text',
      rows: 3,
      group: 'schedule'
    }),
    defineField({
      name: 'scheduleNote',
      title: 'Note (encadré jaune)',
      type: 'string',
      group: 'schedule'
    }),

    // ===== CONTACT CTA =====
    defineField({
      name: 'contactTitle',
      title: 'Titre de la section Contact',
      type: 'string',
      group: 'contact'
    }),
    defineField({
      name: 'contactDescription',
      title: 'Description du contact',
      type: 'string',
      group: 'contact'
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Programme Préscolaire' }
    }
  }
})