// Pure unit test for the GROQ french-fallback query fragments - no network,
// no token, runs everywhere. This is what actually catches a mistake when
// the pattern gets replicated across the other 29 pages in phase 6: the
// live integration test (sanity-locale-fallback.test.js) proves the pattern
// works against real Sanity/GROQ semantics; this test proves any given
// call site is still generating that exact pattern.

import { localizedString, localizedText, localizedBlock, localizedStringArray } from "./localizedFieldQuery";

describe("localizedString", () => {
  test("builds the select()/coalesce() pattern for a top-level field", () => {
    expect(localizedString("title")).toBe(
      'coalesce(select(title[$locale] != "" => title[$locale]), title.fr)'
    );
  });

  test("works for nested/array field paths", () => {
    expect(localizedString("jobs[0].title")).toBe(
      'coalesce(select(jobs[0].title[$locale] != "" => jobs[0].title[$locale]), jobs[0].title.fr)'
    );
  });
});

describe("localizedText", () => {
  test("builds the same select()/coalesce() pattern as localizedString", () => {
    expect(localizedText("applicationNote")).toBe(
      'coalesce(select(applicationNote[$locale] != "" => applicationNote[$locale]), applicationNote.fr)'
    );
  });
});

describe("localizedBlock", () => {
  test("uses count() > 0 instead of != \"\" - portable text is an array, not a string", () => {
    expect(localizedBlock("content")).toBe(
      'coalesce(select(count(content[$locale]) > 0 => content[$locale]), content.fr)'
    );
  });

  test("works for nested field paths", () => {
    expect(localizedBlock("sections[0].content")).toBe(
      'coalesce(select(count(sections[0].content[$locale]) > 0 => sections[0].content[$locale]), sections[0].content.fr)'
    );
  });
});

describe("localizedStringArray", () => {
  test("builds an array projection using @ for the current element, flattened with .v", () => {
    expect(localizedStringArray("subjectAreas")).toBe(
      'subjectAreas[]{ "v": coalesce(select(@[$locale] != "" => @[$locale]), fr) }.v'
    );
  });

  test("works for nested field paths", () => {
    expect(localizedStringArray("competencies[0].items")).toBe(
      'competencies[0].items[]{ "v": coalesce(select(@[$locale] != "" => @[$locale]), fr) }.v'
    );
  });
});
