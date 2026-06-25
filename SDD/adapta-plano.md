# Adapta — Plano de Desenvolvimento

## Visão geral

Este documento descreve o plano técnico completo para o desenvolvimento da extensão Chrome **Adapta**, incluindo arquitetura, decisões tecnológicas e cronograma de fases.

---

## Arquitetura técnica

### Estrutura de arquivos

```
adapta-extension/
├── manifest.json              # Configuração da extensão (MV3)
├── background/
│   └── background.js          # Service Worker — estado, login, perfis
├── content/
│   ├── content.js             # Script injetado em cada página
│   └── modules/
│       ├── typography.js      # Módulo de tipografia
│       ├── animations.js      # Módulo de animações
│       ├── cleaner.js         # Módulo de limpeza de página
│       ├── audio.js           # Módulo de nivelamento de áudio
│       ├── colors.js          # Módulo de filtros de cores
│       └── ruler.js           # Módulo de régua de leitura
├── popup/
│   ├── popup.html             # Interface rápida (ícone da extensão)
│   ├── popup.js
│   └── popup.css
├── panel/
│   ├── panel.html             # Painel lateral completo (Side Panel API)
│   ├── panel.js               # Lógica do painel (React)
│   └── panel.css
├── assets/
│   ├── fonts/
│   │   └── OpenDyslexic/      # Fonte para dislexia
│   ├── filters/
│   │   └── colorblind.svg     # Filtros SVG para daltonismo
│   └── icons/
│       └── adapta-*.png       # Ícones da extensão (16, 48, 128px)
└── firebase/
    └── firebase-config.js     # Configuração Firebase (auth + firestore)
```

### Permissões necessárias (manifest.json)

```json
{
  "permissions": [
    "activeTab",
    "scripting",
    "storage",
    "sidePanel",
    "identity"
  ],
  "host_permissions": [
    "<all_urls>"
  ]
}
```

### Fluxo de comunicação

```
[Painel lateral] ──mensagem──> [background.js] ──chrome.tabs.sendMessage──> [content.js]
                                     │
                              [chrome.storage.sync]
                                     │
                               [Firebase Auth]
                               [Firestore DB]
```

---

## Decisões tecnológicas

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Base da extensão | Chrome MV3 | Padrão atual exigido pela Chrome Web Store |
| Interface do painel | React + Vite | Componentização, hot reload, ecossistema maduro |
| Autenticação | Google OAuth via `chrome.identity` | Sem senha extra; usuário já tem conta Google |
| Banco de dados | Firebase Firestore | Gratuito na camada inicial, sincronização em tempo real |
| Tipografia | OpenDyslexic (fonte open source) | Criada especificamente para leitura com dislexia |
| Nivelamento de áudio | Web Audio API (nativa) | Sem dependência externa; suporte universal no Chrome |
| Filtros de daltonismo | Filtros SVG inline | Leves, sem biblioteca; suporte nativo ao CSS `filter` |

---

## Fases de desenvolvimento

### Fase 1 — MVP funcional
**Duração estimada:** 2–3 semanas

**Objetivo:** Ter uma extensão instalável que já entrega valor real ao usuário, mesmo sem login.

**Entregas:**
- [ ] Estrutura base MV3 funcionando (manifest, background, content)
- [ ] Módulo tipografia: troca de fonte para OpenDyslexic, controle de tamanho e espaçamento
- [ ] Módulo animações: CSS global desativando `animation` e `transition`
- [ ] Módulo limpeza básica: ocultação de sidebars e banners por seletores comuns
- [ ] Popup simples com toggles on/off para cada módulo
- [ ] Salvamento local com `chrome.storage.local`

**Critério de conclusão:** Instalar a extensão e aplicar adaptações em pelo menos 5 sites diferentes (YouTube, Google Classroom, Moodle, Wikipedia, Notion).

---

### Fase 2 — Login e perfis salvos
**Duração estimada:** 2 semanas

**Objetivo:** Permitir que o usuário salve suas configurações e as acesse em qualquer dispositivo.

**Entregas:**
- [ ] Google OAuth 2.0 via `chrome.identity.launchWebAuthFlow`
- [ ] Integração com Firebase Auth
- [ ] Integração com Firebase Firestore para persistir perfis
- [ ] Tela de onboarding com seleção de perfil pré-definido
- [ ] Sincronização automática entre dispositivos
- [ ] Salvamento de configurações por domínio (ex: config separada para youtube.com)

**Critério de conclusão:** Usuário faz login, configura e vê as configurações sincronizadas ao abrir o Chrome em outro computador.

---

### Fase 3 — Módulos avançados
**Duração estimada:** 3 semanas

**Entregas:**
- [ ] Módulo áudio: Web Audio API com GainNode, bloqueio de autoplay
  - [ ] Tratamento especial para YouTube (Shadow DOM)
  - [ ] Tratamento para elementos `<video>` genéricos
- [ ] Módulo cores:
  - [ ] Filtros SVG para Protanopia, Deuteranopia e Tritanopia
  - [ ] Modo alto contraste
  - [ ] Modo escuro forçado
  - [ ] Seletor de cor de fundo customizado
- [ ] Módulo régua de leitura: overlay com `mousemove`, cor e altura ajustáveis
- [ ] Modo Reader View: extração e exibição apenas do conteúdo principal
- [ ] Painel lateral completo com Side Panel API (substituindo o popup)
- [ ] Configurações por domínio com interface visual

**Critério de conclusão:** Todos os 6 módulos funcionando de forma independente e combinada, sem conflitos entre si.

---

### Fase 4 — Testes e publicação
**Duração estimada:** 1–2 semanas

**Entregas:**
- [ ] Testes com usuários reais (mínimo 5 alunos com diferentes perfis neurodivergentes)
- [ ] Ajustes de UX baseados no feedback
- [ ] Revisão de acessibilidade da própria interface da extensão
- [ ] Ícones e identidade visual finalizada
- [ ] Página de apresentação (landing page ou README detalhado)
- [ ] Publicação na Chrome Web Store
- [ ] Documentação de uso para professores e responsáveis

**Critério de conclusão:** Extensão aprovada e publicada na Chrome Web Store com pelo menos uma avaliação de usuário real.

---

## Desafios técnicos previstos

### Compatibilidade de áudio por site
Sites como YouTube usam Shadow DOM e players personalizados que podem não expor os elementos `<audio>` e `<video>` de forma padrão. Estratégia: combinação de MutationObserver (para detectar elementos adicionados dinamicamente) e injeção de script via `world: 'MAIN'` para acessar o contexto da página.

### Seletores de limpeza de página
Não existe um seletor universal para "sidebar" ou "banner" — cada site usa classes e IDs próprios. Estratégia: manter uma lista de seletores comuns conhecidos (`.sidebar`, `[class*='ad']`, `[id*='banner']`, `aside`, `[role='complementary']`) e permitir que usuários avançados adicionem seletores personalizados.

### Performance
Injetar CSS e JavaScript em toda página pode causar lentidão perceptível, especialmente em sites pesados. Estratégia: carregar módulos sob demanda (apenas os habilitados pelo usuário) e usar `requestAnimationFrame` para operações de DOM intensas.

### Conflitos entre módulos
Ex: o módulo de cores e o modo Reader View podem interferir um com o outro. Estratégia: definir uma ordem de aplicação fixa e garantir que cada módulo opere em sua própria camada (CSS variable scope, classes de namespace).

---

## Estrutura de dados (Firestore)

```
users/
  {userId}/
    profile:
      name: string
      email: string
      createdAt: timestamp
    
    presets/
      {presetId}/
        name: string          # ex: "Leitura de artigos"
        baseProfile: string   # "dyslexia" | "tea" | "adhd" | "colorblind" | "custom"
        modules:
          typography:
            enabled: boolean
            font: string
            fontSize: number
            letterSpacing: number
            lineHeight: number
          animations:
            enabled: boolean
          cleaner:
            enabled: boolean
            readerMode: boolean
          audio:
            enabled: boolean
            targetVolume: number  # 0.0 a 1.0
            blockAutoplay: boolean
          colors:
            enabled: boolean
            filter: string        # "protanopia" | "deuteranopia" | "tritanopia" | "high-contrast" | "dark" | null
            backgroundColor: string
          ruler:
            enabled: boolean
            color: string
            height: number
    
    siteConfigs/
      {domain}/                 # ex: "youtube.com"
        presetId: string        # referência ao preset a aplicar
        overrides: object       # ajustes específicos para este site
```

---

## Critérios de qualidade

- A extensão não deve aumentar o tempo de carregamento da página em mais de **200ms**
- O painel deve abrir em menos de **500ms**
- Todas as adaptações devem ser **reversíveis** — desativar a extensão devolve a página ao estado original
- A interface da própria extensão deve seguir as diretrizes **WCAG 2.1 AA**
- Nenhum dado de conteúdo da página visitada deve ser transmitido a servidores externos

---

*Última atualização: Junho 2026*
