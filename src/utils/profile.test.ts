import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getYearsOfExperience,
  resolveYearsPlaceholder,
  resolveHeadlineStatValue,
} from './profile';

// ---------------------------------------------------------------------------
// getYearsOfExperience
// ---------------------------------------------------------------------------
describe('getYearsOfExperience', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 for an empty string', () => {
    expect(getYearsOfExperience('')).toBe(0);
  });

  it('returns 0 for a non-date string', () => {
    expect(getYearsOfExperience('not-a-date')).toBe(0);
  });

  it('computes full years correctly using month precision', () => {
    // Mock today as 1 Sep 2025 → 18 full years since June 2007
    vi.setSystemTime(new Date('2025-09-01'));
    expect(getYearsOfExperience('2007-06')).toBe(18);
  });

  it('does not count a partial year', () => {
    // Mock today as 1 Jan 2025 → still 17 full years since June 2007
    vi.setSystemTime(new Date('2025-01-01'));
    expect(getYearsOfExperience('2007-06')).toBe(17);
  });

  it('handles a date with only a year (defaults to January)', () => {
    // '2020' → Jan 2020; mock today 15 Jun 2027 → 7 full years
    vi.setSystemTime(new Date('2027-06-15'));
    expect(getYearsOfExperience('2020')).toBe(7);
  });

  it('returns 0 when less than one full year has passed', () => {
    vi.setSystemTime(new Date('2024-03-01'));
    expect(getYearsOfExperience('2024-01')).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// resolveYearsPlaceholder
// ---------------------------------------------------------------------------
describe('resolveYearsPlaceholder', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-09-01'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns original text when careerStartDate is undefined', () => {
    expect(resolveYearsPlaceholder('Hello {{years}}', undefined)).toBe('Hello {{years}}');
  });

  it('returns original text when no placeholder is present', () => {
    expect(resolveYearsPlaceholder('Hello world', '2007-06')).toBe('Hello world');
  });

  it('replaces {{years}} with the computed year count', () => {
    expect(resolveYearsPlaceholder('{{years}}+ years of experience', '2007-06')).toBe(
      '18+ years of experience'
    );
  });

  it('replaces all occurrences of {{years}}', () => {
    expect(resolveYearsPlaceholder('{{years}} years ({{years}}+)', '2007-06')).toBe('18 years (18+)');
  });
});

// ---------------------------------------------------------------------------
// resolveHeadlineStatValue
// ---------------------------------------------------------------------------
describe('resolveHeadlineStatValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-09-01'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns value unchanged when careerStartDate is undefined', () => {
    expect(resolveHeadlineStatValue('{{years}}+', undefined)).toBe('{{years}}+');
  });

  it('replaces {{years}}+ with computed value', () => {
    expect(resolveHeadlineStatValue('{{years}}+', '2007-06')).toBe('18+');
  });

  it('replaces {{years}} inline in a string', () => {
    expect(resolveHeadlineStatValue('{{years}} Years', '2007-06')).toBe('18 Years');
  });

  it('returns a plain value unchanged', () => {
    expect(resolveHeadlineStatValue('8K+', '2007-06')).toBe('8K+');
  });

  it('returns $600K+ unchanged', () => {
    expect(resolveHeadlineStatValue('$600K+', '2007-06')).toBe('$600K+');
  });
});
