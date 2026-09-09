// Safety guard for any script that WRITES to Sanity. Pass the dataset
// explicitly at the call site that constructs the client - never rely on
// sanity.cli.ts / sanity.config.ts / .env.local resolving it for you, since
// those are four independent, unsynchronized sources of truth (see
// docs/dettes-preexistantes.md for how a write once slipped through them).
//
// Production is refused by default, always, for any actual write. The one
// exception is a deliberate, per-run override via
// I_UNDERSTAND_THIS_WRITES_TO_PRODUCTION=yes, added 2026-09-09 for the one
// migration window where production genuinely is the intended target. It
// does not weaken the default: unset (or any value other than exactly
// "yes"), a write to production is still refused outright.
//
// The override only gates an actual write (willWrite=true, the default) -
// a dry run (willWrite=false) against production runs unconditionally, no
// override needed, since it writes nothing. This is deliberate: requiring
// the override just to read would put it in the caller's shell history and
// muscle memory before the one call that actually matters, defeating the
// point of a deliberate gesture.
//
// assertSafeForWrite reads client.config().dataset - the value already
// baked into the client instance that every subsequent request will
// actually use - not any config file. That makes it bypass-proof by
// construction: whatever resolved the client's dataset, this checks the
// end result, not the mechanism.

export async function assertSafeForWrite(client, willWrite = true) {
  const { dataset, projectId } = client.config();

  console.log(`[write-guard] about to write to dataset "${dataset}" on project "${projectId}"`);

  if (dataset === "production" && willWrite) {
    if (process.env.I_UNDERSTAND_THIS_WRITES_TO_PRODUCTION !== "yes") {
      throw new Error(
        `[write-guard] refusing to run: resolved dataset is "production". ` +
        `This script must never write to production without a deliberate, ` +
        `explicit override. If writing to production is genuinely intended ` +
        `right now, set I_UNDERSTAND_THIS_WRITES_TO_PRODUCTION=yes for this ` +
        `run only. Otherwise, construct the client with an explicit ` +
        `non-production dataset.`
      );
    }
    console.log(
      `\n[write-guard] ################################################################\n` +
      `[write-guard] ###  WRITING TO PRODUCTION  -  dataset "${dataset}", project "${projectId}"\n` +
      `[write-guard] ###  I_UNDERSTAND_THIS_WRITES_TO_PRODUCTION=yes was set - override acknowledged.\n` +
      `[write-guard] ################################################################\n`
    );
  }

  // Live read-only assertion: actually hit the API on this client before
  // any write, so a misconfigured project/token fails loudly here rather
  // than on the first write.
  const probe = await client.fetch(`*[0]{_id}`);
  console.log(`[write-guard] confirmed live read access to dataset "${dataset}" (probe: ${JSON.stringify(probe)})`);
}
