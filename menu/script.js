const menu = document.querySelector('ul.menu');
const categoryByLabel = new Map([
  ['Búsqueda de productos', 'Catálogo'],
  ['Registro de inventario', 'Inventario'],
  ['Indicador de PG', 'Indicadores'],
  ['Registro de niveles', 'Producción'],
  ['Registro de producción', 'Producción'],
  ['Registro de supervisión', 'Operaciones'],
  ['Consulta', 'Informes']
]);
const orderByLabel = new Map(Array.from(categoryByLabel.keys(), (label, index) => [label, index]));
const getLabel = item => {
  const label = item.querySelector('.menu-group-heading .label, a .label');
  return label?.firstChild?.textContent.trim() ?? '';
};

const menuItems = Array.from(menu.children).filter(item => getLabel(item) !== 'Registro de fallas');
menuItems.sort((firstItem, secondItem) => (orderByLabel.get(getLabel(firstItem)) ?? 99) - (orderByLabel.get(getLabel(secondItem)) ?? 99));

menu.replaceChildren(...menuItems);
menuItems.forEach(item => {
  const label = item.querySelector('.menu-group-heading .label, a .label');
  const category = categoryByLabel.get(label?.textContent.trim() ?? '');
  const content = label?.parentElement;
  if (!category || !content) return;

  const categoryElement = document.createElement('span');
  categoryElement.className = 'category';
  categoryElement.textContent = category;
  content.classList.add('item-copy');
  content.prepend(categoryElement);
});

document.querySelector('#module-count').textContent = `${String(menuItems.length).padStart(2, '0')} módulos`;

// Mantiene la vibracion tactil al pulsar las opciones del menu en dispositivos compatibles.
document.querySelectorAll('.item a').forEach(link => {
  link.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(10);
  });
});

const dateElement = document.querySelector('#current-date');
const timeElement = document.querySelector('#current-time');
const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});
const timeFormatter = new Intl.DateTimeFormat('es-MX', {
  hour: '2-digit', minute: '2-digit', hour12: true
});

function updateDateTime() {
  const now = new Date();
  const date = dateFormatter.format(now);
  dateElement.textContent = date.charAt(0).toLocaleUpperCase('es-MX') + date.slice(1);
  timeElement.textContent = timeFormatter.format(now).replace(' a. m.', ' a.m.').replace(' p. m.', ' p.m.');
}

updateDateTime();
setInterval(updateDateTime, 60_000);
