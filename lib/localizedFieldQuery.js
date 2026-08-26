// Builds the GROQ french-fallback projection for a localized field, given
// its path from the enclosing object. Single source of truth for the
// pattern proven in phase 4 (see docs/adr/0001-architecture-i18n.md and
// docs/dettes-preexistantes.md) - used by every localized query and by
// lib/localizedFieldQuery.test.js / lib/sanity-locale-fallback.test.js.
//
// Falls back to French when the target locale's value is either entirely
// absent (undefined) or present but empty - a plain coalesce() only
// catches the first case.

export function localizedString(field) {
  return `coalesce(select(${field}[$locale] != "" => ${field}[$locale]), ${field}.fr)`;
}

export function localizedText(field) {
  return localizedString(field);
}

export function localizedBlock(field) {
  return `coalesce(select(count(${field}[$locale]) > 0 => ${field}[$locale]), ${field}.fr)`;
}

// Same fallback semantics as localizedString, applied per-element to a plain
// array of localizedString objects (of:[{type:'localizedString'}]) rather
// than a single object field. Proved empirically in phase 5A (staging,
// test-array-localized-pattern doc) against all three per-item states -
// @ refers to the current array element, and dynamic bracket-indexing by
// $locale works the same way inside an array projection as it does on a
// top-level object field.
export function localizedStringArray(field) {
  return `${field}[]{ "v": coalesce(select(@[$locale] != "" => @[$locale]), fr) }.v`;
}
