import { serverGetClient } from "./apiClient.js";
import { createModal } from "./createModal.js";
import { createPreloader } from "./preloader.js";
import { renderTableHead } from "./render.js";
import { createСlient } from "./createClientItem.js";
import { sortTable } from "./sortClient.js";
import { searchClients } from "./searchClient.js";
    //открытие модалки при добавлении
    const btncreateForm = document.getElementById('creafteForm');
    const modalOpen = createModal();
    btncreateForm.addEventListener('click', () => {
    document.body.append(modalOpen);
    })

    async function addCLientTable() {
        renderTableHead()//отрисовка шапки
        const tbody = document.getElementById('tbody')
        tbody.append(createPreloader());//добавление загрузки на тело
        const preloader = document.querySelector('.preloader');

        try { //в зависимости как придут данные отрисует
            const clients = await serverGetClient();//принимает данные с сервера

            searchClients(clients);

            for(const item of clients) { //перед рендером будет загрузка
                tbody.append(createСlient(item));
            }
        } catch (error) { //если проблема выведет в консоль
            console.log(error);
        } finally { //искуственно загружает в течении 1.5с и удаляет загрузку
            setTimeout(() => preloader.remove(), 1500);
        }
        
    }
    addCLientTable()
    document.addEventListener('DOMContentLoaded', sortTable)

//     // Фильтрация ...................................................
//     function filter(arr, value) {
//         let result = [];
//         let copy = [...arr];
//         for ( const item of copy) {
//             if (
//                 String(item.name).includes(value) == true ||
//                 String(item.lastName).includes(value) == true ||
//                 String(item.surname).includes(value) == true ) 
//                 result.push(item)
//         }
//         return result
//     }
//     //функция для ожидания фильтрации
//     function debounce(func, wait) {
//         let timeout;
//         return function() {
//           const context = this;
//           const args = arguments;
//           clearTimeout(timeout);
//           timeout = setTimeout(function() {
//             func.apply(context, args);
//           }, wait);
//         };
//       }
//     document.getElementById('form__search').addEventListener('input', debounce((e) => {
//         e.preventDefault();
//         const inputSearch = document.getElementById('input__search');
//         tbody.textContent = '';
//         let newArr = [...arrayClient];
//         upperCaseFirst(inputSearch)
//         if (inputSearch.value !=='') newArr = filter(newArr, inputSearch.value);
        
//         renderTableBody(newArr)
        
//     }, 300));
    

  
    