import { findClient } from "./apiClient.js";
import { createСlient } from "./createClientItem.js";

export function searchClients(clients) { //функция создаёт выпадающий список
    const findList = document.querySelector('.find-list');
    const input = document.getElementById('input__search');

    clients.forEach(client => { //циклом пробегаемся по выпадающему списку
        const findItem = document.createElement('li');
        const findLink = document.createElement('a');

        findItem.classList.add('find-list__item');
        findLink.classList.add('find-list__link');

        findLink.textContent = `${client.lastName} ${client.name} ${client.surname}`;
        findLink.href = '#';

        findItem.append(findLink);
        findList.append(findItem);//добавляем элементы в HTML
    });
    //поиск по массиву, функцию получаем с api она с сервера данные передаёт сюда
    async function rewriteTable(str) {
        const response = await findClient(str);
        const tbody = document.querySelector('.tbody');
        tbody.innerHTML = '';

        for (const client of response) {//обычный рендер
            tbody.append(createСlient(client));
        }
    }

    input.addEventListener('input', async () => {
        const value = input.value.trim();
        const foundItems = document.querySelectorAll('.find-list__link');

        if (value !== '') { //если значение в поле не пустое отрисовываем
            rewriteTable(value);

            foundItems.forEach(link => {//если в поле ничего нет, прячем выпадающий список
                if (link.innerText.search(value) == -1) {
                    link.classList.add('hide');
                    link.innerHTML = link.innerText;
                } else {//если в поле что то есть, показываем список
                    link.classList.remove('hide');
                    findList.classList.remove('hide');
                    const str = link.innerText;
                    // link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
                }
            });
        } else {
            foundItems.forEach(link => {
                const tbody = document.querySelector('.tbody');
                tbody.innerHTML = '';
                //отрисовываем получившийся список
                clients.forEach(client => tbody.append(createСlient(client)));

                link.classList.remove('hide');
                findList.classList.add('hide');
                link.innerHTML = link.innerText;
            });
        }
    });
    //фукнция выделяет маркером
    // function insertMark(str, pos, len){
    //    return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len); 
    // } 
}