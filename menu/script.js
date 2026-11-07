// Limpia preferencias anteriores para forzar modo 100% automatico por sistema.
localStorage.removeItem('theme');
localStorage.removeItem('themePreference');

// Mantiene la vibracion tactil al pulsar las opciones del menu en dispositivos compatibles.
document.querySelectorAll('.item a').forEach(link => {
  link.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(10);
  });
});

const dateElement = document.querySelector('#current-date');
const timeElement = document.querySelector('#current-time');
const dateFormatter = new Intl.DateTimeFormat('es', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});
const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
});

function updateDateTime() {
  const now = new Date();
  dateElement.textContent = dateFormatter.format(now);
  timeElement.textContent = timeFormatter.format(now).replace(/\u202f/g, ' ');
}

updateDateTime();
setInterval(updateDateTime, 1000);
