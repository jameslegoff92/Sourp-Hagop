import { defineType, defineField, defineArrayMember } from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Texte localisé',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'fr', title: 'Français 🇫🇷', type: 'string' }),
    defineField({ name: 'hy', title: 'Հայերէն 🇦🇲', type: 'string' }),
  ]
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Texte long localisé',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français 🇫🇷', type: 'text' }),
    defineField({ name: 'hy', title: 'Հայերէն 🇦🇲', type: 'text' }),
  ]
})

export const localizedBlock = defineType({
  name: 'localizedBlock',
  title: 'Contenu riche localisé',
  type: 'object',
  fields: [
    defineField({
      name: 'fr',
      title: 'Français 🇫🇷',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'hy',
      title: 'Հայերէն 🇦🇲',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
  ]
})