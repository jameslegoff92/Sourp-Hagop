import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import structure from './structure'

export default defineConfig({
  name: 'default',
  title: 'Sourp Hagop',

  projectId: 'col2tg5g',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: structure,
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})
