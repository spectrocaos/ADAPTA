// content/modules/cleaner.js

const CleanerModule = {
    styleId: 'adapta-cleaner-style',

    // Lista de seletores comuns que representam distratores
    selectors: [
        'aside', // Tag semântica para sidebars
        '[role="complementary"]', // ARIA role para sidebars
        '[class*="sidebar"]', '[id*="sidebar"]', // Classes/IDs contendo 'sidebar'
        '[class*="banner"]', '[id*="banner"]', // Banners
        '[class*="popup"]', '[id*="popup"]', // Pop-ups genéricos
        '[class*="ad-"]', '[class*="ads-"]', '.ad', '.ads', '[id*="ad-"]', // Anúncios
        '[class*="cookie"]', '[id*="cookie"]', // Avisos de cookie (que muitas vezes bloqueiam a tela)
        '[class*="newsletter"]', // Pop-ups de newsletter
        'iframe[src*="ads"]', // Iframes de anúncios
        '.widget', '.social-share' // Widgets sociais
    ],

    apply() {
        this.remove();

        const styleElement = document.createElement('style');
        styleElement.id = this.styleId;
        
        // Aplica display none e visibility hidden nos seletores
        styleElement.textContent = `
            ${this.selectors.join(', ')} {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
        `;

        document.head.appendChild(styleElement);
        console.log("Adapta: Módulo de Limpeza aplicado (Distratores ocultados).");
    },

    remove() {
        const existingStyle = document.getElementById(this.styleId);
        if (existingStyle) {
            existingStyle.remove();
            console.log("Adapta: Módulo de Limpeza removido.");
        }
    }
};
