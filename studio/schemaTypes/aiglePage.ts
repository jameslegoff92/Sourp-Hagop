export default {
  name: "aiglePage",
  title: "Aigles Page",
  type: "document",
  fields: [
    {
      name: "headerImage",
      title: "Image d’en-tête",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "headerText",
      title: "Texte de l’en-tête",
      type: "string",
      initialValue: "ÉQUIPE DES AIGLES"
    },
    {
      name: "introTitle",
      title: "Titre d’introduction",
      type: "string"
    },
    {
      name: "introText",
      title: "Texte d’introduction",
      type: "text"
    },
    {
      name: "images",
      title: "Images (5)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: Rule => Rule.length(5) // exactly 5
    }
  ],
  preview: {
    select: {
      title: "introTitle",
      media: "headerImage"
    }
  }
}
