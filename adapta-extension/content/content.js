// content/content.js
console.log("Adapta: Content script carregado.");

// Objeto principal para gerenciar o estado local da página
const AdaptaManager = {
    init() {
        console.log("Inicializando módulos da Adapta...");
        this.loadSettings();
        this.setupListeners();
    },

    loadSettings() {
        const hostname = window.location.hostname;
        const globalKey = 'adaptaSettings';
        const domainKey = `adaptaSettings_${hostname}`;

        // Busca a global e a do domínio simultaneamente
        chrome.storage.sync.get([globalKey, domainKey], (result) => {
            // Se existir a do domínio, ela ganha. Se não, usa a global.
            const finalSettings = result[domainKey] || result[globalKey];
            if (finalSettings) {
                this.applyModules(finalSettings);
            }
        });
    },

    applyModules(settings) {
        if (settings.typography?.enabled) {
            TypographyModule.apply(settings.typography);
        } else {
            TypographyModule.remove();
        }

        if (settings.animations?.enabled) {
            AnimationsModule.apply();
        } else {
            AnimationsModule.remove();
        }

        if (settings.cleaner?.enabled) {
            CleanerModule.apply();
        } else {
            CleanerModule.remove();
        }

        if (settings.ruler?.enabled) {
            RulerModule.apply();
        } else {
            RulerModule.remove();
        }

        if (settings.audio?.enabled) {
            AudioModule.apply();
        } else {
            AudioModule.remove();
        }

        // Módulo de cores precisa saber apenas qual o tipo de filtro
        ColorsModule.apply(settings.colorFilter);

        // Modo Leitura Focada (se ativado por cima da página)
        if (settings.reader?.enabled) {
            ReaderModule.apply();
        } else {
            ReaderModule.remove();
        }
    },

    setupListeners() {
        // Escuta mensagens vindas do Background ou do Popup para atualização em tempo real
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'UPDATE_SETTINGS') {
                console.log("Configurações atualizadas, reaplicando módulos...");
                this.applyModules(request.settings);
            }
        });
    }
};

// Inicializa o gerenciador assim que o DOM permitir
AdaptaManager.init();
