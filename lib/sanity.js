import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'col2tg5g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  ignoreBrowserTokenWarning: true,
  perspective: 'published'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)