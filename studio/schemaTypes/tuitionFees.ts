export default {
  name: "tuitionFees",
  title: "Droits de scolarité et autres frais",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      description: "Ex: Droits d'inscription – payable à la date d'inscription",
    },
    {
      name: "prescolaire",
      title: "Préscolaire",
      type: "string",
    },
    {
      name: "primaire",
      title: "Primaire",
      type: "string",
    },
    {
      name: "secondaire",
      title: "Secondaire",
      type: "string",
    },
    {
      name: "isHeader",
      title: "Est un en-tête ?",
      type: "boolean",
    },
    {
      name: "isTotal",
      title: "Est un total ?",
      type: "boolean",
    },
    {
      name: "isSpecial",
      title: "Est spécial ?",
      type: "boolean",
    },
  ],
};
