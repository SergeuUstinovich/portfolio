export function validateClientForm() { //валидация формы
    const userLastName = document.getElementById('modalLastName');
    const userName = document.getElementById('modalName');
    const userSurname = document.getElementById('modalSurName');
    const unacceptableLetter = document.getElementById('unacceptableLetter');
    const writeName = document.getElementById('writeName');
    const writeSurname = document.getElementById('writeSurname');
    const writeLastName = document.getElementById('writeLastName');
    const requiredValue = document.getElementById('requiredValue');
    const requiredContacts = document.getElementById('requiredContacts');
    const validateArray = [unacceptableLetter, writeName, writeSurname, writeLastName, requiredValue, requiredContacts];
    const regexp = /[^а-яА-ЯёЁ]+$/g;

    function onInputValue(input) {
        input.addEventListener('input', () => { //очищает поля ошибки все если что то вводят
            input.style.borderColor = 'var(--grey)';
            for(const item of validateArray) {
                item.textContent = '';
            }
        });

        input.oncut = input.oncopy = input.onpaste = () => {//разрешает копировать и потом очищает поля ошибки
            input.style.borderColor = 'var(--grey)';
            for(const item of validateArray) {
                item.textContent = '';
            }
        };
//показывает 1 любое поле в зависимости от правильности
        input.onchange = () => {
            input.style.borderColor = 'var(--grey)';
            if( userLastName.value && userName.value && userSurname.value) {
                for(const item of validateArray) {
                    item.textContent = '';
                }
            } 
        }
    };
    onInputValue(userLastName);
    onInputValue(userName);
    onInputValue(userSurname);
//в случае ошибки говорит какое поле пустое
    function checkRequiredName(input, message, name) {
        if(!input.value) {
            input.style.borderColor = '#ff0000';
            message.textContent = `Введите ${name} клиента!`;
            return false;
        } else {
            message.textContent = '';
        }
        return true;
    };
//в случае ошибки говорит какое поле не верное по кириллице
    function checkByRegexp(input, regexp) {
        if (regexp.test(input.value)) {
            input.style.borderColor = '#ff0000';
            unacceptableLetter.textContent = 'Недопустимые символы, только кириллица!';
            return false;
        };
        return true;
    };
    //вызов всех функция с нужными аргументами
    if(!checkRequiredName(userLastName, writeLastName, 'Фамилию')) {return false}
    if(!checkRequiredName(userName, writeName, 'Имя')) {return false}
    if(!checkRequiredName(userSurname, writeSurname, 'Отчество')) {return false}
    if(!checkByRegexp(userLastName, regexp)) {return false}
    if(!checkByRegexp(userName, regexp)) {return false}
    if(!checkByRegexp(userSurname, regexp)) {return false}

    return true;
}