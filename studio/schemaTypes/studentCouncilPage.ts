export default {
  name: "studentCouncilPage",
  title: "Conseil étudiant",
  type: "document",
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
      initialValue: { fr: "CONSEIL D'ÉTUDIANTS" }
    },
    {
      name: "introTitle",
      title: "Titre d’introduction",
      type: "localizedString"
    },
    {
      name: "introText",
      title: "Texte d’introduction",
      type: "localizedText"
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
    },
    prepare({ title, media }) {
      return { title: title?.fr || "Conseil étudiant", media }
    }
  }
}