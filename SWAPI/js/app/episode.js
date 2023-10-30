import { onLinkClick } from "../main.js";

function toMainPage() {
    const linkBack = document.createElement('a');
    linkBack.classList.add('btn')
    linkBack.textContent = 'Back to episodes';
    linkBack.href = './';
    linkBack.addEventListener('click', (e) => {
        onLinkClick(e);
    })
    
    return linkBack
}


export async function render(data) {
    const container = document.createElement('div')
    const title = document.createElement('h1');
    const blockPlanets = document.createElement('div');
    const planets = document.createElement('h2');
    const listPlanets = document.createElement('ul');
    const blockSpecies = document.createElement('div');
    const species = document.createElement('h2');
    const listSpecies = document.createElement('ul');
    const descr = document.createElement('p');
    
    const btnBack = toMainPage();

    
    listPlanets.classList.add('list-reset')
    listSpecies.classList.add('list-reset')
    title.classList.add('title');
    descr.classList.add('descr');
    listPlanets.classList.add('list-planet');
    listSpecies.classList.add('list-planet');

    
    title.textContent = `${data.title} Part: ${data.episode_id}`;
    descr.textContent = data.opening_crawl;
    planets.textContent = 'Planets';
    species.textContent = 'Species';

    //достаю из объекта эпизода планеты
    let planetsArr = data.planets;
    let planetData = [];
    //перебираю массив URL и при помощи json из ссылок достаю объекты данных планет и закидываю в новый массив
    for (let url of planetsArr) {
    let response = await fetch(url);
        if (response.ok) {
            let planet = await response.json();
            planetData.push(planet);
        }
    }
    planetData.forEach(planet => {
        const item = document.createElement('li');
        item.textContent = planet.name;
        listPlanets.append(item);
    })

    //достаю из объекта эпизода планеты
    let speciesArr = data.species;
    let speciesData = [];
    //перебираю массив URL и при помощи json из ссылок достаю объекты данных планет и закидываю в новый массив
    for (let url of speciesArr) {
    let response = await fetch(url);
        if (response.ok) {
            let planet = await response.json();
            speciesData.push(planet);
        }
    }
    speciesData.forEach(species => {
        const item = document.createElement('li');
        item.textContent = species.name;
        listSpecies.append(item);
    })


    container.append(btnBack, title, descr, blockPlanets, blockSpecies)
    blockPlanets.append(planets, listPlanets)
    blockSpecies.append(species, listSpecies)
    return container
}
