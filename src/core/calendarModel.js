import moment from 'moment';
import { isDepartAllowed, isReturnAllowed, normalizeDay } from './dateRules.js';

export function buildMonthGrid({
  currentMonth,
  today,
  mode, // 'depart' | 'return'
  departDate,
  returnDate,
}) {
  const t = normalizeDay(today) || moment().startOf('day');
  const month = normalizeDay(currentMonth) || t.clone();
  const monthStart = month.clone().startOf('month');
  const gridStart = monthStart.clone().startOf('week');

  const dep = normalizeDay(departDate);
  const ret = normalizeDay(returnDate);

  const days = Array.from({ length: 42 }, (_, i) => {
    const date = gridStart.clone().add(i, 'day');

    const allowed = mode === 'return'
      ? isReturnAllowed(date, t, dep)
      : isDepartAllowed(date, t);

    return {
      iso: date.format('YYYY-MM-DD'),
      label: date.date(),
      inMonth: date.isSame(monthStart, 'month'),
      isToday: date.isSame(t, 'day'),
      disabled: !allowed,
      selected: (dep && date.isSame(dep, 'day')) || (ret && date.isSame(ret, 'day')),
    };
  });

  return {
    title: monthStart.format('MMMM YYYY'),
    monthIso: monthStart.format('YYYY-MM-DD'),
    days,
  };
}
