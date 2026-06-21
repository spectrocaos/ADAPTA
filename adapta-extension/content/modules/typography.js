// content/modules/typography.js

const TypographyModule = {
    styleId: 'adapta-typography-style',

    apply(config) {
        this.remove(); // Limpa estilo anterior se existir

        const styleElement = document.createElement('style');
        styleElement.id = this.styleId;
        
        // Vamos usar font-face apontando para o arquivo local da extensão.
        const fontUrl = chrome.runtime.getURL('assets/fonts/OpenDyslexic/OpenDyslexic-Regular.otf');

        styleElement.textContent = `
            @font-face {
                font-family: 'OpenDyslexic';
                src: url('${fontUrl}') format('opentype');
            }

            * {
                font-family: 'OpenDyslexic', sans-serif !important;
                font-size: ${config.fontSize}px !important;
                letter-spacing: ${config.letterSpacing}px !important;
                line-height: ${config.lineHeight} !important;
            }
        `;

        document.head.appendChild(styleElement);
        console.log("Adapta: Módulo de Tipografia aplicado.");
    },

    remove() {
        const existingStyle = document.getElementById(this.styleId);
        if (existingStyle) {
            existingStyle.remove();
            console.log("Adapta: Módulo de Tipografia removido.");
        }
    }
};
