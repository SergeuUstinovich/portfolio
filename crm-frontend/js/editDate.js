import { contactTooltip } from "./createTooltip.js";
import { svgEmail, svgFb, svgOther, svgPhone, svgVk } from "./globalSvg.js";
//элемент это сам контакт(внутри у себя уже с type и value)
//svg картинка то что отображает от контакта
//item это куда мы вкладываем
export function createContactLink(type, value, element, svg, item) {
    const setTooltip = contactTooltip(type, value);//вызов созданного тултипа
    element = document.createElement('a');
    element.classList.add('contacts__link');
    element.innerHTML = svg;
    //так же размещаем тултип
    //делаем 2 проферки на телефон и email в остальных случаях может быть что угодно, не знаю как проверять
    if (type === 'Email') {
        element.href = `mailto:${value.trim()}`
    } else if (type === 'Телефон') {
        element.href = `tel:${value.trim()}`;
        setTooltip.tooltipValue.style.color = 'white';
        setTooltip.tooltipValue.style.textDecoration = 'none';
    } else {
        element.href = value.trim();
    }

    element.append(setTooltip.tooltip); //вкладываем каждый тултип в элемент
    item.append(element);
}
//тут мы говорим при каком значении type и value должна отображаться svg
export function createContactItemByType(type, value, item){
    switch(type) {
        case 'Телефон':
            let phone;
            createContactLink(type, value, phone, svgPhone, item);
            break
        case 'Facebook':
            let fb;
            createContactLink(type, value, fb, svgFb, item);
            break
        case 'VK':
            let vk;
            createContactLink(type, value, vk, svgVk, item);
            break
        case 'Email':
            let Email;
            createContactLink(type, value, Email, svgEmail, item);
            break
        case 'Другое':
            let other;
            createContactLink(type, value, other, svgOther, item);
            break

        default:
            break;
    }
}



//формат даты
export function formatDate(data) {
    const newDate = new Date(data);

    const correctDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    const resultDate = newDate.toLocaleString('ru', correctDate);

    return resultDate;
}
//формат времени
export function formatTime(data) {
    const newDate = new Date(data);

    const correctDate = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const resultTime = newDate.toLocaleString('ru', correctDate);

    return resultTime;
}