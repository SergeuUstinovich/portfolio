// eslint-disable-next-line import/extensions,import/named
import { helpers } from './helpers.js';

// Стили Bootstrap
const BOOTSTRAP_SRC = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css';

// Получить массив ресурсов страницы эпизода
function getEpisodeSources(id) {
  return [
    './app/episode.js',
    './css/episode.css',
    `https://swapi.dev/api/films/${id}`,
    BOOTSTRAP_SRC,
  ];
}
// Получить массив ресурсов страницы списка эпизодов
function getEpisodeListSources() {
  return [
    './app/episode-list.js',
    './css/episode-list.css',
    'https://swapi.dev/api/films',
    BOOTSTRAP_SRC,
  ];
}

function init(containerID) {
  // Контейнер приложения
  const appContainer = document.getElementById(containerID);
  // Параметры GET-запроса
  const searchParams = new URLSearchParams(window.location.search);
  // ID эпизода из GET-запроса
  const episodeID = searchParams.get('episodeID');
  // Подключаемые ресурсы, в зависимости от типа страницы
  const sources = episodeID ? getEpisodeSources(episodeID) : getEpisodeListSources();
  // Отрисовка страницы
  helpers.renderPage(appContainer, sources);
}

// eslint-disable-next-line import/prefer-default-export
export function onLinkClick(e) {
  e.preventDefault();
  const link = e.currentTarget;
  window.history.pushState(null, '', link.href);
  link.innerHTML = '';
  link.classList.add('spinner-grow');
  const list = document.querySelector('.episode-list');
  if (list) list.classList.add('blocked');

  init('app');
}

// Запуск приложения
init('app');

// Обработчик события popstate
window.addEventListener('popstate', () => {
  console.log('popstate');
  init('app');
});
