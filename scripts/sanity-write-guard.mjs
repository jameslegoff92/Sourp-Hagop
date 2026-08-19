// Safety guard for any script that WRITES to Sanity. Pass the dataset
// explicitly at the call site that constructs the client - never rely on
// sanity.cli.ts / sanity.config.ts / .env.local resolving it for you, since
// those are four independent, unsynchronized sources of truth (see
// docs/dettes-preexistantes.md for how a write once slipped through them).
//
// assertSafeForWrite reads client.config().dataset - the value already
// baked into the client instance that every subsequent request will
// actually use - not any config file. That makes it bypass-proof by
// construction: whatever resolved the client's dataset, this checks the
// end result, not the mechanism.

export async function assertSafeForWrite(client) {
  const { dataset, projectId } = client.config();

  console.log(`[write-guard] about to write to dataset "${dataset}" on project "${projectId}"`);

  if (dataset === "production") {
    throw new Error(
      `[write-guard] refusing to run: resolved dataset is "production". ` +
      `This script must never write to production. Construct the client with ` +
      `an explicit non-production dataset.`
    );
  }

  // Live read-only assertion: actually hit the API on this client before
  // any write, so a misconfigured project/token fails loudly here rather
  // than on the first write.
  const probe = await client.fetch(`*[0]{_id}`);
  console.log(`[write-guard] confirmed live read access to dataset "${dataset}" (probe: ${JSON.stringify(probe)})`);
}
