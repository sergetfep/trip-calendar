import moment from 'moment';
import { buildMonthGrid } from '../src/core/calendarModel.js';

describe('calendarModel', () => {
  test('buildMonthGrid returns 42 days and correct title', () => {
    const today = moment('2026-02-17');
    const model = buildMonthGrid({
      currentMonth: moment('2026-02-01'),
      today,
      mode: 'depart',
      departDate: null,
      returnDate: null,
    });

    expect(model.days).toHaveLength(42);
    expect(typeof model.title).toBe('string');
  });

  test('days before today are disabled in depart mode', () => {
    const today = moment('2026-02-17');
    const model = buildMonthGrid({
      currentMonth: moment('2026-02-01'),
      today,
      mode: 'depart',
      departDate: null,
      returnDate: null,
    });

    const feb16 = model.days.find((d) => d.iso === '2026-02-16');
    const feb17 = model.days.find((d) => d.iso === '2026-02-17');

    expect(feb16).toBeTruthy();
    expect(feb17).toBeTruthy();

    expect(feb16.disabled).toBe(true);
    expect(feb17.disabled).toBe(false);
    expect(feb17.isToday).toBe(true);
  });

  test('return mode disables dates before depart', () => {
    const today = moment('2026-02-17');
    const dep = moment('2026-02-20');
    const model = buildMonthGrid({
      currentMonth: moment('2026-02-01'),
      today,
      mode: 'return',
      departDate: dep,
      returnDate: null,
    });

    const feb19 = model.days.find((d) => d.iso === '2026-02-19');
    const feb20 = model.days.find((d) => d.iso === '2026-02-20');

    expect(feb19).toBeTruthy();
    expect(feb20).toBeTruthy();

    expect(feb19.disabled).toBe(true);
    expect(feb20.disabled).toBe(false);
  });
});
