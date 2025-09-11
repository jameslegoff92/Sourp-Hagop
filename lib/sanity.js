import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'col2tg5g',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  ignoreBrowserTokenWarning: true,
  perspective: 'published'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)