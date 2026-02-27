export default {
  name: "protecteurNationalPage",
  title: "Protecteur National de l'Élève",
  type: "document",
  fields: [
    {
      name: "pageHeader",
      title: "Entête",
      type: "object",
      fields: [
        {
          name: "headerImage",
          title: "Image d'entête",
          type: "image",
          options: { hotspot: true }
        },
        {
          name: "headerText",
          title: "Texte de l'entête",
          type: "string",
          initialValue: "PROTECTEUR NATIONAL DE L'ÉLÈVE"
        }
      ]
    },
    {
      name: "mainTitle",
      title: "Titre principal",
      type: "string",
      initialValue: "Processus de traitement des plaintes"
    },
    {
      name: "introText",
      title: "Texte d'introduction",
      type: "text"
    },
    {
      name: "infoSections",
      title: "Sections d'information",
      description: "Sections comme 'Qu'est-ce que le PNE?', 'Quel est le rôle du PNE?'",
      type: "array",
      of: [
        {
          type: "object",
          name: "infoSection",
          title: "Section d'information",
          fields: [
            {
              name: "title",
              title: "Titre",
              type: "string"
            },
            {
              name: "content",
              title: "Contenu",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Numbered", value: "number" }
                  ],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                      { title: "Superscript", value: "sup" }
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          { name: "href", type: "url", title: "URL" }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          ],
          preview: {
            select: { title: "title" }
          }
        }
      ]
    },
    {
      name: "stepsTitle",
      title: "Titre de la section des étapes",
      type: "string",
      initialValue: "Comment déposer une plainte ?"
    },
    {
      name: "stepsIntro",
      title: "Introduction des étapes",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" }
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Superscript", value: "sup" }
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      name: "etapes",
      title: "Étapes",
      type: "array",
      of: [
        {
          type: "object",
          name: "etape",
          title: "Étape",
          fields: [
            {
              name: "stepNumber",
              title: "Numéro de l'étape",
              type: "number"
            },
            {
              name: "title",
              title: "Titre de l'étape",
              type: "string"
            },
            {
              name: "paragraphs",
              title: "Paragraphes (boîtes bleues)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Texte",
                      type: "array",
                      of: [
                        {
                          type: "block",
                          styles: [{ title: "Normal", value: "normal" }],
                          lists: [
                            { title: "Bullet", value: "bullet" },
                            { title: "Numbered", value: "number" }
                          ],
                          marks: {
                            decorators: [
                              { title: "Bold", value: "strong" },
                              { title: "Italic", value: "em" },
                              { title: "Superscript", value: "sup" }
                            ],
                            annotations: [
                              {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                  { name: "href", type: "url", title: "URL" }
                                ]
                              }
                            ]
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "contactPerson",
              title: "Personne de contact pour les plaintes",
              type: "object",
              fields: [
                { name: "name", title: "Nom", type: "string" },
                { name: "role", title: "Rôle", type: "string" },
                { name: "email", title: "Email", type: "string" }
              ]
            }
          ],
          preview: {
            select: { title: "title", stepNumber: "stepNumber" },
            prepare({ title, stepNumber }) {
              return {
                title: `Étape ${stepNumber}: ${title}`
              }
            }
          }
        }
      ]
    },
    {
      name: "formButton",
      title: "Bouton formulaire",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Texte du bouton",
          type: "string",
          initialValue: "Formulaire de plainte"
        },
        {
          name: "link",
          title: "Lien",
          type: "url",
          initialValue: "https://pne.gouv.qc.ca/formulaire"
        }
      ]
    },
    {
      name: "processImage",
      title: "Image du processus",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "additionalSections",
      title: "Sections additionnelles",
      description: "Sections après les étapes (violence sexuelle, représailles, etc.)",
      type: "array",
      of: [
        {
          type: "object",
          name: "additionalSection",
          title: "Section additionnelle",
          fields: [
            {
              name: "title",
              title: "Titre",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Superscript", value: "sup" }
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          { name: "href", type: "url", title: "URL" }
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            {
              name: "paragraphs",
              title: "Paragraphes",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Texte",
                      type: "array",
                      of: [
                        {
                          type: "block",
                          styles: [{ title: "Normal", value: "normal" }],
                          lists: [
                            { title: "Bullet", value: "bullet" },
                            { title: "Numbered", value: "number" }
                          ],
                          marks: {
                            decorators: [
                              { title: "Bold", value: "strong" },
                              { title: "Italic", value: "em" },
                              { title: "Superscript", value: "sup" }
                            ],
                            annotations: [
                              {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                  { name: "href", type: "url", title: "URL" }
                                ]
                              }
                            ]
                          }
                        }
                      ]
                    },
                    {
                      name: "isHighlighted",
                      title: "Boîte bleue?",
                      type: "boolean",
                      initialValue: false
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              const plainText = title?.[0]?.children?.[0]?.text || "Section"
              return { title: plainText }
            }
          }
        }
      ]
    },
    {
      name: "contactInfo",
      title: "Informations de contact PNE",
      type: "object",
      fields: [
        {
          name: "formUrl",
          title: "URL du formulaire",
          type: "string",
          initialValue: "pne.gouv.qc.ca/formulaire"
        },
        {
          name: "phone",
          title: "Téléphone",
          type: "string",
          initialValue: "1 833 420-5233"
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          initialValue: "plaintes-pne@pne.gouv.qc.ca"
        }
      ]
    },
    {
      name: "footnote",
      title: "Note de bas de page",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Superscript", value: "sup" }
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" }
                ]
              }
            ]
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "pageHeader.headerText",
      media: "pageHeader.headerImage"
    }
  }
}