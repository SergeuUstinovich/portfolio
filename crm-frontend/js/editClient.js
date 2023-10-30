import { sendClientData } from "./apiClient.js";
import { createContactItem } from "./createContact.js";
import { createForm } from "./createForm.js";
import { deleteClientModal } from "./createModalDelete.js";
import { createСlient } from "./createClientItem.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

//модалка изменения
export function editClientModal(data) {
    const editModal = document.createElement('div');
    const editModalContent = document.createElement('div');
    const titleId = document.createElement('span');
    const createForms = createForm();


    editModal.classList.add('modal', 'active-modal');
    editModalContent.classList.add('modal__box', 'active-modal');
    titleId.classList.add('modal__id');
    //меняем пару полей
    titleId.textContent = 'ID: ' + data.id.substr(0, 6);
    createForms.modalTitle.textContent = 'Изменить данные';
    createForms.btnClose.textContent = 'Удалить клиента';

    createForms.btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        //вызов удаления с сервера
        const modalDelete = deleteClientModal();
        document.body.append(modalDelete.deleteModal); //вложение в тело окна удаления
        //вызов окна удаления
        modalDelete.deleteModalDelete.addEventListener('click', () => {
            import('./apiClient.js').then(({deleteClientItem}) => {
                try { //описание есть на подобных кусках кода
                    modalDelete.deleteSpinner.style.display = 'block';
                    setTimeout(() => { //искуственный для того что бы замечать
                        deleteClientItem(data.id); //удаляем с сервера
                        document.getElementById(data.id).remove(); //удаляем с DOM
                        modalDelete.deleteModal.remove();//закрытие модалки удаления
                        editModal.remove();  //закрытие модалки изменения
                    }, 1500)
                } catch (error) {
                    console.log(error);
                } finally {
                    setTimeout(() => modalDelete.deleteSpinner.style.display = 'none', 1500)
                }
                
            })
        
        })
    })
    //принимаем значение с сервера в поля изменения//сама функция вызывается в создании клиента
    createForms.inputLastname.value = data.lastName;
    createForms.inputName.value = data.name;
    createForms.inputSurname.value = data.surname;
//перебирает весь массив в объекте и отрисовывает в модалке изменения
    createForms.contactAddBlock.textContent = '';
    for (const contact of data.contacts) {
        const createContact = createContactItem();

        createContact.contactName.textContent = contact.type;
        createContact.contactInput.value = contact.value;

        if (createContact.contactInput.value == contact.value) {
            createContact.contactBtnDel.style.display = 'flex'
            createContact.contactInput.classList.add('contact__input--border');
         }

        createForms.contactAddBlock.append(createContact.contact);

    }
//проверка на 10 контактов в массиве и удаление кнопки
    if (data.contacts.length == 10) {
        createForms.contactBtnAdd.classList.remove('modal__add-btn--active');
    }
    
    if (data.contacts.length > 0) {
        createForms.contactAdd.style.padding = '25px 0';
        createForms.contactBtnAdd.style.padding = '10px 0 0'
    }

    
    
    
        
    
    
//вызов формы изменения
    createForms.modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
//валидация в форме
        if (!validateClientForm()) {
            return
        }

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');

        let contacts = [];
        let client = {};

        for(let i = 0; i < contactTypes.length; i++){
            //валидация контактов
            if (!validateClientContact(contactTypes[i], contactValues[i])) {
                return
            }
            //в случае изменения новых контактов
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value
            });
        };
        //изменение в форме
        client.name = createForms.inputName.value;
        client.surname = createForms.inputSurname.value;
        client.lastName = createForms.inputLastname.value;
        client.contacts = contacts;
        //отправка на сервер новых изменений по id
        
        const spinner = document.querySelector('.modal__spinner');
        try { //если ответ на сервере тру во время загрузки, будет спиннер
            spinner.style.display = 'block';
            const editData = await sendClientData(client, 'PATCH', data.id);
            setTimeout(() => { //добавляю задержку что бы *глазу приятнее было*
                document.getElementById(editData.id).remove();//удаление старого изменения в DOM
                document.getElementById('tbody').prepend(createСlient(editData)); //отрисовка нового 
                editModal.remove(); //закрытие модалки
            },1500); 
        } catch (error) { //если не загрузит выведет ошибку
            console.log(error);
        } finally { //скроет спиннер если всё хорошо
           setTimeout(() => spinner.style.display = 'none', 1500);
        }
        
    })

    createForms.modalBtnClose.addEventListener('click', () => {
        createForms.inputLastname.value = data.lastName;
        createForms.inputName.value = data.name;
        createForms.inputSurname.value = data.surname;
        //перебирает весь массив в объекте и отрисовывает в модалке изменения
        createForms.contactAddBlock.textContent = '';
        for (const contact of data.contacts) {
        const createContact = createContactItem();

        createContact.contactName.textContent = contact.type;
        createContact.contactInput.value = contact.value;

        if (createContact.contactInput.value == contact.value) {
            createContact.contactBtnDel.style.display = 'flex'
            createContact.contactInput.classList.add('contact__input--border');
         }

        createForms.contactAddBlock.append(createContact.contact);

        }
        
        editModal.remove(); //закрытие модалки на крестик
    })

    document.addEventListener('click', (e) => {
        if (e.target === editModal) { //закрытие модалки вне нажатии его
            editModal.remove();
        }
    })


    createForms.modalTitle.append(titleId);
    editModalContent.append(createForms.modalBtnClose, createForms.modalTitle, createForms.modalForm);
    editModal.append(editModalContent);

    return {
        editModal,
        editModalContent,
    }
}