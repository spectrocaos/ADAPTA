# Tarefas: Extensão Adapta

Abaixo está o plano de tarefas quebrado em pequenas partes para a criação da extensão de acessibilidade **Adapta**, com base no plano de desenvolvimento fornecido.

## Fase 1 — MVP Funcional
- `[x]` **Estrutura Base MV3**
  - `[x]` Criar e configurar `manifest.json` com as permissões iniciais.
  - `[x]` Criar `background/background.js` (Service Worker).
  - `[x]` Criar `content/content.js` (Script de injeção base).
- `[x]` **Módulo Tipografia**
  - `[x]` Adicionar fonte OpenDyslexic aos arquivos em `assets/fonts/OpenDyslexic/`.
  - `[x]` Criar `content/modules/typography.js`.
  - `[x]` Implementar injeção de fonte, controle de tamanho, espaçamento entre letras e altura de linha.
- `[x]` **Módulo Animações**
  - `[x]` Criar `content/modules/animations.js`.
  - `[x]` Implementar injeção de CSS global para desativar `animation` e `transition`.
- `[x]` **Módulo Limpeza Básica**
  - `[x]` Criar `content/modules/cleaner.js`.
  - `[x]` Ocultar sidebars e banners mapeando seletores comuns (`.sidebar`, `[class*='ad']`, etc.).
- `[x]` **Interface Popup (Rápida)**
  - `[x]` Criar estrutura do popup em `popup/popup.html`.
  - `[x]` Estilizar popup com `popup/popup.css`.
  - `[x]` Criar lógica em `popup/popup.js` adicionando toggles de "on/off" para os 3 módulos (Tipografia, Animações, Limpeza).
- `[x]` **Persistência de Dados (Local)**
  - `[x]` Implementar comunicação e armazenamento local com `chrome.storage.local`.
- `[x]` **Validação e Testes (MVP)**
  - `[x]` Testar adaptações ativas em sites de teste: YouTube, Classroom, Moodle, Wikipedia, Notion.

## Fase 2 — Login e Perfis Salvos
- `[x]` **Sincronização Nativa (Refatorado)**
  - `[x]` Substituir `chrome.storage.local` por `chrome.storage.sync`.
  - `[x]` Deletar dependências de Firebase/OAuth.
- `[x]` **Onboarding e Perfis**
  - `[x]` Criar interface de tela de onboarding.
  - `[x]` Implementar seleção de perfis pré-definidos (dislexia, TEA, TDAH, daltonismo).
- `[x]` **Sincronização**
  - `[x]` Implementar salvamento de configurações na nuvem por conta logada.
  - `[x]` Adicionar lógica para salvar configurações vinculadas por domínio (ex: config separada para `youtube.com`).

## Fase 3 — Módulos Avançados
- `[x]` **Módulo Áudio**
  - `[x]` Implementar Text-to-Speech nativo (`window.speechSynthesis`).
  - `[x]` Criar interface de play/pause/velocidade na página ou no popup.
- `[x]` **Régua de Leitura**
  - `[x]` Criar overlay (overlay mask) que segue o cursor do mouse.
  - `[x]` Adicionar controles de opacidade e altura da régua no popup.
- `[x]` **Módulo Cores e Contraste**
  - `[x]` Adicionar arquivo de filtros `assets/filters/colorblind.svg`.
  - `[x]` Criar `content/modules/colors.js`.
  - `[x]` Implementar filtros (Protanopia, Deuteranopia e Tritanopia).
  - `[x]` Implementar modos Alto Contraste e Escuro forçado.
  - `[x]` Criar seletor de cor de fundo personalizada.

- `[x]` **1. Sistema de Presets (Configurações Salvas)**
  - `[x]` Remover antigas telas de Onboarding engessadas.
  - `[x]` Criar área de "Configurações Salvas" no topo do painel.
  - `[x]` Implementar armazenamento de múltiplos perfis nomeáveis.
  - `[x]` Implementar função de Salvar Atual, Excluir e Alternar.

- `[x]` **Modo "Reader View" (Leitura Focada)**
  - `[x]` Criar `content/modules/reader.js`.
  - `[x]` Atualizar o algoritmo heurístico para extrair e exibir apenas o conteúdo principal.
  - `[x]` Injetar overlay com o botão fechar e integrar interface.

## Fase 4 — Testes e Publicação
- `[ ]` **Testes com Usuários Reais**
  - `[ ]` Realizar sessões de teste com pelo menos 5 alunos com perfis diferentes.
  - `[ ]` Mapear e implementar os ajustes de UX necessários.
- `[ ]` **Revisão de Qualidade e Acessibilidade**
  - `[ ]` Validar tempo de carregamento da página (< 200ms).
  - `[ ]` Validar tempo de abertura do painel (< 500ms).
  - `[ ]` Validar WCAG 2.1 AA na própria interface da extensão.
- `[x]` **Identidade e Design**
  - `[x]` Exportar ícones finais (`adapta-16.png`, `48.png`, `128.png`).
- `[x]` **Documentação e Material Gráfico**
  - `[x]` Criar README e/ou Landing Page de apresentação.
  - `[x]` Escrever tutorial/documentação rápida para professores e responsáveis.
- `[ ]` **Publicação**
  - `[ ]` Submeter o pacote final para a Chrome Web Store.

## Fase 5 — Backlog Futuro (V2.0)
- `[ ]` **Painel Lateral (Side Panel Completo)**
  - `[ ]` Configurar React + Vite para o Side Panel.
  - `[ ]` Criar `panel/panel.html`, `panel.js` e `panel.css`.
  - `[ ]` Substituir popup inicial pelo Side Panel para configurações completas.
  - `[ ]` Implementar UI com componentes visuais de configuração por domínio.
