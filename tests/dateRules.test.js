import moment from 'moment';
import { isDepartAllowed, isReturnAllowed, normalizeDay } from '../src/core/dateRules.js';

describe('dateRules', () => {
  test('normalizeDay returns startOf day moment', () => {
    const m = normalizeDay('2026-02-17T23:59:59');
    expect(m.format('YYYY-MM-DD HH:mm:ss')).toBe('2026-02-17 00:00:00');
  });

  test('depart allowed: yesterday=false, today=true, tomorrow=true', () => {
    const today = moment('2026-02-17');
    expect(isDepartAllowed('2026-02-16', today)).toBe(false);
    expect(isDepartAllowed('2026-02-17', today)).toBe(true);
    expect(isDepartAllowed('2026-02-18', today)).toBe(true);
  });

  test('return allowed respects today and depart', () => {
    const today = moment('2026-02-17');
    const dep = moment('2026-02-20');

    expect(isReturnAllowed('2026-02-16', today, dep)).toBe(false);
    expect(isReturnAllowed('2026-02-19', today, dep)).toBe(false);
    expect(isReturnAllowed('2026-02-20', today, dep)).toBe(true);
    expect(isReturnAllowed('2026-02-25', today, dep)).toBe(true);
  });
});
