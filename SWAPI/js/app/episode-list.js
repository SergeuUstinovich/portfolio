// eslint-disable-next-line import/extensions
import { onLinkClick } from '../main.js';

// Соотношение ID и номеров эпизодов
const episodeMap = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
};

// Создать список эпизодов
function createEpisodeList() {
  const episodeList = document.createElement('ul');
  episodeList.classList.add('episode-list', 'list-reset');

  return episodeList;
}

// Создать элемент списка эпизодов
function createEpisodeItem(episode, number) {
  const id = episode.episode_id;
  // Элемент списка
  const item = document.createElement('li');
  item.classList.add('episode-item', 'mb-2', 'alert', 'alert-primary');
  // Ссылка на эпизод
  const link = document.createElement('a');
  link.classList.add('episode-link');
  link.innerText = `Episode ${episodeMap[id] || ''} ${episode.title}`;
  link.href = `?episodeID=${number}`;

  link.addEventListener('click', (e) => {
    onLinkClick(e);
  });

  item.append(link);
  return item;
}

// eslint-disable-next-line import/prefer-default-export
export function render(data) {
  const content = document.createElement('div');
  content.classList.add('episodes-content', 'container', 'col-lg-4', 'shadow-lg', 'p-5', 'rounded-3');

  // Получаем объекты эпизодов
  const episodes = data.results || [];
  // Создать заголовок
  const title = document.createElement('h2');
  title.classList.add('section-title', 'text-center', 'mb-4');
  title.innerHTML = 'Episodes';

  // Создать список эпизодов
  const episodeList = createEpisodeList();

  // Добавляем эпизоды в список
  let number = 0;
  for (const episode of episodes) {
    number++;
    const episodeItem = createEpisodeItem(episode, number);
    episodeList.append(episodeItem);
  }

  content.append(title);
  content.append(episodeList);

  return content;
}
