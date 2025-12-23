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
      type: 'string',
      initialValue: 'Service de Transport',
    },
    {
      name: 'mapTitle',
      title: 'Map Title',
      type: 'string',
      initialValue: 'Plan des zones couvertes par le transport scolaire',
    },
    {
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 5,
    },
    {
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'string',
      initialValue: 'Pour plus d\'information veuillez contacter le responsable du service de transport',
    },
    {
      name: 'contactName',
      title: 'Contact Name',
      type: 'string',
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
  },
};