# Trip Calendar

![Build](https://github.com/sergetfep/trip-calendar/actions/workflows/deploy.yml/badge.svg?branch=main&event=push)

GitHub Pages: https://sergetfep.github.io/trip-calendar/

## Что сделано

- Виджет выбора дат **туда / обратно** (переключатель туда-обратно)
- Дата **"туда" не раньше сегодняшней** (по времени браузера)
- **Сегодня** подсвечено
- Даты **до сегодняшней** недоступны
- Переключение месяца (prev/next)
- Дата **"обратно" не ранее даты "туда"**
- Для расчёта дат используется **moment**
- Автотесты: чистая логика + DOM (JSDOM)

## Команды

```bash
npm i
npm test
npm run build
npm start
```
