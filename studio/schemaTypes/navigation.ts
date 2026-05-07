import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Navigation principale',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre de la section',
              type: 'localizedString'
            }),
            defineField({
              name: 'items',
              title: 'Liens',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'navItem',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Texte du lien',
                      type: 'localizedString'
                    }),
                    defineField({
                      name: 'link',
                      title: 'URL',
                      type: 'string'
                    }),
                    defineField({
                      name: 'external',
                      title: 'Lien externe',
                      type: 'boolean',
                      initialValue: false
                    }),
                  ],
                  preview: {
                    select: { title: 'text', subtitle: 'link' },
                    prepare({ title, subtitle }) {
                      return { title: title?.fr || 'Sans titre', subtitle }
                    }
                  }
                })
              ]
            }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title?.fr || 'Sans titre' }
            }
          }
        })
      ]
    }),
    defineField({
      name: 'quickLinks',
      title: 'Accès rapide',
      description: 'Liens affichés en bas du menu mobile et dans la barre supérieure',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quickLink',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'localizedString'
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string'
            }),
            defineField({
              name: 'external',
              title: 'Lien externe',
              type: 'boolean',
              initialValue: false
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
            prepare({ title, subtitle }) {
              return { title: title?.fr || 'Sans titre', subtitle }
            }
          }
        })
      ]
    }),
    defineField({
      name: 'portalLabel',
      title: 'Texte du bouton Portail',
      type: 'localizedString'
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' })
  }
})