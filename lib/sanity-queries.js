import { client } from './sanity'

// Home Page
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

// History Page
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
      },
      timelineSettings {
        progressBarColor,
        circleColor,
        dateTextColor
      }
    }
  `)
}

export async function getTeamPage() {
  return await client.fetch(`
    *[_type == "teamPage"][0] {
      title,
      backgroundLogo{asset->{"url": url}},
      header{
        animate,
        text,
        textTop,
        image{asset->{"url": url}}
      },
      intro,
      accordion[]{
        title,
        content
      },
      cta{
        label,
        href
      }
    }
  `)
}

export async function getCareerPage() {
  return client.fetch(`
    *[_type=="careerPage"][0]{
      pageTitle,
      headerImage{asset->{ "url": url }},
      headerText,
      introText,
      jobs[]{
        title,
        level,
        type,
        location,
        description,
        tags,
        image{asset->{ "url": url }},
        postsAvailable
      }
    }
  `);
}
