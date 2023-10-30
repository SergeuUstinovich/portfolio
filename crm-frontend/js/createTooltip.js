export function contactTooltip(type, value) { //создаём tooltip
    const tooltip = document.createElement('div');
    const tooltipType = document.createElement('span');
    const tooltipValue = document.createElement('a');

    tooltip.classList.add('contact-tooltip','site-tooltip');
    tooltipType.classList.add('contact-tooltip__type');
    tooltipValue.classList.add('contact-tooltip__value');

    tooltipType.textContent = type + ': ';
    tooltipValue.textContent = value.replace(/ /g, '');

    tooltip.append(tooltipType, tooltipValue);

    return {
        tooltip,
        tooltipType,
        tooltipValue
    }

}