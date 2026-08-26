export default {
  name: 'anciensPage',
  title: 'Anciens et Anciennes',
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
      type: 'localizedString',
      initialValue: { fr: 'ANCIENS ET ANCIENNES' },
    },
    {
      name: 'mainTitle',
      title: 'Main Title',
      type: 'localizedString',
      initialValue: { fr: 'Que signifie être un ancien de Sourp Hagop ?' },
    },
    {
      name: 'mainContent',
      title: 'Main Content',
      type: 'localizedText',
    },
    {
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'localizedString',
      initialValue: { fr: 'La mission des anciens élèves de Sourp Hagop' },
    },
    {
      name: 'missionContent',
      title: 'Mission Content',
      type: 'localizedText',
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: Rule => Rule.max(5).required(),
    },
    {
      name: 'callToActionTitle',
      title: 'Call to Action Title',
      type: 'localizedString',
      initialValue: { fr: "Heureux de votre parcours ? Venez partager votre passion et expérience avec nos jeunes en quête d'avenir." },
    },
    {
      name: 'callToActionTextPart1',
      title: 'Call to Action Text - Part 1',
      type: 'localizedString',
      initialValue: { fr: 'Restons connectés ! Partagez vos coordonnées via ce' },
    },
    {
      name: 'formLinkText',
      title: 'Form Link Text',
      type: 'localizedString',
      initialValue: { fr: 'FORMULAIRE' },
    },
    {
      name: 'formLink',
      title: 'Form Link URL',
      type: 'url',
    },
    {
      name: 'callToActionTextPart2',
      title: 'Call to Action Text - Part 2',
      type: 'localizedString',
      initialValue: { fr: 'et suivez-nous sur les réseaux sociaux pour ne rien manquer.' },
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headerText',
      media: 'headerImage',
    },
    prepare({ title, media }) {
      return {
        title: title?.fr || 'Anciens et Anciennes',
        media,
      };
    },
  },
};