/**
 * programme-ids.mjs — the one place a phase ID is defined.
 *
 * Why this file exists: adding Track M widened nine `[A-M]` regexes across three scripts
 * in one commit (README § 6, 2026-08-11). Missing one of them was defect **D045** — a
 * dependency that parses as prose blocks nothing, so `--ready` reports a blocked phase as
 * startable. Adding Programme 2 introduces a second ID *shape*, which would have meant
 * nine more edits and the same failure mode. So the shape is defined once, here, and the
 * scripts import it.
 *
 * Two shapes are legal, permanently:
 *
 *   Programme 1  `A07`, `E12b`     one track letter A–M, two digits, optional split suffix
 *   Programme 2+ `P2-014`, `P3-207a`  programme number, hyphen, three digits, optional suffix
 *
 * Programme 1's shape is frozen: 359 phase IDs are already permanent under README § 0
 * rule 3 and are never rewritten into the new shape. Programme 2+ uses three digits
 * because each programme is planned at 300+ phases and a two-digit field cannot hold them.
 */

/** Regex source for a single phase ID, either shape. Unanchored, no capture groups. */
export const PHASE_ID_SRC = String.raw`(?:[A-M]\d{2}|P\d{1,2}-\d{3})[a-z]?`;

/** Regex source for a range, e.g. `A01–A05`, `P2-014–P2-021`, `P10-007–P10-019`. */
const RANGE_SRC = String.raw`(?:([A-M])(\d{2})|P(\d{1,2})-(\d{3}))\s*[–-]\s*(?:[A-M]|P\d{1,2}-)?(\d{2,3})`;

/**
 * Regex source matching only the IDs owned by one track key — `A` → `A\d{2}[a-z]?`,
 * `P2` → `P2-\d{3}[a-z]?`. Used when parsing a single track file, so a stray ID from
 * another track pasted into the wrong document is not silently adopted by it.
 */
export function idPatternFor(trackKey) {
  return trackKey.startsWith("P")
    ? String.raw`${trackKey}-\d{3}[a-z]?`
    : String.raw`${trackKey}\d{2}[a-z]?`;
}

/** A whole-string match, for argv parsing. */
export const isPhaseId = (s) => new RegExp(`^${PHASE_ID_SRC}$`).test(s);

/**
 * Track key for an ID: `"A"` for Programme 1, `"P2"` for Programme 2+.
 * This is the key into TRACKS / TRACK_FILES, so it must round-trip with the ID.
 */
export function trackOf(id) {
  // Split on the hyphen rather than by fixed width: `P10-007` is a two-digit programme
  // and slicing two characters would bucket it as "P1", silently merging two programmes.
  return id.startsWith("P") ? id.slice(0, id.indexOf("-")) : id[0];
}

/** Programme number an ID belongs to. Programme 1 is tracks A–M. */
export function programmeOf(id) {
  return id.startsWith("P") ? Number(id.slice(1, id.indexOf("-"))) : 1;
}

/** Rebuild an ID from its track key and number, padded to that shape's width. */
export function makeId(trackKey, n) {
  return trackKey.startsWith("P")
    ? `${trackKey}-${String(n).padStart(3, "0")}`
    : `${trackKey}${String(n).padStart(2, "0")}`;
}

/**
 * Parse a Depends cell into phase IDs. Handles both shapes and ranges in either.
 *
 * Returns `{ ids, leftover }`. `leftover` is whatever remained after IDs, ranges and
 * punctuation were removed — non-empty means the cell contains prose, which the
 * integrity gate rejects. A Depends cell reading "all J" blocks nothing and is how
 * J26 came to be reported startable forever.
 */
export function parseDeps(raw) {
  if (!raw || raw === "—") return { ids: [], leftover: "" };
  const text = raw.replace(/\*\*/g, "");
  const out = new Set();
  let residue = text;

  const rangeRe = new RegExp(RANGE_SRC, "g");
  let m;
  while ((m = rangeRe.exec(text)) !== null) {
    const [full, letter, from2, prog, from3, to] = m;
    const trackKey = letter ?? `P${prog}`;
    const from = Number(from2 ?? from3);
    for (let n = from; n <= Number(to); n++) out.add(makeId(trackKey, n));
    residue = residue.replace(full, " ");
  }

  const single = new RegExp(String.raw`\b${PHASE_ID_SRC}\b`, "g");
  for (const id of residue.match(single) ?? []) out.add(id);

  const leftover = residue
    .replace(single, "")
    .replace(/[\s,;.()–-]|\(hard\)/gi, "");

  return { ids: [...out].sort(), leftover };
}
