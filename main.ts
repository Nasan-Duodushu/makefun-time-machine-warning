// Funniest Time Machine Warning Label — one line, at most 120 characters.
// The label plays on the classic time-travel hazard: meddling with your own
// ancestry. The warning form is kept ("WARNING: ..."), the joke turns on the
// last clause — the great-grandmother remembers everything. A warning label
// is a sentence, so the line must end with a full stop, not trail off.
import { writeFileSync, mkdirSync } from 'node:fs';

const LABEL =
  'WARNING: Do not flirt with strangers. One of them is your great-grandmother, and she remembers everything.';

const MAX = 120;

function checkLabel(text: string): string[] {
  const problems: string[] = [];
  const glyphs = Array.from(text);
  if (glyphs.length === 0) problems.push('label is empty');
  if (glyphs.length > MAX) problems.push(`label is ${glyphs.length} chars, over ${MAX}`);
  if (/\r|\n|\t/.test(text)) problems.push('label must be one line');
  if (text !== text.trim()) problems.push('label must not be padded');
  if (!/^WARNING:/.test(text)) problems.push('label must open with WARNING:');
  if (!/[.!?]$/.test(text)) problems.push('label must end with terminal punctuation');
  return problems;
}

const problems = checkLabel(LABEL);
if (problems.length > 0) {
  throw new Error(`invalid warning label: ${problems.join('; ')}`);
}

const outDir = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LABEL, { encoding: 'utf8', mode: 0o644 });
