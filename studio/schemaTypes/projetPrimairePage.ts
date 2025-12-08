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
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: "Texte d'introduction",
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'cycles',
      title: 'Les Cycles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom', type: 'string' },
            { name: 'grades', title: 'Années', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'image',
              title: 'Image de fond',
              type: 'image',
              options: { hotspot: true }
            },
          ],
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
            { name: 'language', title: 'Langue', type: 'string' },
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
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'enrichmentTitle',
      title: 'Enrichissement - Titre',
      type: 'string',
    }),
    defineField({
      name: 'enrichmentContent',
      title: 'Enrichissement - Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'subjectAreasTitle',
      title: "Domaines d'apprentissage - Titre",
      type: 'string',
    }),
    defineField({
      name: 'subjectAreasText',
      title: "Description",
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'subjectAreas',
      title: "Domaines d'apprentissage matière",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'artsTitle',
      title: 'Arts - Titre',
      type: 'string',
    }),
    defineField({
      name: 'artsContent',
      title: 'Arts - Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'maquetteTitle',
      title: 'Maquette - Titre',
      type: 'string',
    }),
    defineField({
      name: 'maquetteContent',
      title: 'Maquette - Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'horaireTitre',
      title: 'Note de Contact',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'headerText',
      media: 'headerImage',
    },
  },
});