// content/modules/audio.js

const AudioModule = {
    buttonId: 'adapta-audio-btn',
    boundMouseUp: null,
    boundMouseDown: null,
    boundKeyDown: null,
    boundFocusIn: null,
    
    isKeyboardNavigating: false,

    apply() {
        this.remove();

        this.boundMouseUp = this.handleSelection.bind(this);
        this.boundMouseDown = this.handleMouseDown.bind(this);
        this.boundKeyDown = this.handleKeyDown.bind(this);
        this.boundFocusIn = this.handleFocusIn.bind(this);

        document.addEventListener('mouseup', this.boundMouseUp);
        document.addEventListener('mousedown', this.boundMouseDown);
        document.addEventListener('keydown', this.boundKeyDown);
        document.addEventListener('focusin', this.boundFocusIn);
        
        console.log("Adapta: Módulo de Áudio aplicado.");
    },

    handleKeyDown(e) {
        // Se apertar Tab, marcamos que o usuário está navegando via teclado
        if (e.key === 'Tab') {
            this.isKeyboardNavigating = true;
        }
    },

    handleMouseDown(e) {
        // Se usar o mouse, desativamos a flag de teclado
        this.isKeyboardNavigating = false;
        
        const btn = document.getElementById(this.buttonId);
        // Se clicar fora do botão flutuante, esconde ele e para a fala da seleção
        if (btn && e.target !== btn) {
            btn.style.display = 'none';
            window.speechSynthesis.cancel(); 
        }
    },

    handleFocusIn(e) {
        // Lê automaticamente apenas se o foco veio por navegação de teclado (Tab)
        if (this.isKeyboardNavigating) {
            const el = e.target;
            
            // Prioriza aria-label, depois placeholder (se input), depois value (input), e finalmente o texto interno
            const textToRead = el.getAttribute('aria-label') || el.placeholder || el.value || el.innerText;
            
            if (textToRead && textToRead.trim().length > 0) {
                window.speechSynthesis.cancel(); // Corta a fala anterior
                const utterance = new SpeechSynthesisUtterance(textToRead.trim());
                utterance.rate = 0.95; 
                window.speechSynthesis.speak(utterance);
            }
        }
    },

    handleSelection(e) {
        setTimeout(() => {
            const selection = window.getSelection();
            const text = selection.toString().trim();

            if (text.length > 0) {
                this.showPlayButton(e.pageX, e.pageY, text);
            }
        }, 10);
    },

    showPlayButton(x, y, textToRead) {
        let btn = document.getElementById(this.buttonId);
        
        if (!btn) {
            btn = document.createElement('button');
            btn.id = this.buttonId;
            btn.innerText = '▶️ Ouvir';
            btn.style.cssText = `
                position: absolute;
                z-index: 9999999;
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-family: sans-serif;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(btn);

            // Evita que clicar no botão feche ele mesmo
            btn.addEventListener('mousedown', (e) => e.stopPropagation());
        }

        btn.style.left = `${x + 10}px`;
        btn.style.top = `${y - 30}px`;
        btn.style.display = 'block';

        btn.onclick = () => {
            window.speechSynthesis.cancel(); 
            
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.rate = 0.95; 
            
            btn.innerText = '🔊 Lendo...';
            
            utterance.onend = () => {
                btn.innerText = '▶️ Ouvir';
                btn.style.display = 'none'; 
            };
            
            window.speechSynthesis.speak(utterance);
        };
    },

    remove() {
        const btn = document.getElementById(this.buttonId);
        if (btn) btn.remove();
        
        window.speechSynthesis.cancel(); 
        
        if (this.boundMouseUp) {
            document.removeEventListener('mouseup', this.boundMouseUp);
            document.removeEventListener('mousedown', this.boundMouseDown);
            document.removeEventListener('keydown', this.boundKeyDown);
            document.removeEventListener('focusin', this.boundFocusIn);
        }
        console.log("Adapta: Módulo de Áudio removido.");
    }
};
