export default {
  name: "uniformPage",
  title: "Uniform Page",
  type: "document",
  fields: [
    {
      name: "headerImage",
      title: "Image d’en-tête",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "title",
      title: "Titre principal",
      type: "string",
      initialValue: "Service uniforme"
    },
    {
      name: "introText",
      title: "Texte d’introduction",
      type: "text"
    },
    {
      name: "partner",
      title: "Partenaire",
      type: "object",
      fields: [
        { name: "name", title: "Nom", type: "string" },
        { name: "logo", title: "Logo", type: "image", options: { hotspot: true } },
        { 
            name: "website", 
            title: "Site Web (ex: www.topmarks.com)", 
            type: "string",
            validation: Rule => Rule.regex(/^www\./, {
                name: "www",
                invert: false
        }).warning("Commencez l’adresse par www.")
        },
        { name: "phone", title: "Téléphone", type: "string" },
        { name: "email", title: "Courriel", type: "string" }
      ]
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "partner.name",
      media: "headerImage"
    }
  }
};
