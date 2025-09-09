import { client } from './sanity'

export async function getHomePage() {
  return await client.fetch(`
    *[_type == "homePage"][0] {
      introSection {
        title,
        content
      },
      valuesSection {
        values[] {
          _id,
          title,
          text,
          "imageUrl": image.asset->url
        }
      },
      strengthsSection {
        sectionTitle,
        strengths[] {
          _id,
          title,
          text,
          "imageUrl": image.asset->url
        }
      }
    }
  `)
}

export async function getHistoryPage() {
  return await client.fetch(`
    *[_type == "historyPage"][0] {
      pageHeader {
        "headerImageUrl": headerImage.asset->url,
      },
      timelineEvents[] | order(displayOrder asc) {
        _id,
        date,
        title,
        description,
        "imageUrl": image.asset->url,
        displayOrder
      }
    }
  `)
}