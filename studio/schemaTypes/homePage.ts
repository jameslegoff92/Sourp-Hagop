export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [

    // Video Section
    {
      name: "heroVideo",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
    },

    // Intro Section
    {
      name: 'introSection',
      title: 'Intro Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Content Text',
          type: 'text',
          description: 'The paragraph text below the title',
          validation: Rule => Rule.required()
        }
      ]
    },
    
    // Values Section
    {
      name: 'valuesSection',
      title: 'Values Section',
      type: 'object',
      fields: [
        {
          name: 'values',
          title: 'Values',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'value',
              title: 'Value',
              fields: [
                {
                  name: 'title',
                  title: 'Value Title',
                  type: 'string',
                  description: 'Name of the value (e.g., "Respect", "Responsabilité")',
                  validation: Rule => Rule.required().max(100)
                },
                {
                  name: 'text',
                  title: 'Description',
                  type: 'text',
                  description: 'Detailed explanation of this value',
                  validation: Rule => Rule.required().min(10).max(500)
                },
                {
                  name: 'image',
                  title: 'Value Image',
                  type: 'image',
                  description: 'Image representing this value (487px X 600px)',
                  options: {
                    hotspot: true
                  },
                  validation: Rule => Rule.required()
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'text',
                  media: 'image'
                },
                prepare(selection) {
                  const {title, subtitle, media} = selection
                  return {
                    title: title,
                    subtitle: subtitle ? subtitle.substring(0, 60) + '...' : 'No description',
                    media: media
                  }
                }
              }
            }
          ],
          validation: Rule => Rule.required().min(1).max(6)
        }
      ]
    },

    // Strengths Section
    {
      name: 'strengthsSection',
      title: 'Strengths Section',
      type: 'object',
      fields: [
        {
          name: 'strengths',
          title: 'Strengths',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'strength',
              title: 'Strength',
              fields: [
                {
                  name: 'title',
                  title: 'Strength Title',
                  type: 'string',
                  description: 'Name of the strength (e.g., "Collaboration d\'équipe")',
                  validation: Rule => Rule.required().max(100)
                },
                {
                  name: 'text',
                  title: 'Description',
                  type: 'text',
                  description: 'Brief explanation of this strength',
                  validation: Rule => Rule.required().min(10).max(200)
                },
                {
                  name: 'image',
                  title: 'Strength Image',
                  type: 'image',
                  description: 'Background image for this strength (462px X 408px)',
                  options: {
                    hotspot: true
                  },
                  validation: Rule => Rule.required()
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'text',
                  media: 'image'
                },
                prepare(selection) {
                  const {title, subtitle, media} = selection
                  return {
                    title: title,
                    subtitle: subtitle ? subtitle.substring(0, 40) + '...' : 'No description',
                    media: media
                  }
                }
              }
            }
          ],
          validation: Rule => Rule.required().min(1).max(12)
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'introSection.title',
      valuesCount: 'valuesSection.values',
      strengthsCount: 'strengthsSection.strengths'
    },
    prepare(selection) {
      const {title, valuesCount, strengthsCount} = selection
      const valueCount = valuesCount ? valuesCount.length : 0
      const strengthCount = strengthsCount ? strengthsCount.length : 0
      return {
        title: 'Home Page',
        subtitle: title ? `Intro: ${title} | Values: ${valueCount} | Strengths: ${strengthCount}` : 'No intro title set'
      }
    }
  }
}