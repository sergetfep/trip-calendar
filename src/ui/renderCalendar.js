const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function renderCalendar(container, model) {
  container.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'cal-head';

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'icon-btn';
  prev.dataset.action = 'prev';
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'icon-btn';
  next.dataset.action = 'next';
  next.textContent = '›';

  const title = document.createElement('div');
  title.className = 'cal-head__title';
  title.textContent = model.title;

  head.append(prev, title, next);

  const dowRow = document.createElement('div');
  dowRow.className = 'grid';
  DOW.forEach((d) => {
    const el = document.createElement('div');
    el.className = 'dow';
    el.textContent = d;
    dowRow.append(el);
  });

  const grid = document.createElement('div');
  grid.className = 'grid';

  model.days.forEach((day) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'day';
    btn.dataset.date = day.iso;

    if (!day.inMonth) btn.classList.add('day--other');
    if (day.disabled) btn.classList.add('day--disabled');
    if (day.isToday) btn.classList.add('day--today');
    if (day.selected) btn.classList.add('day--selected');

    btn.textContent = String(day.label);
    btn.disabled = day.disabled;
    grid.append(btn);
  });

  container.append(head, dowRow, grid);
}
