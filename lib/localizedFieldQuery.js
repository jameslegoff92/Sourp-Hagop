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
