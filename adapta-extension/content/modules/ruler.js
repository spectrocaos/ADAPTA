// content/modules/ruler.js

const RulerModule = {
    rulerId: 'adapta-reading-ruler',
    boundMouseMove: null,

    apply() {
        this.remove();

        const rulerElement = document.createElement('div');
        rulerElement.id = this.rulerId;
        
        // Estilo inicial: uma faixa de 60px de altura (furo) e uma borda gigante opaca (sombra)
        rulerElement.style.cssText = `
            position: fixed;
            left: 0;
            width: 100vw;
            height: 60px;
            pointer-events: none; /* Deixa os cliques passarem direto */
            z-index: 9999999;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.45);
            transition: top 0.05s ease-out;
            top: -100px; /* Começa escondido */
            border-top: 2px solid #4CAF50;
            border-bottom: 2px solid #4CAF50;
        `;

        document.body.appendChild(rulerElement);

        this.boundMouseMove = this.onMouseMove.bind(this);
        document.addEventListener('mousemove', this.boundMouseMove);
        
        console.log("Adapta: Módulo de Régua de Leitura aplicado.");
    },

    onMouseMove(e) {
        const rulerElement = document.getElementById(this.rulerId);
        if (rulerElement) {
            // Centraliza a régua na altura do cursor (menos metade da altura da régua, 30px)
            rulerElement.style.top = `${e.clientY - 30}px`;
        }
    },

    remove() {
        const existingRuler = document.getElementById(this.rulerId);
        if (existingRuler) {
            existingRuler.remove();
        }
        
        if (this.boundMouseMove) {
            document.removeEventListener('mousemove', this.boundMouseMove);
            this.boundMouseMove = null;
        }
        
        console.log("Adapta: Módulo de Régua de Leitura removido.");
    }
};
