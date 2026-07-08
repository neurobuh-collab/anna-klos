/**
 * Telegram-релей для формы-заявки сайта «Анна Клос».
 * Принимает POST с сайта и пересылает заявку в Telegram-бот.
 * Токен бота хранится ЗДЕСЬ, на стороне Google, и не попадает в публичный код сайта.
 *
 * Как развернуть (≈2 минуты):
 *   1. Откройте https://script.google.com → «Новый проект».
 *   2. Удалите пример кода и вставьте весь этот файл.
 *   3. Впишите BOT_TOKEN и CHAT_ID ниже (см. TELEGRAM-SETUP.md).
 *   4. «Развернуть» → «Новое развёртывание» → тип «Веб-приложение».
 *        • Запуск от имени: Я
 *        • У кого есть доступ: Все (Anyone)
 *   5. Скопируйте URL веб-приложения (заканчивается на /exec) и пришлите разработчику.
 */

const BOT_TOKEN = 'PASTE_BOT_TOKEN_HERE'; // от @BotFather, напр. 123456789:AAE...
const CHAT_ID   = 'PASTE_CHAT_ID_HERE';   // куда слать заявки, напр. 123456789 или -1001234567890 для группы

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var esc = function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    var lines = [
      '<b>🆕 Заявка с сайта</b>',
      '',
      '<b>Имя:</b> ' + esc(data.name),
      '<b>Контакт:</b> ' + esc(data.contact),
      '<b>Статус:</b> ' + esc(data.status),
      '<b>Задача:</b> ' + esc(data.task),
    ];
    if (data.page) lines.push('', '<i>' + esc(data.page) + '</i>');

    UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      payload: JSON.stringify({
        chat_id: CHAT_ID,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Позволяет проверить, что релей жив: откройте /exec в браузере — увидите "OK".
function doGet() {
  return ContentService.createTextOutput('OK');
}
