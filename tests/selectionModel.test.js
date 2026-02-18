import moment from 'moment';
import SelectionModel from '../src/core/selectionModel.js';

describe('SelectionModel', () => {
  test('selectDate sets depart and switches to return when roundtrip on', () => {
    const m = new SelectionModel({ today: moment('2026-02-17') });
    m.setActiveField('depart');

    expect(m.selectDate('2026-02-20')).toBe(true);
    expect(m.departDate.format('YYYY-MM-DD')).toBe('2026-02-20');
    expect(m.activeField).toBe('return');
  });

  test('selectDate rejects depart before today', () => {
    const m = new SelectionModel({ today: moment('2026-02-17') });
    m.setActiveField('depart');
    expect(m.selectDate('2026-02-16')).toBe(false);
    expect(m.departDate).toBe(null);
  });

  test('return cannot be before depart', () => {
    const m = new SelectionModel({ today: moment('2026-02-17') });
    m.setActiveField('depart');
    m.selectDate('2026-02-20');

    // now activeField return
    expect(m.selectDate('2026-02-19')).toBe(false);
    expect(m.returnDate).toBe(null);

    expect(m.selectDate('2026-02-20')).toBe(true);
    expect(m.returnDate.format('YYYY-MM-DD')).toBe('2026-02-20');
  });

  test('turning roundtrip off clears return', () => {
    const m = new SelectionModel({ today: moment('2026-02-17') });
    m.setActiveField('depart');
    m.selectDate('2026-02-20');
    m.selectDate('2026-02-22');

    expect(m.returnDate.format('YYYY-MM-DD')).toBe('2026-02-22');

    m.setRoundtrip(false);
    expect(m.returnDate).toBe(null);
    expect(m.activeField).toBe('depart');
  });
});
