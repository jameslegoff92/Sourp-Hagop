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
          type: "string",
          initialValue: "CONSEIL ADMINISTRATION"
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
          type: "string",
          initialValue: "Rôle et Responsabilités"
        },
        {
          name: "content",
          title: "Texte",
          type: "text"
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
            { name: "name", title: "Prénom et Nom", type: "string" },
            { name: "title", title: "Description", type: "string" },
            {
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true }
            },
          ],
          preview: {
            select: { title: "name", subtitle: "title", media: "image" }
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
    }
  }
}
