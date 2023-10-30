import { contactCancel } from "./globalSvg.js";

//создание самих контактов вместе с выпадающим списком(кастомный, т.к. без стороних библиотек по идее пока никак не сделать)
export function createContactItem() {
    const contact = document.createElement('div');
    const contactType = document.createElement('div');
    const contactName = document.createElement('button');
    const contactList = document.createElement('ul');
    const contactPhone = document.createElement('li');
    const contactFb = document.createElement('li');
    const contactVk = document.createElement('li');
    const contactEmail = document.createElement('li');
    const contactOther = document.createElement('li');
    const contactInput = document.createElement('input');
    const contactBtnDel = document.createElement('button');
    const contactBtnDelTooltip = document.createElement('span');
    
    contact.classList.add('contact');
    contactBtnDelTooltip.classList.add('contact-tooltip', 'site-tooltip');
    contactInput.classList.add('contact__input');
    contactBtnDel.classList.add('contact__delete', 'btn-reset')
    contactType.classList.add('contact__type');
    contactName.classList.add('contact__name');
    contactList.classList.add('contact__list', 'list-reset');
    contactPhone.classList.add('contact__item');
    contactFb.classList.add('contact__item');
    contactVk.classList.add('contact__item');
    contactEmail.classList.add('contact__item');
    contactOther.classList.add('contact__item');

    contactName.textContent = 'Телефон';
    contactBtnDelTooltip.textContent = 'Удалить контакт';
    contactPhone.textContent = 'Телефон';
    contactFb.textContent = 'Facebook';
    contactVk.textContent = 'VK';
    contactEmail.textContent = 'Email';
    contactOther.textContent = 'Другое';
    contactInput.placeholder = 'Введите данные контакта';
    contactInput.type = 'text';
    contactBtnDel.innerHTML = contactCancel;

    const writeValue = document.getElementById('writeName');
    //при другом разрешении сокращает placeholder в input
    if (window.innerWidth < 576) {
        contactInput.placeholder = 'Введите данные';
    }

    //отключает кнопку удаления если input пустой
    contactInput.addEventListener('input', () => {
        if (contactInput.value !== '') {
            contactBtnDel.style.display = 'flex'
            contactInput.classList.add('contact__input--border');
         } else {
            contactBtnDel.style.display = 'none'
            contactInput.classList.remove('contact__input--border');
         }
    })
    //добавляет/убирает стили ориентируясь на длинну списка контактов
    contactBtnDel.addEventListener('click', (e) => {
        e.preventDefault();
        contact.remove();
        const contactItem = document.getElementsByClassName('contact');
        if (contactItem.length < 1) { 
            document.querySelector('.modal__add').style.padding = '0 0';
            document.querySelector('.modal__add-btn').style.padding = '8px 0';      
        } 
        if (contactItem.length <= 4){
            document.querySelector('.modal__box').style.top = '50%';
        }
        document.querySelector('.modal__add-btn').classList.add('modal__add-btn--active');
    });

    
//переключение состояния выпадающего списка в контактах
    contactName.addEventListener('click', (e) => {
        e.preventDefault();
        
        contactList.classList.toggle('contact__list--active');
        contactName.classList.toggle('contact__list--active');
    });
//так же если уводить мышь список пропадёт
    contactType.addEventListener('mouseleave', () => {
        contactList.classList.remove('contact__list--active');
        contactName.classList.remove('contact__list--active');
    });

    
//функция отрисовки контента в зависимости от выбранного в списке и просто закрытие списка
    function setType(type) {
        type.addEventListener('click', () => {
            contactName.textContent = type.textContent;
            contactInput.style.borderColor = 'var(--grey)';
            writeValue.innerHTML = '';
            contactList.classList.remove('contact__list--active');
            contactName.classList.remove('contact__list--active');
        })
    };
//массив из элементов li из допустимого выбора
    const typeArray = [contactPhone, contactFb, contactVk, contactEmail, contactOther];
//проходимся по нему и вызываем функцию которая определяет что выбрали
    for(const type of typeArray) {
        setType(type)   
    }

    
    contactBtnDel.append(contactBtnDelTooltip);
    contact.append(contactType, contactInput, contactBtnDel);
    contactType.append(contactName, contactList);
    contactList.append(contactPhone, contactFb, contactVk, contactEmail, contactOther)

    return {
        contact,
        contactName,
        contactInput,
        contactBtnDel,
    };
}
