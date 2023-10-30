import { objThead } from "./globalSvg.js";
//отрисовка шапки
export function renderTableHead() {
    const thead = document.getElementById('thead');
    thead.textContent = '';
    const headerTable = objThead.tr;
    thead.append(headerTable);
    return thead
}

