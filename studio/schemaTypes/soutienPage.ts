export default {
  name: 'soutienPage',
  title: 'Soutien aux Élèves',
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
      initialValue: { fr: 'SOUTIEN AUX ÉLÈVES' },
    },
    {
      name: 'mainTitle',
      title: 'Main Title',
      type: 'localizedString',
      initialValue: { fr: 'Nos Services' },
    },
    {
      name: 'introText',
      title: 'Introduction Text',
      type: 'localizedText',
    },
    {
      name: 'accordionItems',
      title: 'Services (Accordion Items)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'accordionItem',
          title: 'Accordion Item',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'localizedString',
              validation: Rule => Rule.required(),
            },
            {
              name: 'content',
              title: 'Service Description',
              type: 'localizedText',
              validation: Rule => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'content',
            },
            prepare({ title, subtitle }) {
              return {
                title: title?.fr || 'Sans titre',
                subtitle: subtitle?.fr ? `${subtitle.fr.substring(0, 60)}...` : '',
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headerText',
      media: 'headerImage',
    },
    prepare({ title, media }) {
      return { title: title?.fr || 'Soutien aux Élèves', media };
    },
  },
};