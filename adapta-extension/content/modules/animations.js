// content/modules/animations.js

const AnimationsModule = {
    styleId: 'adapta-animations-style',

    apply() {
        this.remove(); // Limpa caso já exista

        const styleElement = document.createElement('style');
        styleElement.id = this.styleId;
        
        // Desativa transições, animações e rolagem suave para todos os elementos
        styleElement.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;

        document.head.appendChild(styleElement);
        console.log("Adapta: Módulo de Animações aplicado (Animações desativadas).");
    },

    remove() {
        const existingStyle = document.getElementById(this.styleId);
        if (existingStyle) {
            existingStyle.remove();
            console.log("Adapta: Módulo de Animações removido (Animações reativadas).");
        }
    }
};
