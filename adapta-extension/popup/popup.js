// popup/popup.js

const DEFAULT_SETTINGS = {
    typography: { enabled: false, fontSize: 18, letterSpacing: 2, lineHeight: 1.5 },
    animations: { enabled: false },
    cleaner: { enabled: false },
    ruler: { enabled: false },
    audio: { enabled: false },
    reader: { enabled: false },
    colorFilter: 'none'
};

let currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
let currentHostname = "";
let isDomainSpecific = false;

// Presets State
let savedPresets = {
    "Padrão": JSON.parse(JSON.stringify(DEFAULT_SETTINGS))
};
let activePresetName = "Padrão";

const mainScreen = document.getElementById('main-screen');

// Preset UI
const presetSelect = document.getElementById('preset-select');
const btnSavePreset = document.getElementById('btn-save-preset');
const btnDeletePreset = document.getElementById('btn-delete-preset');

// Toggles
const toggleTypography = document.getElementById('toggle-typography');
const toggleAnimations = document.getElementById('toggle-animations');
const toggleCleaner = document.getElementById('toggle-cleaner');
const toggleRuler = document.getElementById('toggle-ruler');
const toggleAudio = document.getElementById('toggle-audio');
const toggleReader = document.getElementById('toggle-reader');
const selectColor = document.getElementById('select-color');

const toggleDomainSpecific = document.getElementById('toggle-domain-specific');
const currentDomainLabel = document.getElementById('current-domain');

// 1. Descobre a aba atual e carrega as configs
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
        try {
            const url = new URL(tabs[0].url);
            currentHostname = url.hostname;
            currentDomainLabel.innerText = currentHostname;
        } catch (e) {
            currentHostname = "site atual";
            currentDomainLabel.innerText = currentHostname;
        }
    }
    
    const domainKey = `adaptaSettings_${currentHostname}`;
    
    chrome.storage.sync.get(['adapta_presets', 'adapta_active_preset', domainKey], (result) => {
        // Load Presets Library
        if (result.adapta_presets) {
            savedPresets = result.adapta_presets;
        }
        
        // Load Global Active Preset
        activePresetName = result.adapta_active_preset || "Padrão";
        let globalSettings = savedPresets[activePresetName] || DEFAULT_SETTINGS;
        
        // Load Domain Specific (if exists)
        if (result[domainKey]) {
            currentSettings = result[domainKey];
            isDomainSpecific = true;
            toggleDomainSpecific.checked = true;
        } else {
            currentSettings = JSON.parse(JSON.stringify(globalSettings));
            isDomainSpecific = false;
            toggleDomainSpecific.checked = false;
        }
        
        mainScreen.style.display = 'flex';
        renderPresetDropdown();
        updateUI();
    });
});

function renderPresetDropdown() {
    presetSelect.innerHTML = '';
    
    // Default option
    let optDefault = document.createElement('option');
    optDefault.value = 'Padrão';
    optDefault.innerText = 'Padrão';
    presetSelect.appendChild(optDefault);
    
    for (const name in savedPresets) {
        if (name !== 'Padrão') {
            let opt = document.createElement('option');
            opt.value = name;
            opt.innerText = name;
            presetSelect.appendChild(opt);
        }
    }
    
    if (isDomainSpecific) {
        let optCustom = document.createElement('option');
        optCustom.value = 'custom';
        optCustom.innerText = '* Customizado (Neste Site)';
        optCustom.hidden = true; // Só mostra porque está selecionado
        presetSelect.appendChild(optCustom);
        presetSelect.value = 'custom';
    } else {
        presetSelect.value = activePresetName;
    }
}

function updateUI() {
    toggleTypography.checked = currentSettings.typography.enabled;
    toggleAnimations.checked = currentSettings.animations.enabled;
    toggleCleaner.checked = currentSettings.cleaner.enabled;
    toggleRuler.checked = currentSettings.ruler?.enabled || false;
    toggleAudio.checked = currentSettings.audio?.enabled || false;
    toggleReader.checked = currentSettings.reader?.enabled || false;
    selectColor.value = currentSettings.colorFilter || 'none';
}

function saveAndSendSettings() {
    const domainKey = `adaptaSettings_${currentHostname}`;
    
    if (isDomainSpecific) {
        // Domain specific tweak overrides global active preset entirely
        chrome.storage.sync.set({ [domainKey]: currentSettings }, notifyTab);
    } else {
        // If we modify settings and it's NOT domain specific, it modifies the ACTIVE preset
        savedPresets[activePresetName] = JSON.parse(JSON.stringify(currentSettings));
        chrome.storage.sync.remove(domainKey, () => {
            chrome.storage.sync.set({ 
                adapta_presets: savedPresets,
                adapta_active_preset: activePresetName
            }, notifyTab);
        });
    }
}

function notifyTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs && tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'UPDATE_SETTINGS',
                settings: currentSettings
            });
        }
    });
}

// Ouvintes de Presets
presetSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'custom') return;
    
    activePresetName = selected;
    isDomainSpecific = false;
    toggleDomainSpecific.checked = false;
    currentSettings = JSON.parse(JSON.stringify(savedPresets[selected]));
    
    updateUI();
    saveAndSendSettings();
    renderPresetDropdown();
});

btnSavePreset.addEventListener('click', () => {
    const name = prompt("Digite o nome para salvar esta configuração (ex: 'Modo Leitura', 'Noturno'):");
    if (name && name.trim().length > 0) {
        const safeName = name.trim();
        savedPresets[safeName] = JSON.parse(JSON.stringify(currentSettings));
        activePresetName = safeName;
        isDomainSpecific = false;
        toggleDomainSpecific.checked = false;
        
        chrome.storage.sync.set({ 
            adapta_presets: savedPresets,
            adapta_active_preset: activePresetName
        }, () => {
            renderPresetDropdown();
            saveAndSendSettings();
        });
    }
});

btnDeletePreset.addEventListener('click', () => {
    if (activePresetName === 'Padrão' || isDomainSpecific) {
        alert("Você não pode excluir o Padrão ou uma configuração específica de site. Volte para o Padrão desativando os itens.");
        return;
    }
    
    if (confirm(`Tem certeza que deseja excluir a configuração "${activePresetName}"?`)) {
        delete savedPresets[activePresetName];
        activePresetName = 'Padrão';
        currentSettings = JSON.parse(JSON.stringify(savedPresets['Padrão']));
        
        chrome.storage.sync.set({ 
            adapta_presets: savedPresets,
            adapta_active_preset: activePresetName
        }, () => {
            renderPresetDropdown();
            updateUI();
            saveAndSendSettings();
        });
    }
});

// Ouvintes de UI
toggleDomainSpecific.addEventListener('change', (e) => {
    isDomainSpecific = e.target.checked;
    saveAndSendSettings(); 
    renderPresetDropdown(); // Atualiza o dropdown para mostrar ou esconder "* Customizado"
});

toggleTypography.addEventListener('change', (e) => { currentSettings.typography.enabled = e.target.checked; saveAndSendSettings(); });
toggleAnimations.addEventListener('change', (e) => { currentSettings.animations.enabled = e.target.checked; saveAndSendSettings(); });
toggleCleaner.addEventListener('change', (e) => { currentSettings.cleaner.enabled = e.target.checked; saveAndSendSettings(); });
toggleRuler.addEventListener('change', (e) => { if (!currentSettings.ruler) currentSettings.ruler = {}; currentSettings.ruler.enabled = e.target.checked; saveAndSendSettings(); });
toggleAudio.addEventListener('change', (e) => { if (!currentSettings.audio) currentSettings.audio = {}; currentSettings.audio.enabled = e.target.checked; saveAndSendSettings(); });
toggleReader.addEventListener('change', (e) => { if (!currentSettings.reader) currentSettings.reader = {}; currentSettings.reader.enabled = e.target.checked; saveAndSendSettings(); });
selectColor.addEventListener('change', (e) => { currentSettings.colorFilter = e.target.value; saveAndSendSettings(); });
