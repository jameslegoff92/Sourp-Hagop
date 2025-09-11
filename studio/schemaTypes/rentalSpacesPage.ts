export default {
  name: "rentalSpacesPage",
  title: "Rental Spaces Page",
  type: "document",
  fields: [
    {
      name: "headerImage",
      title: "Image d'en-tête",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "headerText",
      title: "Texte d'en-tête",
      type: "string",
    },
    {
      name: "spaces",
      title: "Espaces à louer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Titre",
              type: "string",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
