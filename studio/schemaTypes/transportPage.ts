// schemas/transportPage.js
export default {
  name: 'transportPage',
  title: 'Transport',
  type: 'document',
  fields: [
    {
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'headerText',
      title: 'Header Text',
      type: 'localizedString',
      initialValue: { fr: 'Service de Transport' },
    },
    {
      name: 'mapTitle',
      title: 'Map Title',
      type: 'localizedString',
      initialValue: { fr: 'Plan des zones couvertes par le transport scolaire' },
    },
    {
      name: 'introText',
      title: 'Introduction Text',
      type: 'localizedText',
    },
    {
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'localizedString',
      initialValue: { fr: 'Pour plus d\'information veuillez contacter le responsable du service de transport' },
    },
    {
      name: 'contactName',
      title: 'Contact Name',
      type: 'localizedString',
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'contactExtension',
      title: 'Contact Extension',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'headerText',
      media: 'headerImage',
    },
    prepare({ title, media }) {
      return { title: title?.fr || 'Transport', media };
    },
  },
};