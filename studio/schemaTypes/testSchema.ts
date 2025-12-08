import { defineType } from 'sanity';

export default defineType({
  name: 'testDocument',
  title: 'Test Document',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
});