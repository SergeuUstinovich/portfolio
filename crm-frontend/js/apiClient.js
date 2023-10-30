//Добавление клиента на сервер /изменение
let SERVER_URL = 'http://localhost:3000';

export async function sendClientData(obj, method, id = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    };
    let response = await fetch(SERVER_URL + `/api/clients/${method === 'POST' ? '' : id}`, options);
    const errorApi = document.getElementById('apiError');
    if(response.status === 200 || response.status === 201) {
        let data = await response.json();
        errorApi.textContent = '';
        return data
    } else if (response.status === 422 || response.status === 404 || response.status >= 500) {
        errorApi.textContent = `Ошибка: ${response.status}!`;
    } else {
        errorApi.textContent = 'Что то пошло не так...';
    }
    
}
//Получение клиента с сервера
export async function serverGetClient() {
    const options = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        let response = await fetch(SERVER_URL + '/api/clients', options);

        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

//удаление с сервера
export async function deleteClientItem(id) {
    try {
        let response = await fetch(SERVER_URL + '/api/clients/' + id, {
            method: "DELETE",
            
        })
    } catch (error) {
        console.log(error);
    }  
}
//для поиска
export async function findClient(value) {
    try {
        const response = await fetch(`http://localhost:3000/api/clients?search=${value}`, {
            method: 'GET'
        });

        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}