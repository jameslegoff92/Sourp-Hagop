export default {
  name: "administrationPage",
  title: "Conseil d’administration",
  type: "document",
  fields: [
    {
      name: "pageHeader",
      title: "Entête",
      type: "object",
      fields: [
        {
          name: "headerImage",
          title: "Image d’entête",
          type: "image",
          options: { hotspot: true }
        },
        {
          name: "headerText",
          title: "Texte de l’entête",
          type: "localizedString",
          initialValue: { fr: "CONSEIL ADMINISTRATION" }
        }
      ]
    },
    {
      name: "roleSection",
      title: "Rôle et responsabilités",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Titre",
          type: "localizedString",
          initialValue: { fr: "Rôle et Responsabilités" }
        },
        {
          name: "content",
          title: "Texte",
          type: "localizedText"
        }
      ]
    },
    {
      name: "members",
      title: "Membres",
      type: "array",
      of: [
        {
          type: "object",
          name: "boardMember",
          title: "Membre",
          fields: [
            { name: "name", title: "Prénom et Nom", type: "localizedString" },
            { name: "title", title: "Description", type: "localizedString" },
            {
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true }
            },
          ],
          preview: {
            select: { title: "name", subtitle: "title", media: "image" },
            prepare({ title, subtitle, media }) {
              return {
                title: title?.fr || "Sans nom",
                subtitle: subtitle?.fr,
                media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1)
    }
  ],
  preview: {
    select: {
      title: "pageHeader.headerText",
      media: "pageHeader.headerImage"
    },
    prepare({ title, media }) {
      return {
        title: title?.fr || "Conseil d’administration",
        media
      }
    }
  }
}