// content/modules/reader.js

const ReaderModule = {
    overlayId: 'adapta-reader-overlay',
    
    apply() {
        this.remove(); // Garante que não duplique

        const content = this.extractContent();
        if (!content) {
            console.warn("Adapta: Não foi possível encontrar o conteúdo principal para o Modo Leitura.");
            alert("Adapta: Não encontramos um artigo legível nesta página.");
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = this.overlayId;
        
        // Estilização do Overlay do Modo Leitura
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: var(--adapta-bg, #1a1a1a); /* Escuro confortável */
            color: var(--adapta-text, #e0e0e0);
            z-index: 2147483647; /* Máximo possível */
            overflow-y: auto;
            padding: 40px 20px;
            box-sizing: border-box;
            font-family: inherit; /* Respeita a fonte do módulo de Tipografia se estiver ativo */
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 700px;
            margin: 0 auto;
            background: #242424;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            line-height: 1.8;
            font-size: 18px;
        `;

        // Título e Conteúdo
        const titleEl = document.createElement('h1');
        titleEl.innerText = document.title;
        titleEl.style.cssText = "margin-top: 0; margin-bottom: 30px; font-size: 32px; color: #4CAF50;";
        
        const bodyEl = document.createElement('div');
        bodyEl.innerHTML = content.html;

        // Remove códigos técnicos e elementos de mídia (imagens, vídeos) para manter foco EXTREMO em textos e botões
        bodyEl.querySelectorAll('script, style, iframe, noscript, canvas, svg, img, picture, video, audio, figure, .ad, .advertisement').forEach(el => el.remove());

        // Remove todo e qualquer estilo, classe ou animação original que veio junto com o site
        bodyEl.querySelectorAll('*').forEach(el => {
            el.removeAttribute('style');
            el.removeAttribute('class');
            el.removeAttribute('id');
        });

        // Botão de Fechar
        const closeBtn = document.createElement('button');
        closeBtn.innerText = '✖ Sair do Modo Leitura';
        closeBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 30px;
            background: #ff4c4c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            z-index: 2147483647;
        `;

        closeBtn.onclick = () => {
            this.remove();
            // Tenta desligar a chavinha no storage global pra não abrir sozinho no F5
            chrome.storage.sync.get(['adaptaSettings'], (result) => {
                if(result.adaptaSettings && result.adaptaSettings.reader) {
                    result.adaptaSettings.reader.enabled = false;
                    chrome.storage.sync.set({ adaptaSettings: result.adaptaSettings });
                }
            });
        };

        // Botão de Leitura de Áudio Global
        const audioBtn = document.createElement('button');
        audioBtn.innerText = '🔊 Ouvir Texto Completo';
        audioBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #2196F3;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            z-index: 2147483647;
            transition: background 0.3s;
        `;

        let isReading = false;
        audioBtn.onclick = () => {
            if (isReading) {
                window.speechSynthesis.cancel();
                audioBtn.innerText = '🔊 Ouvir Texto Completo';
                audioBtn.style.background = '#2196F3';
                isReading = false;
            } else {
                window.speechSynthesis.cancel(); // Para leituras anteriores
                // Passamos o container inteiro pra ele extrair apenas o texto limpo
                const textToRead = titleEl.innerText + ". " + bodyEl.innerText;
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.rate = 0.95;

                audioBtn.innerText = '⏹ Parar Leitura';
                audioBtn.style.background = '#f44336';
                isReading = true;

                utterance.onend = () => {
                    audioBtn.innerText = '🔊 Ouvir Texto Completo';
                    audioBtn.style.background = '#2196F3';
                    isReading = false;
                };

                window.speechSynthesis.speak(utterance);
            }
        };

        container.appendChild(titleEl);
        container.appendChild(bodyEl);
        overlay.appendChild(closeBtn);
        overlay.appendChild(audioBtn);
        overlay.appendChild(container);
        
        // Bloqueia rolagem do body original
        document.body.style.overflow = 'hidden';
        document.body.appendChild(overlay);

        console.log("Adapta: Modo Leitura aplicado.");
    },

    extractContent() {
        // Clonamos o body inteiro para garantir que NENHUM texto ou botão fique de fora
        const cloneBody = document.body.cloneNode(true);
        
        // Removemos o próprio overlay se ele já existisse no clone
        const existingOverlay = cloneBody.querySelector('#adapta-reader-overlay');
        if (existingOverlay) existingOverlay.remove();

        return {
            title: document.title,
            html: cloneBody.innerHTML
        };
    },

    remove() {
        const overlay = document.getElementById(this.overlayId);
        if (overlay) {
            window.speechSynthesis.cancel(); // Para de falar se fechar o modo leitura
            overlay.remove();
            document.body.style.overflow = ''; // Devolve a rolagem
            console.log("Adapta: Modo Leitura removido.");
        }
    }
};
