import moment from 'moment';

export function normalizeDay(input) {
  if (!input) return null;
  return moment(input).startOf('day');
}

export function isDepartAllowed(date, today) {
  const d = normalizeDay(date);
  const t = normalizeDay(today) || moment().startOf('day');
  return !d.isBefore(t, 'day');
}

export function isReturnAllowed(date, today, departDate) {
  const d = normalizeDay(date);
  const t = normalizeDay(today) || moment().startOf('day');
  if (d.isBefore(t, 'day')) return false;
  const dep = normalizeDay(departDate);
  if (!dep) return true;
  return !d.isBefore(dep, 'day');
}
