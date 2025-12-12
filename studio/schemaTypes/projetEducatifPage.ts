export default {
  name: "projetEducatifPage",
  title: "Projet éducatif",
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
          initialValue: "PROJET ÉDUCATIF"
        }
      ]
    },
    {
      name: "missionSection",
      title: "Notre mission",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Notre Mission"
        },
        {
          name: "text",
          title: "Texte",
          type: "text"
        }
      ]
    },
    {
      name: "engagementsSection",
      title: "Nos engagements",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Nos engagements"
        },
        {
          name: "items",
          title: "Engagements",
          type: "array",
          of: [
            {
              type: "object",
              name: "engagementItem",
              title: "Engagement",
              fields: [
                {
                  name: "icon",
                  title: "Icône",
                  type: "image",
                  options: { hotspot: true }
                },
                {
                  name: "title",
                  title: "Titre",
                  type: "string"
                },
                {
                  name: "text",
                  title: "Texte",
                  type: "text"
                },
                {
                  name: "iconSize",
                  title: "Taille de l’icône (ex: 80px)",
                  type: "string",
                  initialValue: "80px"
                }
              ],
              preview: {
                select: { title: "title", subtitle: "text", media: "icon" }
              }
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "pageHeader.headerText",
      media: "pageHeader.headerImage"
    }
  }
}
