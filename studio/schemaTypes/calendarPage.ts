export default {
  name: 'calendarPage',
  title: 'Calendrier',
  type: 'document',
  fields: [
    {
      name: 'headerText',
      title: 'Header Text',
      type: 'localizedString',
      initialValue: { fr: 'CALENDRIER' },
    },
    {
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'localizedString',
      initialValue: { fr: 'Calendrier' },
    },
  ],
  preview: {
    select: { title: 'pageTitle', media: 'headerImage' },
    prepare({ title, media }) {
      return { title: title?.fr || 'Calendrier', media };
    },
  },
}