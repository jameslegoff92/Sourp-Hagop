// schemas/comiteParentsPage.js
export default {
  name: 'comiteParentsPage',
  title: 'Comité de Parents',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'localizedString',
      initialValue: { fr: 'Comité de Parents' },
    },
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
      initialValue: { fr: 'COMITÉ DE PARENTS' },
    },
    {
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'localizedString',
              validation: Rule => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'localizedText',
              validation: Rule => Rule.required(),
            },
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              position: 'imagePosition',
            },
            prepare({ title, media, position }) {
              return {
                title: title?.fr || 'Sans titre',
                subtitle: `Image position: ${position}`,
                media: media,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'pageTitle',
      media: 'headerImage',
    },
    prepare({ title, media }) {
      return {
        title: title?.fr || 'Comité de Parents',
        media,
      };
    },
  },
};