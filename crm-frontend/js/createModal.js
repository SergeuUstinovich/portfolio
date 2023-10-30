import { sendClientData } from "./apiClient.js";
import { createForm } from "./createForm.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";
import { createСlient } from "./createClientItem.js";



//модальное для создания
export function createModal() {
    const modal = document.createElement('div');
    const modalBox = document.createElement('div');
    const createForms = createForm();
    
    const contactItem = document.getElementsByClassName('contact');

    modal.classList.add('modal', 'side-modal', 'active-modal');
    modalBox.classList.add('modal__box', 'active-modal');

    modal.append(modalBox);
    modalBox.append(createForms.modalTitle, createForms.modalBtnClose, createForms.modalForm);
//событие добавление
    createForms.modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //проверка формы на правильность, вызов функции валидности
        if (!validateClientForm()) {
            return
        }

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');
        let contacts = [];
        let objClient = {};

        //проходимся по всем(без разницы type или value) и вкладываем их в массив
        for (let i = 0; i < contactTypes.length; i++) {
            //проверка на валидность контактов
            if (!validateClientContact(contactTypes[i], contactValues[i])) {
                return
            }
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value,
            });
        }
        
        objClient.lastName = createForms.inputLastname.value;
        objClient.name = createForms.inputName.value;
        objClient.surname = createForms.inputSurname.value;
        objClient.contacts = contacts;

        const spinner = document.querySelector('.modal__spinner');

        try { //если ответ на сервере тру во время загрузки, будет спиннер
            spinner.style.display = 'block';
            const data = await sendClientData(objClient, 'POST'); //сохраняем на серве
            setTimeout(() => { //добавляю задержку что бы *глазу приятнее было*
                document.getElementById('tbody').append(createСlient(data));//вкладываем в тело списка содержимое
                createForms.inputLastname.value = '';
                createForms.inputName.value = '';
                createForms.inputSurname.value = '';
                for (let i = contactItem.length - 1; i >= 0; i--) {
                    contactItem[i].remove();
                }
                document.querySelector('.modal__add').style.padding = '0 0';
                document.querySelector('.modal__add-btn').style.padding = '8px 0';
                document.querySelector('.modal__box').style.top = '50%';
                modal.remove();//закрываем модалку после вложения
            },1500); 
        } catch (error) { //если не загрузит выведет ошибку
            console.log(error);
        } finally { //скроет спиннер если всё хорошо
           setTimeout(() => spinner.style.display = 'none', 1500);
        }
        
    });
    
    createForms.btnClose.addEventListener('click' , (e) => {
        e.preventDefault()
        createForms.inputLastname.style.borderColor = 'var(--grey)';
        createForms.inputName.style.borderColor = 'var(--grey)';
        createForms.inputSurname.style.borderColor = 'var(--grey)';
        for(const item of createForms.errorClose) {
            item.textContent = '';
        }
        createForms.inputLastname.value = '';
        createForms.inputName.value = '';
        createForms.inputSurname.value = '';
        
        for (let i = contactItem.length - 1; i >= 0; i--) {
            contactItem[i].remove();
        }
        document.querySelector('.modal__add').style.padding = '0 0';
        document.querySelector('.modal__add-btn').style.padding = '8px 0';
        document.querySelector('.modal__box').style.top = '50%';
        document.querySelector('.modal__add-btn').classList.add('modal__add-btn--active');     
        modal.remove();//закрытие модалки на отмену
    });

    createForms.modalBtnClose.addEventListener('click' , () => {
        createForms.inputLastname.style.borderColor = 'var(--grey)';
        createForms.inputName.style.borderColor = 'var(--grey)';
        createForms.inputSurname.style.borderColor = 'var(--grey)';
        for(const item of createForms.errorClose) {
            item.textContent = '';
        }
        createForms.inputLastname.value = '';
        createForms.inputName.value = '';
        createForms.inputSurname.value = '';
        for (let i = contactItem.length - 1; i >= 0; i--) {
            contactItem[i].remove();
        }
        document.querySelector('.modal__add').style.padding = '0 0';
        document.querySelector('.modal__add-btn').style.padding = '8px 0';
        document.querySelector('.modal__box').style.top = '50%';
        document.querySelector('.modal__add-btn').classList.add('modal__add-btn--active');
        modal.remove();//закрытие модалки на крестик
    });

    document.addEventListener('click', (e) => {
        if(e.target == modal) {
            modal.remove();//закрытие модалки вне её окна
        }
    });

    return modal
}

