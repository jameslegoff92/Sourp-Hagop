import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'teamPage',
  title: 'Team Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre interne',
      type: 'string',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'backgroundLogo',
      title: 'Background Logo',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'header',
      title: 'En-tête',
      type: 'object',
      fields: [
        defineField({name: 'animate', title: 'Animer', type: 'boolean', initialValue: false}),
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'text', title: 'Texte', type: 'string'}),
        defineField({name: 'textTop', title: 'Position du texte (ex: 70%)', type: 'string'})
      ]
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [defineArrayMember({type: 'block'})]
    }),
    defineField({
      name: 'accordion',
      title: 'Sections Accordion',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'accordionSection',
          fields: [
            defineField({name: 'title', title: 'Titre', type: 'string'}),
            defineField({
              name: 'content',
              title: 'Contenu',
              type: 'array',
              of: [defineArrayMember({type: 'block'})]
            })
          ],
          preview: {
            select: {title: 'title'}
          }
        })
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Bouton CTA',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Libellé', type: 'string', initialValue: 'Appliquer Maintenant'}),
        defineField({name: 'href', title: 'Lien', type: 'url'})
      ]
    })
  ],
  preview: {
    select: {title: 'title', media: 'header.image'}
  }
})
