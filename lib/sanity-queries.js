import { client } from './sanity'

// Home Page
export async function getHomePage() {
  return client.fetch(
    `*[_type == "homePage"][0] {
      heroVideo{ asset->{ url } },
      introSection { title, content },
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
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// History Page
export async function getHistoryPage() {
  return client.fetch(
    `*[_type == "historyPage"][0] {
      pageHeader { "headerImageUrl": headerImage.asset->url },
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
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Team Page
export async function getTeamPage() {
  return client.fetch(
    `*[_type == "teamPage"][0] {
      title,
      backgroundLogo{asset->{"url": url}},
      header{
        animate,
        text,
        textTop,
        image{asset->{"url": url}}
      },
      intro,
      accordion[]{ title, content },
      cta{ label, href }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Career Page
export async function getCareerPage() {
  return client.fetch(
    `*[_type=="careerPage"][0]{
      pageTitle,
      headerImage{asset->{ "url": url }},
      headerText,
      introText,
      jobs[] {
        title,
        level,
        type,
        location,
        description,
        tags,
        image{asset->{ "url": url }},
        postsAvailable
      }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Uniform Page
export async function getUniformePage() {
  return client.fetch(
    `*[_type == "uniformPage"][0] {
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
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Student Council Page
export async function getStudentCouncilPage() {
  return client.fetch(
    `*[_type == "studentCouncilPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introTitle,
      introText,
      images[] { "url": asset->url }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Aigle Page
export async function getAiglePage() {
  return client.fetch(
    `*[_type == "aiglePage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introTitle,
      introText,
      images[] { "url": asset->url }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Trips Page
export async function getTripsPage() {
  return client.fetch(
    `*[_type == "tripsPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introTitle,
      introText,
      images[] { "url": asset->url }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Library Page
/* export async function getLibraryPage() {
  return client.fetch(
    `*[_type == "libraryPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introTitle,
      introText,
      images[] { "url": asset->url }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
} */

export async function getLibraryPage() {
  return client.fetch(
    `*[_type == "libraryPage"][0]{
      headerImage,
      headerText,
      introText
    }`
  )
}

// Rental spaces page
export async function getRentalSpacesPage() {
  return client.fetch(
    `*[_type == "rentalSpacesPage"][0] {
      headerText,
      "headerImageUrl": headerImage.asset->url,
        introText,
        spaces[] {
        title,
        description,
        "imageUrl": image.asset->url,
        images[] { "url": asset->url },
        details[] { label, value }
      }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

