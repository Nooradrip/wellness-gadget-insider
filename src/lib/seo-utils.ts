// lib/seo-utils.ts
export function getKeywords(isDogArticle: boolean): string[] {
  const baseKeywords = ["pet supplies", "automatic feeder"];
  return isDogArticle
    ? [...baseKeywords, "dog feeder", "pet food", "pet friendly"]
    : [...baseKeywords, "cat feeder", "pet food", "pet friendly"];
}