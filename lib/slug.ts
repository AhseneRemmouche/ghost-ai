/**
 * Convert a free-form project name into a URL-safe slug.
 *
 * Lowercases, strips diacritics and symbols, and collapses runs of
 * non-alphanumeric characters into single hyphens. Pure and synchronous so the
 * Create dialog can render a live preview as the user types.
 */

// Combining diacritical marks (U+0300–U+036F), separated from a base glyph by
// NFKD normalization. Built via RegExp to keep the source clean ASCII.
const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(name: string): string {
  return name
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric runs → single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading / trailing hyphens
}
