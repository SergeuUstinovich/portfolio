// function sortUsers(arr, prop, dir = false){
//     return arr.sort((a,b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0)
// } 
export function sortTable() {
    const table = document.querySelector('.table');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    //проходимся по всем элементам в шапке, и возвращаем пустую строку, это надо для того
    //что бы понимать направление up или down
    const directions = Array.from(headers).map(() => '');
    //ищем нужные нам по дату атрибуту
    function transform(type, content) {
        switch(type) {
            case 'id':
                return parseFloat(content);//позволяет получать из строки только цифры игнорируя буквы
            case 'create':
            case 'update':
                return content.split('.').reverse().join('-');
            case 'text':
            default:
                return content;
                
        }
    };

    function sortColumn(index) {
        const type = headers[index].getAttribute('data-type');
        const rows = tbody.querySelectorAll('tr');
        const direction = directions[index] || 'sortUp';
        const multiply = direction === 'sortUp' ? 1 : -1;
        const newRows = Array.from(rows);

        newRows.sort((row1, row2) => {
            const cellA = row1.querySelectorAll('td')[index].textContent;
            const cellB = row2.querySelectorAll('td')[index].textContent;
            
            const a = transform(type, cellA);//по типу ищем дата атрибут и внутри ищем все td по индексу 
            const b = transform(type, cellB);
            //направление сортировки
            switch (true) {
                case a > b:   
                    return 1 * multiply;
                case a < b:
                    return -1 * multiply
                default:
                    break;
                case a === b:
                return 0;
            }
        });
        //удаляем старые из дом дерева
        [].forEach.call(rows, (row) => {
            tbody.removeChild(row);
        });

        directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

        //отрисовываем новые отсортированные
        newRows.forEach(newRow => {
            tbody.appendChild(newRow);
        })
    }

    //это надо для того что бы проходиться по всей шапке и у отдельного элемента
    //вызывать клик и у этого элемента вызывать сортировку
    [].forEach.call(headers, (header, index) => {
        header.addEventListener('click', () => {
            sortColumn(index);
        })
    })
}
