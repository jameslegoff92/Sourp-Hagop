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
          title: "Image d'entête",
          type: "image",
          options: { hotspot: true }
        },
        {
          name: "headerText",
          title: "Texte de l'entête",
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
      name: "visionSection",
      title: "Notre vision",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Notre vision"
        },
        {
          name: "introText",
          title: "Texte d'introduction",
          type: "text",
          initialValue: "En vue de mener à bien notre mission, nous favorisons la création d'une communauté d'apprentissage où les enseignants et les autres membres du personnel :"
        },
        {
          name: "items",
          title: "Points de vision",
          type: "array",
          of: [
            {
              type: "object",
              name: "visionItem",
              title: "Point de vision",
              fields: [
                {
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                  description: "Image de fond pour la carte"
                },
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                  description: "Mot-clé affiché sur la carte (ex: Collaboration, Bien-être)"
                },
                {
                  name: "text",
                  title: "Description",
                  type: "text",
                  description: "Texte complet qui apparaît au survol"
                }
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "text",
                  media: "image"
                }
              }
            }
          ]
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
                  title: "Taille de l'icône (ex: 80px)",
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
    },
    {
      name: "orientationsSection",
      title: "Orientations générales",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Orientations générales"
        },
        {
          name: "introText",
          title: "Texte d'introduction",
          type: "text",
          initialValue: "Les orientations générales de l'École arménienne Sourp Hagop sont les suivantes :"
        },
        {
          name: "items",
          title: "Orientations",
          type: "array",
          of: [
            {
              type: "object",
              name: "orientationItem",
              title: "Orientation",
              fields: [
                {
                  name: "text",
                  title: "Texte",
                  type: "text"
                }
              ],
              preview: {
                select: { title: "text" }
              }
            }
          ]
        }
      ]
    },
    {
      name: "sloganSection",
      title: "Notre slogan",
      type: "object",
      fields: [
        {
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Notre slogan"
        },
        {
          name: "line1",
          title: "Première ligne",
          type: "string",
          initialValue: "Toujours plus haut,"
        },
        {
          name: "line2",
          title: "Deuxième ligne",
          type: "string",
          initialValue: "Toujours plus loin!"
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