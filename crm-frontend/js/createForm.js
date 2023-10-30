import { createContactItem } from "./createContact.js";
import { btnAddFormContact, btnCloseForm, svgSpinSave } from "./globalSvg.js";
//форма для модалки создать/изменить
export function createForm() {
    const modalForm = document.createElement('form');
    const modalFormContainer = document.createElement('div');
    const modalTitle = document.createElement('h3');
    const modalBtnClose = document.createElement('button');
    const divLastnameWrapper = document.createElement('div');
    const divNameWrapper = document.createElement('div');
    const divsurameWrapper = document.createElement('div');
    const labelLastname = document.createElement('label');
    const labelSpanLastname = document.createElement('span');
    const labelName = document.createElement('label');
    const labelSpanName = document.createElement('span');
    const labelsurname = document.createElement('label');
    const inputLastname = document.createElement('input');
    const inputName = document.createElement('input');
    const inputSurname = document.createElement('input');
    const contactAdd = document.createElement('div');
    const contactAddBlock = document.createElement('div');
    const contactBtnAdd = document.createElement('button');
    const btnSaveCloseContainer = document.createElement('div');
    const btnSave = document.createElement('button');
    const btnClose = document.createElement('button');

    const saveSpinner = document.createElement('span');

    const errorBlock = document.createElement('p');
    const unacceptableLetter = document.createElement('span');
    const writeName = document.createElement('span');
    const writeSurname = document.createElement('span');
    const writeLastName = document.createElement('span');
    const requiredValue = document.createElement('span');
    const requiredContacts = document.createElement('span');
    const apiError = document.createElement('span');

    const errorClose = [unacceptableLetter, writeName, writeSurname, writeLastName, requiredValue, requiredContacts]

    saveSpinner.classList.add('modal__spinner');
    errorBlock.classList.add('modal__error');
    modalForm.classList.add('modal__form');
    modalFormContainer.classList.add('modal__form-container');
    modalTitle.classList.add('modal__title');
    modalBtnClose.classList.add('btn__close', 'btn-reset');
    divLastnameWrapper.classList.add('input-wrapper');
    divNameWrapper.classList.add('input-wrapper');
    divsurameWrapper.classList.add('input-wrapper');
    labelLastname.classList.add('modal__label');
    labelSpanLastname.classList.add('label-span');
    labelName.classList.add('modal__label');
    labelSpanName.classList.add('label-span');
    labelsurname.classList.add('modal__label');
    inputLastname.classList.add('modal__input');
    inputName.classList.add('modal__input');
    inputSurname.classList.add('modal__input');
    contactAdd.classList.add('modal__add');
    contactAddBlock.classList.add('modal__add-block')
    contactBtnAdd.classList.add('modal__add-btn', 'btn-reset', 'modal__add-btn--active');
    btnSaveCloseContainer.classList.add('modal__container-btn');
    btnSave.classList.add('modal__save', 'btn-reset');
    btnClose.classList.add('modal__close', 'btn-reset');

    labelLastname.for = 'modalLastName';
    labelName.for = 'modalName';
    labelsurname.for = 'modalSurName';
    inputLastname.id = 'modalLastName';
    inputName.id = 'modalName';
    inputSurname.id = 'modalSurName';
    inputLastname.placeholder = 'Фамилия';
    inputName.placeholder = 'Имя';
    inputSurname.placeholder = 'Отчество';
    inputLastname.type = 'text';
    inputName.type = 'text';
    inputSurname.type = 'text';
    inputLastname.maxLength = '20';
    inputName.maxLength = '20';
    inputSurname.maxLength = '20';

    apiError.id = 'apiError';
    unacceptableLetter.id = 'unacceptableLetter';
    writeName.id = 'writeName';
    writeSurname.id = 'writeSurname';
    writeLastName.id = 'writeLastName';
    requiredValue.id = 'requiredValue';
    requiredContacts.id = 'requiredContacts';

    saveSpinner.innerHTML = svgSpinSave;
    modalTitle.textContent = 'Новый клиент';
    modalBtnClose.innerHTML = btnCloseForm;
    labelLastname.textContent = 'Фамилия';
    labelName.textContent = 'Имя';
    labelsurname.textContent = 'Отчество';
    labelSpanLastname.textContent = '*';
    labelSpanName.textContent = '*';
    
    contactBtnAdd.innerHTML = btnAddFormContact + 'Добавить контанкт';
    btnSave.textContent = 'Сохранить';
    btnClose.textContent = 'Отменить';

    

    btnSave.append(saveSpinner);
    btnSaveCloseContainer.append(btnSave,btnClose);
    contactAdd.append(contactAddBlock, contactBtnAdd);
    labelLastname.append(labelSpanLastname);
    labelName.append(labelSpanName);
    divLastnameWrapper.append(inputLastname, labelLastname);
    divNameWrapper.append(inputName, labelName);
    divsurameWrapper.append(inputSurname, labelsurname);
    errorBlock.append(apiError, unacceptableLetter, writeName, writeSurname, writeLastName, requiredValue, requiredContacts,)
    modalFormContainer.append(
        divLastnameWrapper,
        divNameWrapper,
        divsurameWrapper,
    );
    modalForm.append(
        modalFormContainer,
        contactAdd,
        errorBlock,
        btnSaveCloseContainer
    );

//при нажатии проверяет длинну контактов и задает стили(так же ограничивает не больше 10)
//просто кнопка пропадёт
    contactBtnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        const contactItem = document.getElementsByClassName('contact');
        
        if (contactItem.length < 9) {
            const contactCreate = createContactItem();
            contactAddBlock.append(contactCreate.contact); 
            if (contactItem.length > 0) { 
                contactAdd.style.paddingTop = '25px';
                contactAdd.style.paddingBottom = '25px';
                contactBtnAdd.style.padding = '10px 0 0'      
            }
        } else {
            const contactCreate = createContactItem();
            contactAddBlock.append(contactCreate.contact)
            contactBtnAdd.classList.remove('modal__add-btn--active');
        } 
    });
//приведение первых букв к верхнему регистру
    inputLastname.addEventListener('input', () => {
        upperCaseFirst(inputLastname)
    });
        
    inputName.addEventListener('input', () => {
        upperCaseFirst(inputName) 
    });
        
    inputSurname.addEventListener('input', () => {
        upperCaseFirst(inputSurname)
    });

    return {
        modalForm,
        modalTitle,
        modalBtnClose,
        inputLastname,
        inputName,
        inputSurname,
        contactAdd,
        contactAddBlock,
        contactBtnAdd,
        btnSave,
        btnClose,
        errorClose,
        errorBlock,
    };
}

//Приведение первой буквы к верхнему регистру функция
function upperCaseFirst(input) {
    let value = input.value.trim();
    if(value.length > 0) {
        let firstLetter = value[0].toUpperCase();// получаем первый символ и делаем его большим
        let rest = value.slice(1);// получаем остальные символы без изменения
        let newValue = firstLetter + rest; // объединяем первый символ и остальные в новое значени
        input.value = newValue; // присваиваем новое значение полю ввода
    }
}