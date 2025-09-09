export default {
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  fields: [
    // Page Header
    {
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      fields: [
        {
          name: 'headerImage',
          title: 'Header Image',
          type: 'image',
          description: 'Background image for the header',
          options: {
            hotspot: true
          }
        }
      ]
    },

    // Timeline Events
    {
      name: 'timelineEvents',
      title: 'Timeline Events',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'timelineEvent',
          title: 'Timeline Event',
          fields: [
            {
              name: 'date',
              title: 'Date/Year',
              type: 'string',
              description: 'Year or date of the event (e.g., "1974", "2024")',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Event Title',
              type: 'string',
              description: 'Title of the historical event',
              validation: Rule => Rule.required().max(120)
            },
            {
              name: 'description',
              title: 'Event Description',
              type: 'text',
              description: 'Detailed description of the event',
              validation: Rule => Rule.required().min(50).max(500)
            },
            {
              name: 'image',
              title: 'Event Image',
              type: 'image',
              description: 'Historical photo or image related to this event',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this event appears on the timeline',
              validation: Rule => Rule.required().min(1)
            }
          ],
          preview: {
            select: {
              title: 'date',
              subtitle: 'title',
              media: 'image'
            },
            prepare(selection) {
              const {title, subtitle, media} = selection
              return {
                title: `${title} - ${subtitle}`,
                subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No title',
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(20)
    }
  ],

  // Auto-sort timeline events by display order
  orderings: [
    {
      title: 'Timeline Order',
      name: 'timelineOrder',
      by: [
        {field: 'timelineEvents.displayOrder', direction: 'asc'}
      ]
    }
  ],

  preview: {
    select: {
      title: 'pageHeader.headerText',
      eventsCount: 'timelineEvents'
    },
    prepare(selection) {
      const {title, eventsCount} = selection
      const eventCount = eventsCount ? eventsCount.length : 0
      return {
        title: 'History Page',
        subtitle: title ? `${title} | Events: ${eventCount}` : 'No header text set'
      }
    }
  }
}