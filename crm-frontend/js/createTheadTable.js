import { sortTextDown, sortTextUp } from "./globalSvg.js";
//создание шапки
export function createTheadTable () {
    //Создание строки заголовка и ячейки
    const tr = document.createElement('tr');
    const tdId = document.createElement('th');
    const tdFio = document.createElement('th');
    const tdDateCreate = document.createElement('th');
    const tdLastChange = document.createElement('th');
    const tdContacts = document.createElement('th');
    const tdAction = document.createElement('th');

    //Вложение внутри ячейки
    const btnId = document.createElement('button');
    const btnFio = document.createElement('button');
    const btnDateCreate = document.createElement('button');
    const btnLastChange = document.createElement('button');

    const spanAbc = document.createElement('span');

    const sortDisplay = [tdId, tdFio, tdDateCreate, tdLastChange];

    for ( const item of sortDisplay) {
        item.addEventListener('click', () => {
            if (item.classList.contains('sort-down')) {
                item.classList.remove('sort-down');
                item.classList.add('sort-up');
                if (spanAbc.textContent === sortTextDown){
                    spanAbc.textContent = sortTextUp; 
                }
            } else {
                item.classList.add('sort-down');
                item.classList.remove('sort-up');
                if (spanAbc.textContent === sortTextUp) {
                    spanAbc.textContent = sortTextDown; 
                }
            }
        });
    };

    //добавление класса строке заголовка и ячейкам
    tdId.setAttribute('data-type', 'id');
    tdFio.setAttribute('data-type', 'text');
    tdDateCreate.setAttribute('data-type', 'create');
    tdLastChange.setAttribute('data-type', 'update');

    tr.classList.add('title__row');
    tdId.classList.add('cell__title', 'sort-down', 'cell__title-id');
    tdFio.classList.add('cell__title', 'sort-down', 'cell__title-fio');
    tdDateCreate.classList.add('cell__title', 'sort-down', 'cell__title-create');
    tdLastChange.classList.add('cell__title', 'sort-down', 'cell__title-change');
    tdContacts.classList.add('cell__title');
    tdAction.classList.add('cell__title');
    
    //добавление класса внутри ячейки
    btnId.classList.add('cell__container', 'btn-reset');
    btnFio.classList.add('cell__container', 'cell__container-add', 'btn-reset');
    btnDateCreate.classList.add('cell__container', 'btn-reset');
    btnLastChange.classList.add('cell__container', 'btn-reset');

    spanAbc.classList.add('abc-direction');
  
    //Добавление контента
    
    btnId.id = 'btnId';
    btnFio.id = 'btnFio';
    btnDateCreate.id = 'btnDateCreate';
    btnLastChange.id = 'btnLastChange';

    spanAbc.textContent = sortTextUp;
    btnId.innerHTML = 'ID';
    btnFio.innerHTML = 'Фамилия Имя Отчество';
    btnDateCreate.innerHTML = 'Дата и время создания';
    btnLastChange.innerHTML = 'Последние изменение';
    tdContacts.textContent = 'Контакты';
    tdAction.textContent = 'Действия';
    

    //вложение ячеек в строку
    tr.append(tdId);
    tr.append(tdFio);
    tr.append(tdDateCreate);
    tr.append(tdLastChange);
    tr.append(tdContacts);
    tr.append(tdAction);

    //вложение в ячейку
    tdId.append(btnId);
    tdFio.append(btnFio);
    tdDateCreate.append(btnDateCreate);
    tdLastChange.append(btnLastChange);

    btnFio.append(spanAbc);

    return {
        tr,
        btnId,
        btnFio,
        btnDateCreate,
        btnLastChange,
        spanAbc,
    };
}