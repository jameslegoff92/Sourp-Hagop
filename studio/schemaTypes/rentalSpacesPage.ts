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
      type: "string",
    },
    {
      name: "introText",
      title: "Texte d'intro",
      type: "text",
    },
    {
      name: "spaces",
      title: "Espaces à louer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            {
              name: "image",
              title: "Image de couverture",
              type: "image",
              options: { hotspot: true },
            },
            { name: "description", title: "Description", type: "text" },

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
                    { name: "label", title: "Label", type: "string" },
                    { name: "value", title: "Texte", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
