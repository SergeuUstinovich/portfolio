const cssPromises = {};

export const helpers = {
    // Load resource by url
    loadResource: (src) => {
        // Определяем расширение ресурса
        const srcExt = src.split('.').pop();
        switch(srcExt) {
            // JS Module
            case 'js':
                return import(src);
            // CSS Module
            case 'css':
                if(!cssPromises[src]){
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = src;
                    cssPromises[src] = new Promise(resolve => {
                        link.addEventListener('load', () => resolve());
                    });
                    document.head.append(link);
                }
                return cssPromises[src];
        }
        // Load data-resource
        return fetch(src).then(response => response.json());
    },
    // Render App page-module with async loaded sources
    renderPage: (container, sources) => {
        Promise.all(sources.map(src => helpers.loadResource(src)))
            .then( async ([module, , data]) => {
                const content = await module.render(data);
                container.innerHTML ='';
                container.append(content);
            });
    },
    // Нормализовать предложение с красной строки
    normalizeText: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
}