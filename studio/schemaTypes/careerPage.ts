import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'careerPage',
  title: 'Career Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Image d’en-tête',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'headerText',
      title: 'Texte d’en-tête',
      type: 'string'
    }),
    defineField({
      name: 'introText',
      title: 'Texte d’introduction',
      type: 'array',
      of: [defineArrayMember({type: 'block'})]
    }),
    defineField({
      name: 'jobs',
      title: 'Offres d’emploi',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'job',
          title: 'Offre',
          fields: [
            defineField({name: 'title', title: 'Titre du poste', type: 'string', validation: r => r.required()}),
            defineField({
              name: 'level',
              title: 'Niveau',
              type: 'string',
              options: {list: ['Préscolaire', '1er cycle du primaire', '2e cycle du primaire', '3e cycle du primaire', '1er cycle du secondaire', '2e cycle du secondaire', 'Administration']}
            }),
            defineField({
              name: 'type',
              title: 'Type d’emploi',
              type: 'string',
              options: {list: ['Temps plein', 'Temps plein - Permanent', 'Temps plein - Temporaire', 'Temps partiel', 'Temps partiel - Permanent', 'Temps partiel - Temporaire', 'Contrat', 'Stage']}
            }),
            defineField({name: 'location', title: 'Lieu', type: 'string'}),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [defineArrayMember({type: 'block'})]
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true}
            }),
            defineField({
              name: 'postsAvailable',
              title: 'Nombre de postes disponibles',
              type: 'number',
              initialValue: 1
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'level',
              media: 'image'
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'pageTitle',
      media: 'headerImage'
    }
  }
})
