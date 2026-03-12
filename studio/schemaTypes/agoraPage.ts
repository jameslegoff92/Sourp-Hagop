import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'agoraPage',
  title: 'Page Agora',
  type: 'document',
  groups: [
    { name: 'header', title: 'En-tête' },
    { name: 'content', title: 'Contenu' },
    { name: 'menuPrimaire', title: 'Menu Primaire' },
    { name: 'menuSecondaire', title: 'Menu Secondaire' },
  ],
  fields: [
    // Header
    defineField({
      name: 'headerVideo',
      title: 'Vidéo d\'en-tête',
      type: 'file',
      options: { accept: 'video/*' },
      group: 'header',
    }),
    defineField({
      name: 'headerImage',
      title: 'Image d\'en-tête (fallback)',
      type: 'image',
      options: { hotspot: true },
      group: 'header',
    }),
    defineField({
      name: 'headerText',
      title: 'Texte d\'en-tête',
      type: 'string',
      group: 'header',
    }),

    // Content
    defineField({
      name: 'mainTitle',
      title: 'Titre principal',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'menuCallToAction',
      title: 'Texte d\'appel à l\'action',
      type: 'string',
      group: 'content',
    }),

    // Menu Primaire
    defineField({
      name: 'dessertNotePrimaire',
      title: 'Note desserts (Primaire)',
      type: 'text',
      rows: 2,
      group: 'menuPrimaire',
    }),
    defineField({
      name: 'primaireWeeks',
      title: 'Semaines - Primaire',
      type: 'array',
      group: 'menuPrimaire',
      of: [
        {
          type: 'object',
          name: 'week',
          title: 'Semaine',
          fields: [
            defineField({
              name: 'weekNumber',
              title: 'Numéro de semaine',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(10),
            }),
            defineField({
              name: 'meals',
              title: 'Repas (5 jours)',
              type: 'array',
              validation: (Rule) => Rule.required().length(5),
              of: [
                {
                  type: 'object',
                  name: 'meal',
                  fields: [
                    defineField({
                      name: 'day',
                      title: 'Jour',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Lundi', value: 'lundi' },
                          { title: 'Mardi', value: 'mardi' },
                          { title: 'Mercredi', value: 'mercredi' },
                          { title: 'Jeudi', value: 'jeudi' },
                          { title: 'Vendredi', value: 'vendredi' },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: { hotspot: true },
                    }),
                  ],
                  preview: {
                    select: { title: 'day', subtitle: 'description', media: 'image' },
                    prepare({ title, subtitle, media }) {
                      const days = { lundi: 'Lundi', mardi: 'Mardi', mercredi: 'Mercredi', jeudi: 'Jeudi', vendredi: 'Vendredi' };
                      return { title: days[title] || title, subtitle, media };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { weekNumber: 'weekNumber' },
            prepare({ weekNumber }) {
              return { title: `Semaine ${weekNumber}` };
            },
          },
        },
      ],
    }),

    // Menu Secondaire
    defineField({
      name: 'dessertNoteSecondaire',
      title: 'Note desserts (Secondaire)',
      type: 'text',
      rows: 2,
      group: 'menuSecondaire',
    }),
    defineField({
      name: 'secondaireWeeks',
      title: 'Semaines - Secondaire',
      type: 'array',
      group: 'menuSecondaire',
      of: [
        {
          type: 'object',
          name: 'week',
          title: 'Semaine',
          fields: [
            defineField({
              name: 'weekNumber',
              title: 'Numéro de semaine',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(10),
            }),
            defineField({
              name: 'meals',
              title: 'Repas (5 jours)',
              type: 'array',
              validation: (Rule) => Rule.required().length(5),
              of: [
                {
                  type: 'object',
                  name: 'meal',
                  fields: [
                    defineField({
                      name: 'day',
                      title: 'Jour',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Lundi', value: 'lundi' },
                          { title: 'Mardi', value: 'mardi' },
                          { title: 'Mercredi', value: 'mercredi' },
                          { title: 'Jeudi', value: 'jeudi' },
                          { title: 'Vendredi', value: 'vendredi' },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: { hotspot: true },
                    }),
                  ],
                  preview: {
                    select: { title: 'day', subtitle: 'description', media: 'image' },
                    prepare({ title, subtitle, media }) {
                      const days = { lundi: 'Lundi', mardi: 'Mardi', mercredi: 'Mercredi', jeudi: 'Jeudi', vendredi: 'Vendredi' };
                      return { title: days[title] || title, subtitle, media };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { weekNumber: 'weekNumber' },
            prepare({ weekNumber }) {
              return { title: `Semaine ${weekNumber}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page Agora' };
    },
  },
});