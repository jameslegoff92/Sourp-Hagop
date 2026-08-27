import { client } from './sanity'
import { localizedString, localizedText, localizedBlock, localizedStringArray } from './localizedFieldQuery'

// Alert Banner
export async function getAlertBanner(locale) {
  return client.fetch(
    `*[_type == "alertBanner" && isActive == true][0]{
      type,
      "title": ${localizedString('title')},
      "message": ${localizedText('message')},
      "link": {
        "text": ${localizedString('link.text')},
        "url": link.url
      },
      startDate,
      endDate
    }`,
    { locale },
    { next: { revalidate: 60 } }
  )
}

// Home Page
export async function getHomePage(locale) {
  return client.fetch(
    `*[_type == "homePage"][0] {
      heroVideo{ asset->{ url } },
      introSection { "title": ${localizedString('title')}, "content": ${localizedText('content')} },
      valuesSection {
        values[] {
          _id,
          "title": ${localizedString('title')},
          "text": ${localizedText('text')},
          "imageUrl": image.asset->url
        }
      },
      strengthsSection {
        sectionTitle,
        strengths[] {
          _id,
          "title": ${localizedString('title')},
          "text": ${localizedText('text')},
          "imageUrl": image.asset->url
        }
      }
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

// History Page
export async function getHistoryPage(locale) {
  return client.fetch(
    `*[_type == "historyPage"][0] {
      pageHeader { "headerImageUrl": headerImage.asset->url },
      timelineEvents[] | order(displayOrder asc) {
        _id,
        date,
        "title": ${localizedString('title')},
        "description": ${localizedText('description')},
        "imageUrl": image.asset->url,
        displayOrder
      },
      timelineSettings {
        progressBarColor,
        circleColor,
        dateTextColor
      }
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

// Team Page
export async function getTeamPage(locale) {
  return client.fetch(
    `*[_type == "teamPage"][0] {
      headerImage {
        asset->{
          url
        }
      },
      "headerText": ${localizedString('headerText')},
      "introText": ${localizedText('introText')},
      categories[] {
        "title": ${localizedString('title')},
        staff[] {
          "name": ${localizedString('name')},
          "title": ${localizedString('title')},
          "imageUrl": image.asset->url
        }
      },
      "messageText": ${localizedBlock('messageText')},
      "joinUsText": ${localizedBlock('joinUsText')}
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

// Administration
export async function getAdministrationPage(locale) {
  return client.fetch(
    `*[_type == "administrationPage"][0]{
      pageHeader{
        "headerImageUrl": headerImage.asset->url,
        "headerText": ${localizedString('headerText')},
      },
      roleSection{
        "title": ${localizedString('title')},
        "content": ${localizedText('content')}
      },
      members[]{
        "name": ${localizedString('name')},
        "title": ${localizedString('title')},
        "imageUrl": image.asset->url
      }
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

// Projet Educatif
export async function getProjetEducatifPage(locale) {
  return client.fetch(
    `*[_type == "projetEducatifPage"][0]{
      pageHeader{
        "headerImageUrl": headerImage.asset->url,
        "headerText": ${localizedString('headerText')}
      },
      missionSection{
        "title": ${localizedString('title')},
        "text": ${localizedText('text')}
      },
      visionSection{
        "title": ${localizedString('title')},
        "introText": ${localizedText('introText')},
        items[]{
          "imageUrl": image.asset->url,
          "label": ${localizedString('label')},
          "text": ${localizedText('text')}
        }
      },
      engagementsSection{
        "title": ${localizedString('title')},
        items[]{
          "title": ${localizedString('title')},
          "text": ${localizedText('text')},
          iconSize,
          "iconUrl": icon.asset->url
        }
      },
      orientationsSection{
        "title": ${localizedString('title')},
        "introText": ${localizedText('introText')},
        items[]{
          "text": ${localizedText('text')}
        }
      },
      sloganSection{
        "label": ${localizedString('label')},
        "line1": ${localizedString('line1')},
        "line2": ${localizedString('line2')}
      }
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

// Comité des Parents Page
export async function getComiteParentsPage(locale) {
  return client.fetch(
    `*[_type == "comiteParentsPage"][0]{
      "pageTitle": ${localizedString('pageTitle')},
      "headerImageUrl": headerImage.asset->url,
      "headerText": ${localizedString('headerText')},
      sections[]{
        "title": ${localizedString('title')},
        "content": ${localizedText('content')},
        "imageUrl": image.asset->url,
        imagePosition
      }
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

// Anciens Page
export async function getAnciensPage(locale) {
  return client.fetch(
    `*[_type == "anciensPage"][0]{
      "headerImageUrl": headerImage.asset->url,
      "headerText": ${localizedString('headerText')},
      "mainTitle": ${localizedString('mainTitle')},
      "mainContent": ${localizedText('mainContent')},
      "missionTitle": ${localizedString('missionTitle')},
      "missionContent": ${localizedText('missionContent')},
      galleryImages[]{
        "url": asset->url
      },
      "callToActionTitle": ${localizedString('callToActionTitle')},
      "callToActionTextPart1": ${localizedString('callToActionTextPart1')},
      "formLinkText": ${localizedString('formLinkText')},
      formLink,
      "callToActionTextPart2": ${localizedString('callToActionTextPart2')},
      socialMedia{
        facebook,
        instagram,
        linkedin
      },
      "backgroundLogoUrl": backgroundLogo.asset->url
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

// Protecteur National Page
export async function getProtecteurNationalPage(locale) {
  return client.fetch(
    `*[_type == "protecteurNationalPage"][0]{
      pageHeader{
        "headerImageUrl": headerImage.asset->url,
        "headerText": ${localizedString('headerText')}
      },
      "mainTitle": ${localizedString('mainTitle')},
      "introText": ${localizedText('introText')},
      infoSections[]{
        "title": ${localizedString('title')},
        "content": ${localizedBlock('content')}
      },
      "stepsTitle": ${localizedString('stepsTitle')},
      "stepsIntro": ${localizedBlock('stepsIntro')},
      etapes[]{
        stepNumber,
        "title": ${localizedString('title')},
        paragraphs[]{
          "text": ${localizedBlock('text')}
        },
        contactPerson{
          "name": ${localizedString('name')},
          "role": ${localizedString('role')},
          email
        }
      },
      formButton{
        "text": ${localizedString('text')},
        link
      },
      "processImageUrl": processImage.asset->url,
      additionalSections[]{
        "title": ${localizedBlock('title')},
        paragraphs[]{
          "text": ${localizedBlock('text')},
          isHighlighted
        }
      },
      contactInfo{
        formUrl,
        phone,
        email
      },
      "footnote": ${localizedBlock('footnote')}
    }`,
    { locale },
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

// Secondaire Page
export async function getSecondairePage() {
  return client.fetch(
    `*[_type == "secondaire"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introText,
      cyclesTitle,
      cycles[] {
        name,
        grades,
        focus,
        description,
        "imageUrl": image.asset->url
      },
      pedagogyTitle,
      pedagogyContent,
      enrichedTitle,
      enrichedIntro,
      enrichedCourses[] {
        subject,
        levels,
        description,
        type
      },
      optionsTitle,
      optionsIntro,
      programOptions[] {
        title,
        description,
        target,
        type
      },
      activitiesTitle,
      activitiesIntro,
      activities,
      activitiesNote,
      maquetteTitle,
      maquetteContent,
      maquetteNote
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Career Page
export async function getCareerPage(locale) {
  return client.fetch(
    `*[_type=="careerPage"][0]{
      "headerImage": headerImage{ asset->{ url } },
      "headerText": ${localizedString('headerText')},
      "introText": ${localizedBlock('introText')},
      "applicationNote": ${localizedString('applicationNote')},
      jobs[] {
        _key,
        "title": ${localizedString('title')},
        level,
        type,
        location,
        deadline,
        postsAvailable,
        "shortDescription": ${localizedBlock('shortDescription')},
        sections[] {
          _key,
          sectionType,
          "customTitle": ${localizedString('customTitle')},
          "content": ${localizedBlock('content')}
        },
        "image": image{ asset->{ url } }
      }
    }`,
    { locale },
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

// Soutien Page
export async function getSoutienPage() {
  return client.fetch(
    `*[_type == "soutienPage"][0]{
      "headerImageUrl": headerImage.asset->url,
      headerText,
      mainTitle,
      introText,
      accordionItems[]{
        title,
        content
      }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Agora Page
export async function getAgoraPage() {
  return client.fetch(
    `*[_type == "agoraPage"][0]{
      "headerVideoUrl": headerVideo.asset->url,
      "headerImageUrl": headerImage.asset->url,
      headerText,
      mainTitle,
      introText,
      menuCallToAction,
      dessertNotePrimaire,
      dessertNoteSecondaire,
      "primaireWeeks": primaireWeeks[] | order(weekNumber asc) {
        weekNumber,
        "meals": meals[]{
          day,
          description,
          "imageUrl": image.asset->url
        }
      },
      "secondaireWeeks": secondaireWeeks[] | order(weekNumber asc) {
        weekNumber,
        "meals": meals[]{
          day,
          description,
          "imageUrl": image.asset->url
        }
      }
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
      images[] { "url": asset->url },
      imageLayout,
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Service de Garde Page
export async function getServiceDeGardePage() {
  return client.fetch(
    `*[_type == "serviceDeGardePage"][0]{
      "headerImageUrl": headerImage.asset->url,
      headerText,
      sections[]{
        sectionType,
        title,
        content,
        "imageUrl": image.asset->url,
        imagePosition,
        pricingItems[]{
          price,
          description
        },
        pricingNote,
        processSteps[]{
          stepNumber,
          stepContent
        },
        contactInfo{
          email,
          phone
        }
      }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

export async function getTransportPage() {
  return client.fetch(
    `*[_type == "transportPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      mapTitle,
      introText,
      contactTitle,
      contactName,
      contactPhone,
      contactExtension
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

// Admissions Page
export async function getAdmissionsPage() {
  return client.fetch(
    `*[_type == "admissionsPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      "prescolairePrimaire": {
        "title": prescolairePrimaireTitle,
        "subtitle": prescolairePrimaireSubtitle,
        "text": prescolairePrimaireText,
        "buttonText": prescolairePrimaireButtonText,
        "link": prescolairePrimaireLink
      },
      "secondaire": {
        "title": secondaireTitle,
        "subtitle": secondaireSubtitle,
        "text": secondaireText,
        "buttonText": secondaireButtonText,
        "link": secondaireLink
      }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Tuition Fees Page
export async function getTuitionFeesPage() {
  return client.fetch(
    `*[_type == "tuitionFeesPage"][0] {
      "headerImageUrl": headerImage.asset->url,
      headerText,
      introText,
      tableTitle,
      prescolaireLabel,
      primaireLabel,
      secondaireLabel,
      fees[] {
        category,
        prescolaire,
        primaire,
        secondaire,
        rowType
      }
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

// Calendar Page
export async function getCalendarPage(locale) {
  return client.fetch(
    `*[_type == "calendarPage"][0]{
      "pageTitle": ${localizedString('pageTitle')},
      "headerText": ${localizedString('headerText')},
      "headerImageUrl": headerImage.asset->url,
    }`,
    { locale },
    { next: { revalidate: 10 } }
  )
}

