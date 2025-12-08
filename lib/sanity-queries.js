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
      headerImage {
        asset->{
          url
        }
      },
      headerText,
      introText,
      categories[] {
        title,
        staff[] {
          name,
          title,
          "imageUrl": image.asset->url
        }
      }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Prescolaire Page
export async function getPrescolairePage() {
  return client.fetch(
    `*[_type == "prescolaire"][0]{
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introText,
      activitiesTitle,
      activitiesDescription,
      activities[] { "iconUrl": icon.asset->url, title },
      coursesTitle,
      coursesDescription,
      specializedCourses[] { "iconUrl": icon.asset->url, title, hours, color },
      evaluationTitle,
      evaluationDescription,
      grades[] { letter, description },
      competenciesTitle,
      competenciesSubtitle,
      competencies[] { number, title, items },
      scheduleTitle,
      scheduleDescription,
      scheduleNote,
      contactTitle,
      contactDescription
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Primaire Page
export async function getPrimairePage() {
  return client.fetch(
    `*[_type == "primaire"][0]{
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introText,
      cycles[] {
        name,
        grades,
        description,
        "imageUrl": image.asset->url
      },
      languages[] {
        language,
        type,
        description,
        "imageUrl": image.asset->url
      },
      enrichmentTitle,
      enrichmentContent,
      subjectAreasTitle,
      subjectAreasText,
      subjectAreas,
      artsTitle,
      artsContent,
      maquetteTitle,
      maquetteContent,
      horaireTitle
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

// Jardin Littéraire Page
export async function getJardinLitterairePage() {
  return client.fetch(
    `*[_type == "jardinLitterairePage"][0] {
      heroVideo{ asset->{ url } },
      headerText,
      introTitle,
      introText,
      images[] { "url": asset->url }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Créalab Page
export async function getCrealabPage() {
  return client.fetch(
    `*[_type == "crealabPage"][0] {
      heroVideo{ asset->{ url } },
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

// Pourquoi Sourp Hagop Page
export async function getPourquoiPage() {
  return client.fetch(
    `*[_type == "pourquoi"][0]{
      "headerImageUrl": headerImage.asset->url,
      headerText,
      popupEnabled,
      popupTitle,
      popupText,
      popupDateStart,
      popupDateEnd,
      popupButtonLink,
      introText,
      sections[] {
        title,
        description,
        "imageUrl": image.asset->url,
        imagePosition
      },
      footerText,
      footerDateStart,
      footerDateEnd,
      footerLinkText,
      footerLink
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

