// The Funniest Toaster Error Message — make.fun bounty
// u-eager-stork-81-9647-the-funniest-toaster-error-436406cd
//
// Writes one line — the error message a kitchen toaster shows its owner —
// to /output/entry.txt (UTF-8, 1–120 characters, not whitespace-only).

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The voice is the joke: a deadpan appliance deflecting blame onto the
// bread. No toast puns, no setup — the whole turn lands in one read.
const ENTRY =
  "I did not burn your breakfast. The bread did that to itself.";

function emptyDir(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { force: true, recursive: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const text = ENTRY;
  if (text.length < 1 || text.length > 120 || text.trim().length === 0) {
    throw new Error(`entry out of gate: ${text.length} characters`);
  }
  mkdirSync(outDir, { recursive: true });
  emptyDir(outDir);
  const file = join(outDir, "entry.txt");
  writeFileSync(file, text, "utf8");
  const back = readFileSync(file, "utf8");
  if (back !== text) {
    throw new Error("entry.txt does not match the entry exactly");
  }
}

main();
