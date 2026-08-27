/**
 * @jest-environment node
 */
// Proves the GROQ french-fallback pattern used across every localized field
// (see getCareerPage and its 29-page replication in phase 6) actually
// resolves correctly for all four locale states, for all three localized
// field types. This is a live integration test against the `staging`
// Sanity dataset, not a mock - the resolution logic lives entirely inside
// the GROQ query string now (that's the point: only one locale crosses the
// wire), so there is no JS-side function left to unit-test in isolation.
//
// Requires SANITY_API_WRITE_TOKEN (a token with write access to the
// `staging` dataset only). Locally, skips itself (with a warning) when that
// token is absent, so `npm run test` doesn't hard-fail for anyone without
// Sanity credentials configured. In CI (CI=true), a skip would be a
// permanent false positive on these 12 assertions - it fails loudly instead
// - see docs/dettes-preexistantes.md, "Incidents survenus pendant le
// mandat", for the write-guard incident this test exists to catch a
// regression of.

import { createClient } from "@sanity/client";
import { assertSafeForWrite } from "../scripts/sanity-write-guard.mjs";
import { localizedString, localizedText, localizedBlock } from "./localizedFieldQuery";

const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const isCI = process.env.CI === "true";

if (!WRITE_TOKEN) {
  if (isCI) {
    test("SANITY_API_WRITE_TOKEN must be set in CI", () => {
      throw new Error(
        "[sanity-locale-fallback.test.js] SANITY_API_WRITE_TOKEN is not set. " +
          "This suite verifies the GROQ locale-fallback pattern used across every " +
          "localized field. Skipping it in CI would let a real regression pass " +
          "silently - set the token as a CI secret instead of letting this skip."
      );
    });
  } else {
    console.warn(
      "[sanity-locale-fallback.test.js] SANITY_API_WRITE_TOKEN not set - skipping locally. " +
        "Set it to a staging-scoped write token to run this test, or set CI=true to fail " +
        "instead of skip."
    );
  }
}

const describeOrSkip = WRITE_TOKEN ? describe : describe.skip;

const TEST_DOC_ID = "groq-fallback-test-doc";

function block(text) {
  return [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s1", text, marks: [] }],
    },
  ];
}

describeOrSkip("GROQ locale-fallback pattern (live, staging dataset)", () => {
  /** @type {import('@sanity/client').SanityClient} */
  let client;

  beforeAll(async () => {
    client = createClient({
      projectId: "col2tg5g",
      dataset: "staging",
      useCdn: false,
      apiVersion: "2023-05-03",
      token: WRITE_TOKEN,
      ignoreBrowserTokenWarning: true,
    });

    await assertSafeForWrite(client);

    await client.createOrReplace({
      _id: TEST_DOC_ID,
      _type: "groqFallbackTestDoc",

      strPresent: { _type: "localizedString", fr: "Texte francais", hy: "Hayeren texte" },
      strEmpty: { _type: "localizedString", fr: "Texte francais", hy: "" },
      strAbsent: { _type: "localizedString", fr: "Texte francais" },

      textPresent: { _type: "localizedText", fr: "Long texte francais", hy: "Yerkar hayeren" },
      textEmpty: { _type: "localizedText", fr: "Long texte francais", hy: "" },
      textAbsent: { _type: "localizedText", fr: "Long texte francais" },

      blockPresent: {
        _type: "localizedBlock",
        fr: block("Bloc francais"),
        hy: block("Bloc hayeren"),
      },
      blockEmpty: { _type: "localizedBlock", fr: block("Bloc francais"), hy: [] },
      blockAbsent: { _type: "localizedBlock", fr: block("Bloc francais") },
    });
  });

  afterAll(async () => {
    if (client) await client.delete(TEST_DOC_ID);
  });

  async function fetchField(field, fragmentBuilder, locale) {
    const query = `*[_id=="${TEST_DOC_ID}"][0]{ "v": ${fragmentBuilder(field)} }`;
    const result = await client.fetch(query, { locale });
    return result.v;
  }

  describe.each([
    ["localizedString", "strPresent", "strEmpty", "strAbsent", localizedString, "Hayeren texte", "Texte francais"],
    ["localizedText", "textPresent", "textEmpty", "textAbsent", localizedText, "Yerkar hayeren", "Long texte francais"],
  ])("%s", (_typeName, presentField, emptyField, absentField, fragmentBuilder, targetContent, frContent) => {
    test("French present ($locale='fr') returns French", async () => {
      const v = await fetchField(presentField, fragmentBuilder, "fr");
      expect(v).toBe(frContent);
    });

    test("target locale present with real content returns target content", async () => {
      const v = await fetchField(presentField, fragmentBuilder, "hy");
      expect(v).toBe(targetContent);
    });

    test("target locale present but empty falls back to French", async () => {
      const v = await fetchField(emptyField, fragmentBuilder, "hy");
      expect(v).toBe(frContent);
      expect(v).not.toBe("");
    });

    test("target locale key absent entirely falls back to French", async () => {
      const v = await fetchField(absentField, fragmentBuilder, "hy");
      expect(v).toBe(frContent);
    });
  });

  describe("localizedBlock", () => {
    function textOf(portableText) {
      return portableText?.[0]?.children?.map((c) => c.text).join("") ?? null;
    }

    test("French present ($locale='fr') returns French block", async () => {
      const v = await fetchField("blockPresent", localizedBlock, "fr");
      expect(textOf(v)).toBe("Bloc francais");
    });

    test("target locale present with real content returns target block", async () => {
      const v = await fetchField("blockPresent", localizedBlock, "hy");
      expect(textOf(v)).toBe("Bloc hayeren");
    });

    test("target locale present but empty array falls back to French block", async () => {
      const v = await fetchField("blockEmpty", localizedBlock, "hy");
      expect(textOf(v)).toBe("Bloc francais");
      expect(Array.isArray(v) && v.length > 0).toBe(true);
    });

    test("target locale key absent entirely falls back to French block", async () => {
      const v = await fetchField("blockAbsent", localizedBlock, "hy");
      expect(textOf(v)).toBe("Bloc francais");
    });
  });
});
