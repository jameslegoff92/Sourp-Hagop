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
// the schema - bullet/numbered lists, bold/italic/superscript, a link
// annotation, and Heading 4/5 styles. The heading styles come from
// careerPage/teamPage content authored under main's own pre-existing
// localizedBlock (deployed to production directly, May 2026) - phase 5A's
// original inventory was repo-only and couldn't see that content, so it
// missed them; found and added 2026-09-09 via a direct production-data
// audit. A field that never needed lists, links, or headings simply won't
// use them; this is a capability ceiling, not a requirement. See
// docs/adr/0001-architecture-i18n.md, section 7.
const richBlockMember = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'Heading 4', value: 'h4' },
    { title: 'Heading 5', value: 'h5' }
  ],
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