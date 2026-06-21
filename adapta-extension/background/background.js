// Evento de instalação da extensão
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Adapta instalada com sucesso.');
    }
});
