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
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
});
const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
});

function updateDateTime() {
  const now = new Date();
  dateElement.textContent = dateFormatter.format(now);
  const timeParts = timeFormatter.formatToParts(now);
  const timeValues = Object.fromEntries(timeParts.map(({ type, value }) => [type, value]));
  const meridiem = timeValues.dayPeriod.toLowerCase() === 'am' ? 'a.m.' : 'p.m.';
  timeElement.textContent = `${timeValues.hour}:${timeValues.minute}:${timeValues.second} ${meridiem}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);
