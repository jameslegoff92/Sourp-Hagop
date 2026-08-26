import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamPage",
  title: "L'équipe",
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
    defineField({
      name: "introText",
      title: "Introduction Text",
      type: "localizedText",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "object",
          name: "staffCategory",
          title: "Staff Category",
          fields: [
            defineField({
              name: "title",
              title: "Category Title",
              type: "localizedString",
            }),
            defineField({
              name: "staff",
              title: "Staff Members",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "staffMember",
                  title: "Staff Member",
                  fields: [
                    defineField({ name: "name", title: "Name", type: "localizedString" }),
                    defineField({ name: "title", title: "Job Title", type: "localizedString" }),
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                      options: { hotspot: true },
                    }),
                  ],
                  preview: {
                    select: { title: "name", subtitle: "title", media: "image" },
                    prepare({ title, subtitle, media }) {
                      return { title: title?.fr || "Sans nom", subtitle: subtitle?.fr, media }
                    }
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title?.fr || "Sans titre" }
            }
          },
        },
      ],
    }),
    defineField({
      name: "messageText",
      title: "Message Text",
      type: "localizedBlock",
    }),
    defineField({
      name: "joinUsText",
      title: "Rejoignez-nous Text",
      type: "localizedBlock",
    }),
  ],
});