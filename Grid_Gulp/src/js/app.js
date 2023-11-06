const btnBurger = document.getElementById('burger-btn');
const container = document.getElementById('container');

btnBurger.addEventListener('click', () => {
    container.classList.toggle('open')
})

const search = document.getElementById('search');
const searchBlock = document.getElementById('searchBlock');

console.log(search)

search.addEventListener('click', () => {
    searchBlock.classList.toggle('openSearch')
    
   
})