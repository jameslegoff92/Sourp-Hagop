import { defineType, defineField, defineArrayMember } from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Texte localisé',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'fr', title: 'Français 🇫🇷', type: 'string' }),
    defineField({ name: 'hy', title: 'Հայերէն 🇦🇲', type: 'string' }),
  ],
  preview: {
    select: { title: 'fr' }
  }
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Texte long localisé',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français 🇫🇷', type: 'text' }),
    defineField({ name: 'hy', title: 'Հայերէն 🇦🇲', type: 'text' }),
  ],
  preview: {
    select: { title: 'fr' }
  }
})

// Block config is the union of every rich-text config already in use across
// the schema (the richest being protecteurNationalPage's) - bullet/numbered
// lists, bold/italic/superscript, and a link annotation. A field that never
// needed lists or links simply won't use them; this is a capability ceiling,
// not a requirement. See docs/adr/0001-architecture-i18n.md.
const richBlockMember = defineArrayMember({
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' }
  ],
  marks: {
    decorators: [
      { title: 'Bold', value: 'strong' },
      { title: 'Italic', value: 'em' },
      { title: 'Superscript', value: 'sup' }
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
          { name: 'href', type: 'url', title: 'URL' }
        ]
      }
    ]
  }
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
      of: [richBlockMember]
    }),
    defineField({
      name: 'hy',
      title: 'Հայերէն 🇦🇲',
      type: 'array',
      of: [richBlockMember]
    }),
  ]
})