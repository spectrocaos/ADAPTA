// content/modules/colors.js

const ColorsModule = {
    injected: false,

    injectSVG() {
        if (this.injected || document.getElementById('adapta-color-filters')) return;
        
        // Busca o SVG de dentro dos assets da extensão
        const svgUrl = chrome.runtime.getURL('assets/filters/colorblind.svg');
        
        fetch(svgUrl)
            .then(response => response.text())
            .then(svgText => {
                const div = document.createElement('div');
                div.id = 'adapta-color-filters';
                div.style.display = 'none';
                div.innerHTML = svgText;
                document.body.appendChild(div);
                this.injected = true;
                console.log("Adapta: Filtros de cor SVG injetados.");
            })
            .catch(err => console.error("Erro ao injetar SVG colorblind", err));
    },

    apply(filterType) {
        this.remove(); // Limpa estado anterior

        if (!filterType || filterType === 'none') {
            return; // Desativado
        }

        // Garante que o SVG está lá
        if (['protanopia', 'deuteranopia', 'tritanopia'].includes(filterType)) {
            this.injectSVG();
        }

        const htmlElement = document.documentElement;

        if (filterType === 'high-contrast') {
            htmlElement.style.setProperty('filter', 'contrast(1.5) grayscale(1)', 'important');
        } else if (filterType === 'protanopia') {
            htmlElement.style.setProperty('filter', 'url("#protanopia")', 'important');
        } else if (filterType === 'deuteranopia') {
            htmlElement.style.setProperty('filter', 'url("#deuteranopia")', 'important');
        } else if (filterType === 'tritanopia') {
            htmlElement.style.setProperty('filter', 'url("#tritanopia")', 'important');
        }
        
        console.log(`Adapta: Módulo de Cores aplicado (${filterType}).`);
    },

    remove() {
        document.documentElement.style.removeProperty('filter');
        console.log("Adapta: Filtros de cor removidos.");
    }
};
