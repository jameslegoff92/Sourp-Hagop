export default {
  name: "crealabPage",
  title: "Créalab",
  type: "document",
  fields: [
    {
      name: "heroVideo",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
    },
    {
      name: "headerText",
      title: "Texte de l’en-tête",
      type: "string",
      initialValue: "CRÉALAB"
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
