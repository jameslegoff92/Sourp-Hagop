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
      type: 'string',
      initialValue: 'SOUTIEN AUX ÉLÈVES',
    },
    {
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Nos Services',
    },
    {
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 5,
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
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'content',
              title: 'Service Description',
              type: 'text',
              rows: 5,
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
                title: title,
                subtitle: subtitle ? `${subtitle.substring(0, 60)}...` : '',
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
  },
};