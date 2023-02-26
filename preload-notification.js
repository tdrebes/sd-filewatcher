window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerHTML = text
  }

  let query = new URLSearchParams(global.location.search);
  let data = JSON.parse(query.get('data'));

  replaceText('notification_title', data.title ?? '')
  replaceText('notification_text', data.body ?? '');
})
