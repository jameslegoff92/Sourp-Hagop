import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'alertBanner',
  title: 'Bannière d\'alerte',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Activer la bannière',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'type',
      title: 'Type d\'alerte',
      type: 'string',
      options: {
        list: [
          { title: '❄️ Journée de neige', value: 'snow' },
          { title: '🚨 Urgence', value: 'emergency' },
          { title: 'ℹ️ Information', value: 'info' },
          { title: '🎉 Événement', value: 'event' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'link',
      title: 'Lien (optionnel)',
      type: 'object',
      fields: [
        { name: 'text', title: 'Texte du lien', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début (optionnel)',
      type: 'datetime',
      description: 'La bannière s\'affichera À PARTIR de cette date. Laisser vide pour afficher immédiatement.',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin (optionnel)',
      type: 'datetime',
      description: 'La bannière se cachera APRÈS cette date. Laisser vide pour aucune expiration.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      type: 'type',
    },
    prepare({ title, isActive, type }) {
      const typeIcons = {
        snow: '❄️',
        emergency: '🚨',
        info: 'ℹ️',
        event: '🎉',
      };
      return {
        title: `${typeIcons[type] || ''} ${title}`,
        subtitle: isActive ? '✅ Active' : '❌ Inactive',
      };
    },
  },
});