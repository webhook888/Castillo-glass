export const BRAND_NAME_REGEX = /(Castillo['']?s Glass(?: Services)?)/gi;

export function isBrandSegment(text) {
  return /Castillo['']?s Glass(?: Services)?/i.test(text);
}
