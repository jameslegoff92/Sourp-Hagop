export default {
  name: "rentalSpacesPage",
  title: "Locations",
  type: "document",
  fields: [
    {
      name: "headerImage",
      title: "Image d'entête",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "headerText",
      title: "Texte d'entête",
      type: "localizedString",
    },
    {
      name: "introText",
      title: "Texte d'intro",
      type: "localizedText",
    },
    {
      name: "spaces",
      title: "Espaces à louer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titre", type: "localizedString" },
            {
              name: "image",
              title: "Image de couverture",
              type: "image",
              options: { hotspot: true },
            },
            { name: "description", title: "Description", type: "localizedText" },

            // carousel images
            {
              name: "images",
              title: "Images du carrousel",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            },

            // details (label + text)
            {
              name: "details",
              title: "Détails",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "localizedString" },
                    { name: "value", title: "Texte", type: "localizedString" },
                  ],
                  preview: {
                    select: { title: "label", subtitle: "value" },
                    prepare({ title, subtitle }) {
                      return { title: title?.fr || "Sans label", subtitle: subtitle?.fr }
                    }
                  }
                },
              ],
            },
          ],
          preview: {
            select: { title: "title", media: "image" },
            prepare({ title, media }) {
              return { title: title?.fr || "Sans titre", media }
            }
          }
        },
      ],
    },
  ],
};