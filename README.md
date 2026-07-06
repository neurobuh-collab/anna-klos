# Анна Клос — сайт

Лендинг бухгалтера для малого бизнеса. Статический сайт, размещён на GitHub Pages.

**Живая версия:** https://neurobuh-collab.github.io/anna-klos/

## Как это работает

- `index.html` — страница (прототип на рантайме Claude Design `<x-dc>`).
- `support.js` — рантайм: подгружает React и Babel с CDN и рендерит шаблон в браузере.
- `image-slot.js` + `image-slots.state.json` — изображения (встроены как base64 в sidecar-файл).
- `.nojekyll` — отключает сборку Jekyll (иначе выражения `{{ … }}` в HTML ломаются).

Для корректного отображения нужен доступ в интернет (React и шрифты грузятся с CDN).
