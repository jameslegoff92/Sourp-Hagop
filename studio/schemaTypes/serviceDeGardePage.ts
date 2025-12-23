export default {
  name: 'serviceDeGardePage',
  title: 'Service de Garde',
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
      initialValue: 'SERVICE DE GARDE',
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            {
              name: 'sectionType',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Introduction', value: 'introduction' },
                  { title: 'Pricing', value: 'pricing' },
                  { title: 'Student Process', value: 'studentProcess' },
                  { title: 'Parent Process', value: 'parentProcess' },
                  { title: 'Important Info', value: 'importantInfo' },
                ],
                layout: 'dropdown',
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'text',
              rows: 5,
            },
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: {
                hotspot: true,
              },
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
            // For pricing section
            {
              name: 'pricingItems',
              title: 'Pricing Items',
              type: 'array',
              hidden: ({ parent }) => parent?.sectionType !== 'pricing',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'price',
                      title: 'Price',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
            {
              name: 'pricingNote',
              title: 'Pricing Note',
              type: 'text',
              rows: 2,
              hidden: ({ parent }) => parent?.sectionType !== 'pricing',
            },
            // For student process section
            {
              name: 'processSteps',
              title: 'Process Steps',
              type: 'array',
              hidden: ({ parent }) => parent?.sectionType !== 'studentProcess',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'stepNumber',
                      title: 'Step Number',
                      type: 'number',
                    },
                    {
                      name: 'stepContent',
                      title: 'Step Content',
                      type: 'text',
                      rows: 2,
                    },
                  ],
                },
              ],
            },
            // For important info section
            {
              name: 'contactInfo',
              title: 'Contact Information',
              type: 'object',
              hidden: ({ parent }) => parent?.sectionType !== 'importantInfo',
              fields: [
                {
                  name: 'email',
                  title: 'Email',
                  type: 'string',
                },
                {
                  name: 'phone',
                  title: 'Phone',
                  type: 'string',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              type: 'sectionType',
              media: 'image',
            },
            prepare({ title, type, media }) {
              return {
                title: title || 'Untitled Section',
                subtitle: type,
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
      title: 'headerText',
      media: 'headerImage',
    },
  },
};