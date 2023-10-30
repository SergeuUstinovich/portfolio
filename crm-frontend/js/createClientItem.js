import { deleteClientModal } from "./createModalDelete.js";
import { editClientModal } from "./editClient.js";
import { createContactItemByType, formatDate, formatTime } from "./editDate.js";
import { btnCancel, svgSpinSave } from "./globalSvg.js";

//создание инфо о клиенте
export function createСlient(objClient) {
    //создание строки и ячеек
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdFio = document.createElement('td');
    const tdDateCreate = document.createElement('td');
    const dateCreateSpan = document.createElement('span');
    const timeCreateSpan = document.createElement('span');
    const tdLastChange = document.createElement('td');
    const dateChangeSpan = document.createElement('span');
    const timeChangeSpan = document.createElement('span');
    const tdContacts = document.createElement('td');
    const tdAction = document.createElement('td');
    const editSpinner = document.createElement('span');

    //кнопки изменение и удаление
    const btnChange = document.createElement('button');
    const btnDelete = document.createElement('button');

    const deleteClient = deleteClientModal();
    const changeClient = editClientModal(objClient);
    

    //Добавление класса строке и ячейкам
    editSpinner.classList.add('actions__spinner');
    tr.classList.add('body__list');
    tdId.classList.add('body__item', 'body__item-id');
    tdFio.classList.add('body__item');
    tdDateCreate.classList.add('body__item');
    tdLastChange.classList.add('body__item');
    tdContacts.classList.add('body__item');
    tdAction.classList.add('body__item');

    dateCreateSpan.classList.add('created__date');
    timeCreateSpan.classList.add('created__time');
    dateChangeSpan.classList.add('change__date');
    timeChangeSpan.classList.add('change__time');

    //классы на кнопки
    btnChange.classList.add('btn-reset', 'marg-btn');
    btnDelete.classList.add('btn-reset', 'btn__delete');  

    //при помощи цикла вкладываем наши type и valye в ячейку контактов
    //отрисовываем первые 4 элемента
    for (let i = 0; i < 4; i++) {
        const contact = objClient.contacts[i];
        if(contact) { //делаем проверку что они не пустые
            createContactItemByType(contact.type, contact.value, tdContacts);
        }
        
    }
    if (objClient.contacts.length > 4) { //если элементов больше 4 создаётся кнопка
        const buttonContact = document.createElement('button');
        buttonContact.classList.add('btn-reset', 'contact-btn');
        buttonContact.textContent = '+' + (objClient.contacts.length - 4);
        tdContacts.append(buttonContact);
        buttonContact.addEventListener('click', () => { //вешаем событие на кнопку и при нажатии отрисовываем остальное
            for (let i = 4; i < objClient.contacts.length; i++) {
                const contact = objClient.contacts[i];
                createContactItemByType(contact.type, contact.value, tdContacts)
            }
            if (objClient.contacts.length > 4) { // удаляем кнопку
                buttonContact.remove();
            }
        })
    } 
    
    //удаление клиента функция на кнопку удалить на сервере
    function deleteById() {
        import('./apiClient.js').then(({ deleteClientItem }) => {
            deleteClient.deleteModalDelete.addEventListener('click', () => {
                try {
                    deleteClient.deleteSpinner.style.display = 'block';
                    setTimeout(() => { //искуственный для того что бы замечать
                        document.getElementById(objClient.id).remove();//удаление с DOM дерева
                        deleteClientItem(objClient.id);//удаление на серве
                        deleteClient.deleteModal.remove(); //закрытие модалки
                    }, 1500)
                } catch (error) {
                    console.log(error);
                } finally {
                    setTimeout(() => deleteClient.deleteSpinner.style.display = 'none', 1500)
                }
                
            });
        });
    }

    btnDelete.addEventListener('click', () => { //удаление клиента по нажатию на кнопку удалить, на сервере
        deleteById()
        document.body.append(deleteClient.deleteModal)//вызов модалки
    })

    btnChange.addEventListener('click', () => { //изменение клиента
        editSpinner.style.display = 'block';
        btnChange.classList.add('action-wait');
        setTimeout(() => {
            document.body.append(changeClient.editModal) //открытие модалки изменения
            editSpinner.style.display = 'none';
            btnChange.classList.remove('action-wait');
        },1500)
        
    })
    //добавление с объекта в текстовый контент
    tr.id = objClient.id; //для удобства удаление с дом дерева без полной отрисовки
    tdId.textContent = objClient.id.substr(0, 12);
    tdFio.textContent = objClient.lastName + ' ' + objClient.name + ' ' + objClient.surname;
    //вызов функции изменения формата даты
    dateCreateSpan.textContent = formatDate(objClient.createdAt);
    timeCreateSpan.textContent = formatTime(objClient.createdAt);
    dateChangeSpan.textContent = formatDate(objClient.updatedAt);
    timeChangeSpan.textContent = formatTime(objClient.updatedAt);

    editSpinner.innerHTML = svgSpinSave;
    btnChange.innerHTML = 'Изменить';
    btnDelete.innerHTML = btnCancel + 'Удалить';
    
    tr.append(tdId);
    tr.append(tdFio);
    tr.append(tdDateCreate);
    tr.append(tdLastChange);
    tr.append(tdContacts);
    tr.append(tdAction);

    tdDateCreate.append(dateCreateSpan, timeCreateSpan);
    tdLastChange.append(dateChangeSpan, timeChangeSpan);
    
    btnChange.append(editSpinner);
    tdAction.append(btnChange);
    tdAction.append(btnDelete);

    return tr
    
}