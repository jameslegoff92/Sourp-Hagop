import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'primaire',
  title: 'Programme Primaire',
  type: 'document',
  fields: [
    defineField({
      name: 'headerImage',
      title: "Image de l'entête",
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headerText',
      title: "Texte de l'entête",
      type: 'localizedString',
    }),
    defineField({
      name: 'introText',
      title: "Texte d'introduction",
      type: 'localizedText',
    }),
    defineField({
      name: 'cycles',
      title: 'Les Cycles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom', type: 'localizedString' },
            { name: 'grades', title: 'Années', type: 'localizedString' },
            { name: 'description', title: 'Description', type: 'localizedText' },
            {
              name: 'image',
              title: 'Image de fond',
              type: 'image',
              options: { hotspot: true }
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'grades', media: 'image' },
            prepare({ title, subtitle, media }) {
              return { title: title?.fr || 'Sans nom', subtitle: subtitle?.fr, media }
            }
          }
        },
      ],
    }),
    defineField({
      name: 'languages',
      title: 'Langues',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'language', title: 'Langue', type: 'localizedString' },
            {
              name: 'type',
              title: 'Type (pour la couleur)',
              type: 'string',
              options: {
                list: [
                  { title: 'Français (bleu)', value: 'french' },
                  { title: 'Anglais (vert)', value: 'english' },
                  { title: 'Arménien (rouge)', value: 'armenian' },
                ],
              },
            },
            { name: 'description', title: 'Description', type: 'localizedText' },
          ],
          preview: {
            select: { title: 'language', subtitle: 'description' },
            prepare({ title, subtitle }) {
              return { title: title?.fr || 'Sans langue', subtitle: subtitle?.fr }
            }
          }
        },
      ],
    }),
    defineField({
      name: 'enrichmentTitle',
      title: 'Enrichissement - Titre',
      type: 'localizedString',
    }),
    defineField({
      name: 'enrichmentContent',
      title: 'Enrichissement - Contenu',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'subjectAreasTitle',
      title: "Domaines d'apprentissage - Titre",
      type: 'localizedString',
    }),
    defineField({
      name: 'subjectAreasText',
      title: "Description",
      type: 'localizedText',
    }),
    defineField({
      name: 'subjectAreas',
      title: "Domaines d'apprentissage matière",
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),
    defineField({
      name: 'artsTitle',
      title: 'Arts - Titre',
      type: 'localizedString',
    }),
    defineField({
      name: 'artsContent',
      title: 'Arts - Contenu',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'maquetteTitle',
      title: 'Maquette - Titre',
      type: 'localizedString',
    }),
    defineField({
      name: 'maquetteContent',
      title: 'Maquette - Contenu',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'horaireTitre',
      title: 'Note de Contact',
      type: 'localizedText',
    }),
  ],
  preview: {
    select: {
      title: 'headerText',
      media: 'headerImage',
    },
    prepare({ title, media }) {
      return { title: title?.fr || 'Programme Primaire', media };
    },
  },
});