// "The Haircut" — make.fun bounty u-boothlord-unsent-the-micro-confession-sprint-8c6596ba.
// A Node 22 program (standard library only, no network) that writes the one
// two-part unsent message to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt locally).
//
// The confession: a To: line naming who it was meant for, then the unsent
// line itself, exactly as typed, with no explanation after it. The woman
// who cuts his hair has asked about his mother every month for six years;
// he never told her his mother died before the first haircut, because her
// chair is the only place anyone still asks. Too afraid to end the one
// ritual where someone asks — and too kind to correct her.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The To: line. It has to carry weight: the message only makes sense
// to the woman in this chair, no one else.
const TO_LINE = "To: the woman who cuts my hair";

// The unsent line, exactly as typed. One line, no explanation after it.
const MESSAGE =
  "You asked about my mother every month for six years, and I never " +
  "told you she died before you ever cut my hair, because your " +
  "chair was the only place anyone asked.";

// The entry: To: line, newline, message. Nothing else.
const ENTRY = `${TO_LINE}\n${MESSAGE}`;

// The gate: /output/entry.txt must be UTF-8 text of 1 to 260 characters,
// not only white space, and the message line itself at most 200.
// The entry must be exactly two parts: the To: line and the message.
// Fail loudly here rather than ship an invalid entry.
if (!TO_LINE.startsWith("To: ") || TO_LINE.trim().length <= 4) {
  throw new Error("entry needs a To: line naming who it was meant for");
}
if (ENTRY.split("\n").length !== 2) {
  throw new Error("entry must be exactly two lines: To: line + message");
}
if (ENTRY.length < 1 || ENTRY.length > 260 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} chars; gate needs 1-260`);
}
if (MESSAGE.length > 200) {
  throw new Error(`message line is ${MESSAGE.length} chars; max is 200`);
}
if (MESSAGE.includes("\n")) {
  throw new Error("message must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
// Write exactly the entry — no trailing newline, so the file holds the
// two parts and nothing else.
writeFileSync(outFile, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${outFile}`);
