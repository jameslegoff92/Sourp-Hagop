// Migrates plain string/text/portable-text field VALUES into the localized
// object shape ({ fr: <existing value> }, hy key absent) that phase 5A's
// schema conversion (studio/schemaTypes/*.ts) already expects. The schema
// and the data are currently out of sync on purpose - see phase 5A step 2 -
// and this script is what reconciles them.
//
// Usage:
//   node scripts/migrate-localize-fields.mjs            # dry run (default, safe)
//   node scripts/migrate-localize-fields.mjs --apply     # actually writes
//
// Dataset is always "staging" unless MIGRATION_DATASET is set - there is
// deliberately no flag for this, so a typo can't send it to production.
// The client is constructed explicitly with {projectId, dataset} passed at
// the call site - never getCliClient() - and assertSafeForWrite() runs
// before anything else, logging the resolved dataset and proving live read
// access, exactly like lib/sanity-locale-fallback.test.js.
//
// Idempotent by construction: every leaf value is classified by its ACTUAL
// shape (plain / already-localized / unexpected / absent) before touching
// it, never by a fixed list of "fields I've already done". A second run
// finds everything already-localized and produces zero patches.

import { createClient } from "@sanity/client";
import { assertSafeForWrite } from "./sanity-write-guard.mjs";

const PROJECT_ID = "col2tg5g";
const DATASET = process.env.MIGRATION_DATASET || "staging";
const APPLY = process.argv.includes("--apply");

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false,
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_WRITE_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const SANITY_TYPE_NAME = {
  string: "localizedString",
  text: "localizedText",
  block: "localizedBlock",
};

// ============================================================================
// MANIFEST — one entry per field approved in the phase 5A step 1 inventory,
// plus the 11 fields already migrated in phase 4 (navigation, careerPage),
// included so the shape-detector proves it correctly skips them rather than
// double-wrapping. This is the same 219-entry total reported in the dry run:
// 208 new (201 originally inventoried + 4 proper-name overrides approved
// after that inventory - administrationPage.members.name,
// teamPage staff.name, protecteurNationalPage contactPerson.name,
// transportPage.contactName - net +3 from the data-check reversals on
// pourquoiPage's four date fields (+4) and serviceDeGardePage.pricingItems
// .price (-1)) + 11 already-localized.
//
// '[]' in a path means "iterate this array"; targetType is
// 'string' | 'text' | 'block' | 'stringArray' (the last for the three plain
// string arrays converted to of:[{type:'localizedString'}]).
// ============================================================================
const MANIFEST = [
  // --- navigation (already migrated, phase 4) ---
  ["navigation", ["mainNav", "[]", "title"], "string"],
  ["navigation", ["mainNav", "[]", "items", "[]", "text"], "string"],
  ["navigation", ["quickLinks", "[]", "title"], "string"],
  ["navigation", ["portalLabel"], "string"],

  // --- careerPage (already migrated, phase 4) ---
  ["careerPage", ["headerText"], "string"],
  ["careerPage", ["introText"], "block"],
  ["careerPage", ["applicationNote"], "string"],
  ["careerPage", ["jobs", "[]", "title"], "string"],
  ["careerPage", ["jobs", "[]", "shortDescription"], "block"],
  ["careerPage", ["jobs", "[]", "sections", "[]", "customTitle"], "string"],
  ["careerPage", ["jobs", "[]", "sections", "[]", "content"], "block"],

  // --- alertBanner ---
  ["alertBanner", ["title"], "string"],
  ["alertBanner", ["message"], "text"],
  ["alertBanner", ["link", "text"], "string"],

  // --- homePage ---
  ["homePage", ["introSection", "title"], "string"],
  ["homePage", ["introSection", "content"], "text"],
  ["homePage", ["valuesSection", "values", "[]", "title"], "string"],
  ["homePage", ["valuesSection", "values", "[]", "text"], "text"],
  ["homePage", ["strengthsSection", "strengths", "[]", "title"], "string"],
  ["homePage", ["strengthsSection", "strengths", "[]", "text"], "text"],

  // --- historyPage ---
  ["historyPage", ["timelineEvents", "[]", "title"], "string"],
  ["historyPage", ["timelineEvents", "[]", "description"], "text"],

  // --- administrationPage ---
  ["administrationPage", ["pageHeader", "headerText"], "string"],
  ["administrationPage", ["roleSection", "title"], "string"],
  ["administrationPage", ["roleSection", "content"], "text"],
  ["administrationPage", ["members", "[]", "name"], "string"], // proper-name override
  ["administrationPage", ["members", "[]", "title"], "string"],

  // --- projetEducatifPage ---
  ["projetEducatifPage", ["pageHeader", "headerText"], "string"],
  ["projetEducatifPage", ["missionSection", "title"], "string"],
  ["projetEducatifPage", ["missionSection", "text"], "text"],
  ["projetEducatifPage", ["visionSection", "title"], "string"],
  ["projetEducatifPage", ["visionSection", "introText"], "text"],
  ["projetEducatifPage", ["visionSection", "items", "[]", "label"], "string"],
  ["projetEducatifPage", ["visionSection", "items", "[]", "text"], "text"],
  ["projetEducatifPage", ["engagementsSection", "title"], "string"],
  ["projetEducatifPage", ["engagementsSection", "items", "[]", "title"], "string"],
  ["projetEducatifPage", ["engagementsSection", "items", "[]", "text"], "text"],
  ["projetEducatifPage", ["orientationsSection", "title"], "string"],
  ["projetEducatifPage", ["orientationsSection", "introText"], "text"],
  ["projetEducatifPage", ["orientationsSection", "items", "[]", "text"], "text"],
  ["projetEducatifPage", ["sloganSection", "label"], "string"],
  ["projetEducatifPage", ["sloganSection", "line1"], "string"],
  ["projetEducatifPage", ["sloganSection", "line2"], "string"],

  // --- comiteParentsPage ---
  ["comiteParentsPage", ["pageTitle"], "string"],
  ["comiteParentsPage", ["headerText"], "string"],
  ["comiteParentsPage", ["sections", "[]", "title"], "string"],
  ["comiteParentsPage", ["sections", "[]", "content"], "text"],

  // --- anciensPage ---
  ["anciensPage", ["headerText"], "string"],
  ["anciensPage", ["mainTitle"], "string"],
  ["anciensPage", ["mainContent"], "text"],
  ["anciensPage", ["missionTitle"], "string"],
  ["anciensPage", ["missionContent"], "text"],
  ["anciensPage", ["callToActionTitle"], "string"],
  ["anciensPage", ["callToActionTextPart1"], "string"],
  ["anciensPage", ["formLinkText"], "string"],
  ["anciensPage", ["callToActionTextPart2"], "string"],

  // --- protecteurNationalPage ---
  ["protecteurNationalPage", ["pageHeader", "headerText"], "string"],
  ["protecteurNationalPage", ["mainTitle"], "string"],
  ["protecteurNationalPage", ["introText"], "text"],
  ["protecteurNationalPage", ["infoSections", "[]", "title"], "string"],
  ["protecteurNationalPage", ["infoSections", "[]", "content"], "block"],
  ["protecteurNationalPage", ["stepsTitle"], "string"],
  ["protecteurNationalPage", ["stepsIntro"], "block"],
  ["protecteurNationalPage", ["etapes", "[]", "title"], "string"],
  ["protecteurNationalPage", ["etapes", "[]", "paragraphs", "[]", "text"], "block"],
  ["protecteurNationalPage", ["etapes", "[]", "contactPerson", "name"], "string"], // proper-name override
  ["protecteurNationalPage", ["etapes", "[]", "contactPerson", "role"], "string"],
  ["protecteurNationalPage", ["formButton", "text"], "string"],
  ["protecteurNationalPage", ["additionalSections", "[]", "title"], "block"],
  ["protecteurNationalPage", ["additionalSections", "[]", "paragraphs", "[]", "text"], "block"],
  ["protecteurNationalPage", ["footnote"], "block"],

  // --- calendarPage ---
  ["calendarPage", ["headerText"], "string"],
  ["calendarPage", ["pageTitle"], "string"],

  // --- primaire (projetPrimairePage) ---
  ["primaire", ["headerText"], "string"],
  ["primaire", ["introText"], "text"],
  ["primaire", ["cycles", "[]", "name"], "string"],
  ["primaire", ["cycles", "[]", "grades"], "string"],
  ["primaire", ["cycles", "[]", "description"], "text"],
  ["primaire", ["languages", "[]", "language"], "string"],
  ["primaire", ["languages", "[]", "description"], "text"],
  ["primaire", ["enrichmentTitle"], "string"],
  ["primaire", ["enrichmentContent"], "block"],
  ["primaire", ["subjectAreasTitle"], "string"],
  ["primaire", ["subjectAreasText"], "text"],
  ["primaire", ["subjectAreas"], "stringArray"],
  ["primaire", ["artsTitle"], "string"],
  ["primaire", ["artsContent"], "block"],
  ["primaire", ["maquetteTitle"], "string"],
  ["primaire", ["maquetteContent"], "block"],
  ["primaire", ["horaireTitre"], "text"],

  // --- prescolaire (projetPrescolairePage) ---
  ["prescolaire", ["headerText"], "string"],
  ["prescolaire", ["introText"], "text"],
  ["prescolaire", ["activitiesTitle"], "string"],
  ["prescolaire", ["activitiesDescription"], "text"],
  ["prescolaire", ["activities", "[]", "title"], "string"],
  ["prescolaire", ["coursesTitle"], "string"],
  ["prescolaire", ["coursesDescription"], "text"],
  ["prescolaire", ["specializedCourses", "[]", "title"], "string"],
  ["prescolaire", ["specializedCourses", "[]", "hours"], "string"],
  ["prescolaire", ["evaluationTitle"], "string"],
  ["prescolaire", ["evaluationDescription"], "text"],
  ["prescolaire", ["grades", "[]", "description"], "string"],
  ["prescolaire", ["competenciesTitle"], "string"],
  ["prescolaire", ["competenciesSubtitle"], "string"],
  ["prescolaire", ["competencies", "[]", "title"], "string"],
  ["prescolaire", ["competencies", "[]", "items"], "stringArray"],
  ["prescolaire", ["scheduleTitle"], "string"],
  ["prescolaire", ["scheduleDescription"], "text"],
  ["prescolaire", ["scheduleNote"], "string"],
  ["prescolaire", ["contactTitle"], "string"],
  ["prescolaire", ["contactDescription"], "string"],

  // --- secondaire (projetSecondairePage) ---
  ["secondaire", ["headerText"], "string"],
  ["secondaire", ["introText"], "text"],
  ["secondaire", ["cyclesTitle"], "string"],
  ["secondaire", ["cycles", "[]", "name"], "string"],
  ["secondaire", ["cycles", "[]", "grades"], "string"],
  ["secondaire", ["cycles", "[]", "focus"], "string"],
  ["secondaire", ["cycles", "[]", "description"], "text"],
  ["secondaire", ["pedagogyTitle"], "string"],
  ["secondaire", ["pedagogyContent"], "block"],
  ["secondaire", ["enrichedTitle"], "string"],
  ["secondaire", ["enrichedIntro"], "text"],
  ["secondaire", ["enrichedCourses", "[]", "subject"], "string"],
  ["secondaire", ["enrichedCourses", "[]", "levels"], "string"],
  ["secondaire", ["enrichedCourses", "[]", "description"], "string"],
  ["secondaire", ["optionsTitle"], "string"],
  ["secondaire", ["optionsIntro"], "text"],
  ["secondaire", ["programOptions", "[]", "title"], "string"],
  ["secondaire", ["programOptions", "[]", "description"], "text"],
  ["secondaire", ["programOptions", "[]", "target"], "string"],
  ["secondaire", ["activitiesTitle"], "string"],
  ["secondaire", ["activitiesIntro"], "text"],
  ["secondaire", ["activities"], "stringArray"],
  ["secondaire", ["activitiesNote"], "text"],
  ["secondaire", ["maquetteTitle"], "string"],
  ["secondaire", ["maquetteContent"], "text"],
  ["secondaire", ["maquetteNote"], "string"],

  // --- uniformPage ---
  ["uniformPage", ["title"], "string"],
  ["uniformPage", ["introText"], "text"],

  // --- studentCouncilPage / aiglePage / tripsPage / jardinLitterairePage / crealabPage (same shape) ---
  ["studentCouncilPage", ["headerText"], "string"],
  ["studentCouncilPage", ["introTitle"], "string"],
  ["studentCouncilPage", ["introText"], "text"],
  ["aiglePage", ["headerText"], "string"],
  ["aiglePage", ["introTitle"], "string"],
  ["aiglePage", ["introText"], "text"],
  ["tripsPage", ["headerText"], "string"],
  ["tripsPage", ["introTitle"], "string"],
  ["tripsPage", ["introText"], "text"],
  ["jardinLitterairePage", ["headerText"], "string"],
  ["jardinLitterairePage", ["introTitle"], "string"],
  ["jardinLitterairePage", ["introText"], "text"],
  ["crealabPage", ["headerText"], "string"],
  ["crealabPage", ["introTitle"], "string"],
  ["crealabPage", ["introText"], "text"],

  // --- soutienPage ---
  ["soutienPage", ["headerText"], "string"],
  ["soutienPage", ["mainTitle"], "string"],
  ["soutienPage", ["introText"], "text"],
  ["soutienPage", ["accordionItems", "[]", "title"], "string"],
  ["soutienPage", ["accordionItems", "[]", "content"], "text"],

  // --- agoraPage ---
  ["agoraPage", ["headerText"], "string"],
  ["agoraPage", ["mainTitle"], "string"],
  ["agoraPage", ["introText"], "text"],
  ["agoraPage", ["menuCallToAction"], "string"],
  ["agoraPage", ["dessertNotePrimaire"], "text"],
  ["agoraPage", ["primaireWeeks", "[]", "meals", "[]", "description"], "string"],
  ["agoraPage", ["dessertNoteSecondaire"], "text"],
  ["agoraPage", ["secondaireWeeks", "[]", "meals", "[]", "description"], "string"],

  // --- rentalSpacesPage ---
  ["rentalSpacesPage", ["headerText"], "string"],
  ["rentalSpacesPage", ["introText"], "text"],
  ["rentalSpacesPage", ["spaces", "[]", "title"], "string"],
  ["rentalSpacesPage", ["spaces", "[]", "description"], "text"],
  ["rentalSpacesPage", ["spaces", "[]", "details", "[]", "label"], "string"],
  ["rentalSpacesPage", ["spaces", "[]", "details", "[]", "value"], "string"],

  // --- teamPage ---
  ["teamPage", ["headerText"], "string"],
  ["teamPage", ["introText"], "text"],
  ["teamPage", ["categories", "[]", "title"], "string"],
  ["teamPage", ["categories", "[]", "staff", "[]", "name"], "string"], // proper-name override
  ["teamPage", ["categories", "[]", "staff", "[]", "title"], "string"],
  ["teamPage", ["messageText"], "block"],
  ["teamPage", ["joinUsText"], "block"],

  // --- serviceDeGardePage ---
  ["serviceDeGardePage", ["headerText"], "string"],
  ["serviceDeGardePage", ["sections", "[]", "title"], "string"],
  ["serviceDeGardePage", ["sections", "[]", "content"], "text"],
  ["serviceDeGardePage", ["sections", "[]", "pricingItems", "[]", "description"], "string"],
  ["serviceDeGardePage", ["sections", "[]", "pricingNote"], "text"],
  ["serviceDeGardePage", ["sections", "[]", "processSteps", "[]", "stepContent"], "text"],

  // --- transportPage ---
  ["transportPage", ["headerText"], "string"],
  ["transportPage", ["mapTitle"], "string"],
  ["transportPage", ["introText"], "text"],
  ["transportPage", ["contactTitle"], "string"],
  ["transportPage", ["contactName"], "string"], // proper-name override

  // --- pourquoiPage --- (popup/footer dates reversed to Yes by the data check)
  ["pourquoiPage", ["headerText"], "string"],
  ["pourquoiPage", ["popupTitle"], "string"],
  ["pourquoiPage", ["popupText"], "text"],
  ["pourquoiPage", ["popupDateStart"], "string"],
  ["pourquoiPage", ["popupDateEnd"], "string"],
  ["pourquoiPage", ["introText"], "text"],
  ["pourquoiPage", ["sections", "[]", "title"], "string"],
  ["pourquoiPage", ["sections", "[]", "description"], "text"],
  ["pourquoiPage", ["footerText"], "text"],
  ["pourquoiPage", ["footerDateStart"], "string"],
  ["pourquoiPage", ["footerDateEnd"], "string"],
  ["pourquoiPage", ["footerLinkText"], "string"],

  // --- admissionsPage ---
  ["admissionsPage", ["headerText"], "string"],
  ["admissionsPage", ["prescolairePrimaireTitle"], "string"],
  ["admissionsPage", ["prescolairePrimaireSubtitle"], "string"],
  ["admissionsPage", ["prescolairePrimaireText"], "text"],
  ["admissionsPage", ["prescolairePrimaireButtonText"], "string"],
  ["admissionsPage", ["secondaireTitle"], "string"],
  ["admissionsPage", ["secondaireSubtitle"], "string"],
  ["admissionsPage", ["secondaireText"], "text"],
  ["admissionsPage", ["secondaireButtonText"], "string"],

  // --- tuitionFeesPage --- (fees.prescolaire/primaire/secondaire stay plain - bare numbers)
  ["tuitionFeesPage", ["headerText"], "string"],
  ["tuitionFeesPage", ["introText"], "text"],
  ["tuitionFeesPage", ["tableTitle"], "string"],
  ["tuitionFeesPage", ["prescolaireLabel"], "string"],
  ["tuitionFeesPage", ["primaireLabel"], "string"],
  ["tuitionFeesPage", ["secondaireLabel"], "string"],
  ["tuitionFeesPage", ["fees", "[]", "category"], "string"],

  // libraryPage and testSchema (testDocument) are deliberately absent from
  // this manifest - excluded per phase 5A ruling, not touched at all.
];

const EXPECTED_ALREADY_LOCALIZED = 11;
const EXPECTED_NEW = 208;
const EXPECTED_TOTAL = EXPECTED_ALREADY_LOCALIZED + EXPECTED_NEW;

// ============================================================================
// Shape detection
// ============================================================================
function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function looksLikePortableText(value) {
  return (
    Array.isArray(value) &&
    value.every((el) => el && typeof el === "object" && typeof el._type === "string")
  );
}

function classifyScalar(value, targetType) {
  if (value === undefined) return { shape: "absent" };
  if (value === null) return { shape: "absent", wasNull: true };

  if (targetType === "block") {
    if (looksLikePortableText(value)) return { shape: "plain", value };
    if (isPlainObject(value) && "fr" in value) return { shape: "already-localized", value };
    return { shape: "unexpected", value };
  }

  // string / text
  if (typeof value === "string") return { shape: "plain", value };
  if (isPlainObject(value) && "fr" in value) return { shape: "already-localized", value };
  return { shape: "unexpected", value };
}

function classifyArrayElement(el) {
  if (el === undefined || el === null) return { shape: "absent", value: el };
  if (typeof el === "string") return { shape: "plain", value: el };
  if (isPlainObject(el) && "fr" in el) return { shape: "already-localized", value: el };
  return { shape: "unexpected", value: el };
}

// ============================================================================
// Path walking — collects every leaf a manifest entry's path resolves to
// inside one document, expanding '[]' segments across every array item and
// tracking both the item's _key (for a real patch path) and its index (for
// human-readable reporting).
// ============================================================================
function collectLeaves(value, segments, keyPath) {
  if (segments.length === 0) {
    return [{ keyPath, value }];
  }
  const [seg, ...rest] = segments;

  if (seg === "[]") {
    if (value === undefined || value === null) {
      return [{ keyPath: [...keyPath, { type: "array", missing: true }], value: undefined, absentArray: true }];
    }
    if (!Array.isArray(value)) {
      return [{ keyPath: [...keyPath, { type: "array", missing: true }], value, unexpectedArray: true }];
    }
    if (value.length === 0) {
      return []; // nothing to report - an empty array is not an error, just no items to touch
    }
    return value.flatMap((item, index) => {
      const key = item && typeof item === "object" ? item._key : undefined;
      return collectLeaves(item, rest, [...keyPath, { type: "index", key, index }]);
    });
  }

  if (value === undefined || value === null || typeof value !== "object") {
    return [{ keyPath: [...keyPath, { type: "key", key: seg }], value: undefined }];
  }
  return collectLeaves(value[seg], rest, [...keyPath, { type: "key", key: seg }]);
}

function humanPath(keyPath) {
  return keyPath
    .map((seg) => {
      if (seg.type === "key") return `.${seg.key}`;
      if (seg.type === "array") return "[]";
      return seg.key !== undefined ? `[${seg.index}]` : `[${seg.index}](no _key!)`;
    })
    .join("")
    .replace(/^\./, "");
}

// Real Sanity patch path, using _key-based addressing wherever an array was
// walked through - robust against reordering, unlike a positional index.
function patchPath(keyPath) {
  return keyPath
    .map((seg) => {
      if (seg.type === "key") return `.${seg.key}`;
      if (seg.key === undefined) throw new Error(`Cannot build a safe patch path: array item at index ${seg.index} has no _key`);
      return `[_key=="${seg.key}"]`;
    })
    .join("")
    .replace(/^\./, "");
}

// ============================================================================
// Migration run
// ============================================================================
async function run() {
  console.log(`[migrate] mode: ${APPLY ? "APPLY" : "DRY RUN"}`);
  console.log(`[migrate] resolved dataset: "${client.config().dataset}" on project "${client.config().projectId}"`);
  await assertSafeForWrite(client);

  const byType = new Map();
  for (const [type, path, targetType] of MANIFEST) {
    if (!byType.has(type)) byType.set(type, []);
    byType.get(type).push({ path, targetType });
  }

  const perType = []; // report rows
  const absentFindings = [];
  const unexpectedFindings = [];
  // Pooled by kind so the final 5 representative examples are guaranteed to
  // include one of each shape, not just whichever 5 were found first
  // (document types are visited in manifest order, so without this a run
  // could report 5 examples that are all plain strings from the first type
  // visited, never reaching a block or stringArray field).
  const examplePool = { scalar: [], block: [], stringArray: [], "already-localized": [] };
  function pushExamplePoolCandidate(kind, ex) {
    if (examplePool[kind].length < 3) examplePool[kind].push(ex);
  }
  let totalManifestEntriesMatched = 0; // definition-level, compare to 208/219
  let totalManifestEntriesTouchedAnyDoc = 0;
  let totalValueInstancesTransformed = 0;
  let totalValueInstancesAlreadyLocalized = 0;

  // transaction payload for --apply, built regardless of mode so dry-run
  // output reflects exactly what apply would do
  const patchesByDoc = new Map(); // docId -> { path: value }

  for (const [type, entries] of byType) {
    const documents = await client.fetch(`*[_type == $type]`, { type });

    const typeRow = {
      type,
      documents: documents.length,
      fieldDefsMatchedInSomeDoc: 0,
      valueInstancesTransformed: 0,
      valueInstancesAlreadyLocalized: 0,
      absent: 0,
      unexpected: 0,
    };

    for (const { path, targetType } of entries) {
      totalManifestEntriesMatched += 1;
      let matchedInAnyDoc = false;

      for (const doc of documents) {
        const root = path[0] === "[]" ? doc : doc; // path always starts from doc root
        const leaves = collectLeaves(doc, path, []);

        for (const leaf of leaves) {
          if (leaf.absentArray || leaf.value === undefined) {
            absentFindings.push({ type, docId: doc._id, path: humanPath(leaf.keyPath), targetType });
            typeRow.absent += 1;
            continue;
          }
          if (leaf.unexpectedArray) {
            unexpectedFindings.push({
              type,
              docId: doc._id,
              path: humanPath(leaf.keyPath),
              targetType,
              actual: JSON.stringify(leaf.value).slice(0, 200),
              note: "expected an array here",
            });
            typeRow.unexpected += 1;
            continue;
          }

          if (targetType === "stringArray") {
            if (!Array.isArray(leaf.value)) {
              unexpectedFindings.push({
                type, docId: doc._id, path: humanPath(leaf.keyPath), targetType,
                actual: JSON.stringify(leaf.value).slice(0, 200), note: "expected an array of strings",
              });
              typeRow.unexpected += 1;
              continue;
            }
            let touchedThisArray = false;
            const newArray = leaf.value.map((el, i) => {
              const c = classifyArrayElement(el);
              if (c.shape === "plain") {
                touchedThisArray = true;
                typeRow.valueInstancesTransformed += 1;
                totalValueInstancesTransformed += 1;
                const transformed = { _type: "localizedString", _key: cryptoRandomKey(), fr: c.value };
                pushExamplePoolCandidate("stringArray", { type, docId: doc._id, path: `${humanPath(leaf.keyPath)}[${i}]`, before: el, after: transformed });
                return transformed;
              }
              if (c.shape === "already-localized") {
                typeRow.valueInstancesAlreadyLocalized += 1;
                totalValueInstancesAlreadyLocalized += 1;
                return el;
              }
              unexpectedFindings.push({
                type, docId: doc._id, path: `${humanPath(leaf.keyPath)}[${i}]`, targetType,
                actual: JSON.stringify(el).slice(0, 200), note: "array element neither a plain string nor an already-localized object",
              });
              typeRow.unexpected += 1;
              return el;
            });
            if (touchedThisArray) {
              matchedInAnyDoc = true;
              const p = patchPath(leaf.keyPath);
              if (!patchesByDoc.has(doc._id)) patchesByDoc.set(doc._id, {});
              patchesByDoc.get(doc._id)[p] = newArray;
            }
            continue;
          }

          // string / text / block
          const c = classifyScalar(leaf.value, targetType);
          if (c.shape === "absent") {
            absentFindings.push({ type, docId: doc._id, path: humanPath(leaf.keyPath), targetType, wasNull: !!c.wasNull });
            typeRow.absent += 1;
            continue;
          }
          if (c.shape === "unexpected") {
            unexpectedFindings.push({
              type, docId: doc._id, path: humanPath(leaf.keyPath), targetType,
              actual: JSON.stringify(c.value).slice(0, 200),
              note: `expected a plain ${targetType === "block" ? "portable text array" : "string"} or an already-localized object`,
            });
            typeRow.unexpected += 1;
            continue;
          }
          if (c.shape === "already-localized") {
            typeRow.valueInstancesAlreadyLocalized += 1;
            totalValueInstancesAlreadyLocalized += 1;
            pushExamplePoolCandidate("already-localized", { type, docId: doc._id, path: humanPath(leaf.keyPath), before: c.value, after: c.value, note: "already in localized shape - left untouched" });
            continue;
          }
          // plain -> transform
          matchedInAnyDoc = true;
          typeRow.valueInstancesTransformed += 1;
          totalValueInstancesTransformed += 1;
          const transformed = { _type: SANITY_TYPE_NAME[targetType], fr: c.value };
          const p = patchPath(leaf.keyPath);
          if (!patchesByDoc.has(doc._id)) patchesByDoc.set(doc._id, {});
          patchesByDoc.get(doc._id)[p] = transformed;

          pushExamplePoolCandidate(targetType === "block" ? "block" : "scalar", { type, docId: doc._id, path: humanPath(leaf.keyPath), before: c.value, after: transformed });
        }
      }

      if (matchedInAnyDoc) {
        typeRow.fieldDefsMatchedInSomeDoc += 1;
        totalManifestEntriesTouchedAnyDoc += 1;
      }
    }

    perType.push(typeRow);
  }

  // ---- Report ----
  console.log("\n=== Per-type report ===");
  console.log(
    "type".padEnd(24), "docs", "fieldDefs*", "transformed", "alreadyLoc", "absent", "unexpected"
  );
  for (const r of perType) {
    console.log(
      r.type.padEnd(24),
      String(r.documents).padEnd(4),
      String(r.fieldDefsMatchedInSomeDoc).padEnd(10),
      String(r.valueInstancesTransformed).padEnd(11),
      String(r.valueInstancesAlreadyLocalized).padEnd(10),
      String(r.absent).padEnd(6),
      String(r.unexpected)
    );
  }
  console.log("(*fieldDefs = manifest entries with at least one value transformed in at least one document)");

  console.log("\n=== Grand totals vs. step 1 inventory ===");
  console.log(`Manifest entries defined:            ${totalManifestEntriesMatched} (expected ${EXPECTED_TOTAL} = ${EXPECTED_NEW} new + ${EXPECTED_ALREADY_LOCALIZED} already-localized)`);
  console.log(`Manifest entries touched in >=1 doc:  ${totalManifestEntriesTouchedAnyDoc}`);
  console.log(`Value instances transformed:          ${totalValueInstancesTransformed}`);
  console.log(`Value instances already localized:    ${totalValueInstancesAlreadyLocalized}`);
  console.log(`Absent findings:                      ${absentFindings.length}`);
  console.log(`Unexpected-shape findings:             ${unexpectedFindings.length}`);

  if (totalManifestEntriesMatched !== EXPECTED_TOTAL) {
    console.log(`\n!!! MANIFEST COUNT MISMATCH: built ${totalManifestEntriesMatched} entries, expected ${EXPECTED_TOTAL}. This is a bug in this script's manifest, not a data finding. !!!`);
  }

  console.log("\n=== Absent fields (inventory expected a value, none found) ===");
  if (absentFindings.length === 0) console.log("(none)");
  for (const f of absentFindings) {
    console.log(`  ${f.type} / ${f.docId} / ${f.path}${f.wasNull ? " (explicit null)" : " (key missing)"}`);
  }

  console.log("\n=== Unexpected-shape fields (neither plain nor already-localized) ===");
  if (unexpectedFindings.length === 0) console.log("(none)");
  for (const f of unexpectedFindings) {
    console.log(`  ${f.type} / ${f.docId} / ${f.path} - ${f.note} - actual: ${f.actual}`);
  }

  // Build the final 5 with guaranteed diversity: one block, one stringArray,
  // one already-localized (proves the skip path), then fill the rest with
  // plain scalars.
  const examples = [
    ...examplePool.block.slice(0, 1).map((e) => ({ ...e, kind: "block" })),
    ...examplePool.stringArray.slice(0, 1).map((e) => ({ ...e, kind: "stringArray" })),
    ...examplePool["already-localized"].slice(0, 1).map((e) => ({ ...e, kind: "already-localized" })),
  ];
  for (const e of examplePool.scalar) {
    if (examples.length >= 5) break;
    examples.push({ ...e, kind: "scalar" });
  }

  console.log("\n=== 5 representative before/after examples ===");
  for (const ex of examples) {
    console.log(`\n[${ex.kind}] ${ex.type} / ${ex.docId} / ${ex.path}${ex.note ? " - " + ex.note : ""}`);
    console.log("  before:", JSON.stringify(ex.before).slice(0, 300));
    console.log("  after: ", JSON.stringify(ex.after).slice(0, 300));
  }

  // ---- Payload size check (always computed, dry run or apply) ----
  const perDocSizes = [...patchesByDoc.entries()].map(([docId, fields]) => ({
    docId,
    bytes: Buffer.byteLength(JSON.stringify(fields), "utf8"),
  }));
  const totalPayloadBytes = perDocSizes.reduce((sum, d) => sum + d.bytes, 0);
  perDocSizes.sort((a, b) => b.bytes - a.bytes);
  console.log(`\n=== Transaction payload size ===`);
  console.log(`Total (all ${patchesByDoc.size} documents in one transaction): ${(totalPayloadBytes / 1024).toFixed(1)} KB`);
  console.log("Largest documents:");
  for (const d of perDocSizes.slice(0, 5)) {
    console.log(`  ${d.docId}: ${(d.bytes / 1024).toFixed(1)} KB`);
  }

  // ---- Apply (transaction, all-or-nothing) ----
  // Approach: one client.transaction(), with one .patch(docId).set({...})
  // per document that has at least one field to transform, committed once
  // at the end. Sanity transactions are atomic server-side: .commit() either
  // applies every patch in the transaction or none of them. If the commit
  // fails partway (network error, conflict, validation error on any single
  // patch), the server rejects the whole transaction - no document in this
  // run is left half-migrated. The script exits non-zero and the dataset is
  // provably unchanged; because the migration is idempotent, re-running it
  // (dry run first, then --apply again) is always safe.
  //
  // Sanity's mutation HTTP endpoint limit is documented at 10MB per request
  // (https://www.sanity.io/docs/http-mutations - "Payloads bigger than 10MB
  // are rejected"). This migration's full payload is checked against a much
  // more conservative 2MB threshold below - if ever exceeded, this script
  // would need to split into multiple transactions by document, which trades
  // away single-transaction atomicity: each transaction would then commit
  // independently, so a mid-run failure could leave some documents migrated
  // and others not. That tradeoff is not made silently - the script refuses
  // to proceed and says so, rather than picking a batching strategy under
  // pressure at execution time.
  const SAFE_PAYLOAD_BYTES = 2 * 1024 * 1024; // 2MB, conservative vs. Sanity's 10MB documented limit
  if (APPLY && totalPayloadBytes > SAFE_PAYLOAD_BYTES) {
    console.error(`\n[migrate] REFUSING TO APPLY: payload is ${(totalPayloadBytes / 1024 / 1024).toFixed(2)}MB, over the ${SAFE_PAYLOAD_BYTES / 1024 / 1024}MB safety threshold. This would need to be split into multiple transactions, which changes the atomicity guarantee - not doing that automatically.`);
    process.exit(1);
  }

  if (APPLY) {
    if (patchesByDoc.size === 0) {
      console.log("\n[migrate] APPLY: nothing to do, 0 documents have pending changes.");
      return;
    }
    const tx = client.transaction();
    for (const [docId, fields] of patchesByDoc) {
      tx.patch(docId, (p) => p.set(fields));
    }
    console.log(`\n[migrate] APPLY: committing one transaction covering ${patchesByDoc.size} document(s)...`);
    await tx.commit();
    console.log("[migrate] APPLY: committed.");
  } else {
    console.log(`\n[migrate] DRY RUN complete. ${patchesByDoc.size} document(s) would be touched by --apply. No writes performed.`);
  }
}

function cryptoRandomKey() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

run().catch((err) => {
  console.error("[migrate] FAILED:", err);
  process.exit(1);
});
