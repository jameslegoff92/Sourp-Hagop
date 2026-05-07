import {defineType, defineField, defineArrayMember} from 'sanity'

const SECTION_LABELS: Record<string, string> = {
  intro: 'Introduction générale',
  description: 'Description du poste',
  profil: 'Profil cherché',
  responsabilites: 'Principales responsabilités',
  conditions: 'Conditions de travail et avantages',
  exigences: 'Exigences',
  autre: 'Information additionnelle',
}

export default defineType({
  name: 'careerPage',
  title: 'Carrières',
  type: 'document',
  fields: [
    defineField({
      name: 'headerImage',
      title: "Image d'entête",
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'headerText',
      title: "Texte d'entête",
      type: 'localizedString'
    }),
    defineField({
      name: 'introText',
      title: "Texte d'introduction",
      type: 'localizedBlock'
    }),
    defineField({
      name: 'applicationNote',
      title: 'Note de bas de page (modale)',
      type: 'localizedString'
    }),
    defineField({
      name: 'jobs',
      title: "Offres d'emploi",
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'job',
          title: 'Offre',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre du poste',
              type: 'localizedString',
              validation: r => r.required()
            }),
            defineField({
              name: 'level',
              title: 'Niveau',
              type: 'string',
              options: {list: ['Préscolaire', '1er cycle du primaire', '2e cycle du primaire', '3e cycle du primaire', '1er cycle du secondaire', '2e cycle du secondaire', 'Administration']}
            }),
            defineField({
              name: 'type',
              title: "Type d'emploi",
              type: 'string',
              options: {list: ['Temps plein', 'Temps plein - Permanent', 'Temps plein - Temporaire', 'Temps partiel', 'Temps partiel - Permanent', 'Temps partiel - Temporaire', 'Contrat', 'Stage']}
            }),
            defineField({
              name: 'location',
              title: 'Lieu(x)',
              type: 'string',
              options: {
                list: [
                  {title: 'École arménienne Sourp Hagop', value: 'École arménienne Sourp Hagop'},
                  {title: 'En ligne', value: 'En ligne'},
                  {title: 'Hybride', value: 'Hybride'},
                ]
              }
            }),
            defineField({
              name: 'deadline',
              title: 'Date limite pour postuler',
              type: 'date',
              options: {dateFormat: 'YYYY-MM-DD'}
            }),
            defineField({
              name: 'shortDescription',
              title: 'Description courte',
              type: 'localizedBlock'
            }),
            defineField({
              name: 'sections',
              title: 'Sections de la description',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'section',
                  fields: [
                    defineField({
                      name: 'sectionType',
                      title: 'Type de section',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'INTRODUCTION', value: 'intro'},
                          {title: 'DESCRIPTION DU POSTE', value: 'description'},
                          {title: 'PROFIL CHERCHÉ', value: 'profil'},
                          {title: 'PRINCIPALES RESPONSABILITÉS', value: 'responsabilites'},
                          {title: 'CONDITIONS DE TRAVAIL ET AVANTAGES', value: 'conditions'},
                          {title: 'EXIGENCES', value: 'exigences'},
                          {title: 'Information additionnelle (titre personnalisé)', value: 'autre'},
                        ]
                      },
                      validation: r => r.required()
                    }),
                    defineField({
                      name: 'customTitle',
                      title: 'Titre personnalisé',
                      type: 'localizedString',
                      hidden: ({parent}) => parent?.sectionType !== 'autre'
                    }),
                    defineField({
                      name: 'content',
                      title: 'Contenu',
                      type: 'localizedBlock'
                    }),
                  ],
                  preview: {
                    select: {
                      sectionType: 'sectionType',
                      customTitle: 'customTitle',
                    },
                    prepare({sectionType, customTitle}) {
                      return {
                        title: sectionType === 'autre'
                          ? customTitle?.fr || 'Information additionnelle'
                          : SECTION_LABELS[sectionType] || sectionType
                      }
                    }
                  }
                })
              ]
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
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'level',
              media: 'image'
            },
            prepare({title, subtitle, media}) {
              return {
                title: title?.fr || 'Sans titre',
                subtitle,
                media
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'headerText',
      media: 'headerImage'
    },
    prepare({title, media}) {
      return {
        title: title?.fr || 'Carrières',
        media
      }
    }
  }
})