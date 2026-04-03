export default {
  name: 'calendarPage',
  title: 'Calendrier',
  type: 'document',
  fields: [
    {
      name: 'headerText',
      title: 'Header Text',
      type: 'string',
      initialValue: 'CALENDRIER',
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
      type: 'string',
      initialValue: 'Calendrier',
    },
  ],
  preview: {
    select: { title: 'pageTitle', media: 'headerImage' },
  },
}