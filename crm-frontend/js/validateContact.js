export function validateClientContact(contactType, contactInput) { //валидация контактов
    const writeValue = document.getElementById('writeName'); //берем любое поле для вывода ошибки для контактов
    const onlyNumbers = /[^0-9]+$/g;
    const onlyEmail = /[^a-zA-Z|@|.]+$/g;
//очищение полей применение норм цвета и очищение поля
    function onInputValue(input) {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--grey)';
            writeValue.textContent = '';
        });
//при копировании применение норм цвета и очищение поля
        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'var(--grey)';
            writeValue.textContent = '';
        };
    };
//при ошибке подсвечивает красным
    function showErrorMessage(message, block, input) {
        block.textContent = message;
        input.style.borderBottomColor = 'red'
    };

    onInputValue(contactInput);
//требует заполнить поля input
    if (!contactInput.value) {
        showErrorMessage('Заполните все поля контактов!', writeValue, contactInput);
        return false
    }
//проверка телефона и emaila
    switch(contactType.innerHTML) {
        case 'Телефон':
            if (onlyNumbers.test(contactInput.value.trim())) {
                showErrorMessage('Допустимы только цифры', writeValue, contactInput);
                return false
            } else if (contactInput.value.length !== 11) {
                showErrorMessage('Номер должен состоять из 11 цифр', writeValue, contactInput);
                return false;
            }
            return true
        case 'Email':
            if (onlyEmail.test(contactInput.value)) {
                showErrorMessage('Неправильный Email!', writeValue, contactInput);
                return false;
            }
            return true
        default:
            return true;
    }
}