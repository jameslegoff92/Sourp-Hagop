import { IMAGE_LAYOUT_OPTIONS } from "../../lib/imageLayoutOptions";

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
      title: "Texte de l’entête",
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
    },
    {
      name: "imageLayout",
      title: "Disposition des images",
      description: "Consultez le guide visuel : https://sourp-hagop.sanity.studio/static/layout-guide.png",
      type: "string",
      options: {
        list: IMAGE_LAYOUT_OPTIONS,
        layout: "radio",
      },
      initialValue: "leftPillar",
    },
  ],
  preview: {
    select: {
      title: "introTitle",
      media: "headerImage"
    }
  }
}
