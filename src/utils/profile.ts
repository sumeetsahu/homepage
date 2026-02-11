/**
 * Years of experience from career start date (YYYY-MM).
 * Uses month precision; e.g. "2007-06" = June 2007.
 */
export function getYearsOfExperience(careerStartDate: string): number {
  const [y, m] = careerStartDate.split('-').map(Number);
  if (!y || Number.isNaN(y)) return 0;
  const start = new Date(y, (m || 1) - 1, 1);
  const now = new Date();
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(years);
}

/** Resolves {{years}} placeholder in a string using career start date. */
export function resolveYearsPlaceholder(
  text: string,
  careerStartDate: string | undefined
): string {
  if (!careerStartDate || !text.includes('{{years}}')) return text;
  const years = getYearsOfExperience(careerStartDate);
  return text.replace(/\{\{years\}\}/g, String(years));
}

/** Resolves headline stat value; supports "{{years}}+" for experience. */
export function resolveHeadlineStatValue(
  value: string,
  careerStartDate: string | undefined
): string {
  if (!careerStartDate) return value;
  if (value === '{{years}}+' || value.includes('{{years}}')) {
    const years = getYearsOfExperience(careerStartDate);
    return value.replace(/\{\{years\}\}/g, String(years));
  }
  return value;
}
