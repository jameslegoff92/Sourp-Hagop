import { client } from './sanity'

// Home Page
export async function getHomePage() {
  return await client.fetch(`
    *[_type == "homePage"][0] {
      heroVideo{
        asset->{
          url
        }
      },
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

// Uniform Page
export async function getUniformePage() {
  return await client.fetch(`
    *[_type == "uniformPage"][0] {
      headerImage{asset->{url}},
      headerText,
      title,
      introText,
      partner {
        name,
        "logoUrl": logo.asset->url,
        website,
        phone,
        email
      }
  }
  `);
}

// Student Council Page
export async function getStudentCouncilPage() {
  return await client.fetch(`
    *[_type == "studentCouncilPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introTitle,
      introText,
      images[] {
        "url": asset->url
      }
    }
  `)
}

// Aigle Page
export async function getAiglePage() {
  return await client.fetch(`
    *[_type == "aiglePage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introTitle,
      introText,
      images[] {
        "url": asset->url
      }
    }
  `)
}

// Trips Page
export async function getTripsPage() {
  return await client.fetch(`
    *[_type == "tripsPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introTitle,
      introText,
      images[] {
        "url": asset->url
      }
    }
  `)
}


