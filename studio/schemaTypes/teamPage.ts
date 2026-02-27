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
      type: "string",
      initialValue: "CONSEIL D'ÉTUDIANTS"
    },
    defineField({
      name: "introText",
      title: "Introduction Text",
      type: "text",
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
              type: "string",
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
                    defineField({ name: "name", title: "Name", type: "string" }),
                    defineField({ name: "title", title: "Job Title", type: "string" }),
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                      options: { hotspot: true },
                    }),
                  ],
                  preview: {
                    select: { title: "name", subtitle: "title", media: "image" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "messageText",
      title: "Message Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "joinUsText",
      title: "Rejoignez-nous Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
