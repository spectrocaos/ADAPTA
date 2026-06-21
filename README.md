<div align="center">
  <img src="adapta-extension/assets/icons/icon.png" alt="Adapta Logo" width="120"/>
  <h1>Adapta</h1>
  <p><strong>Acessibilidade Cognitiva e Visual a um clique de distância.</strong></p>
</div>

---

## 💡 O que é a Adapta?
**Adapta** é uma extensão de acessibilidade para navegadores baseados em Chromium (Google Chrome, Edge, Brave). Ela foi desenhada com um único propósito: tornar a internet um lugar confortável e acessível para estudantes e pessoas com neurodivergências ou dificuldades visuais.

Ao contrário das ferramentas tradicionais, a Adapta é **focada em perfis cognitivos e visuais**, injetando regras dinâmicas que redesenham a web de acordo com a necessidade específica de cada usuário.

## 🎯 Principais Funcionalidades

### 🧩 Perfis de Onboarding Automáticos
Com 1 clique, o usuário molda a internet ao seu diagnóstico:
- **TDAH**: Ativa Limpeza de Anúncios e Régua de Foco para evitar distrações.
- **TEA (Autismo)**: Pausa automaticamente todas as animações, vídeos em autoplay e transições bruscas que causam sobrecarga sensorial.
- **Dislexia**: Altera as fontes de todos os sites para a *OpenDyslexic*, ajusta o espaçamento das linhas e ativa o leitor de voz nativo.
- **Daltonismo / Baixa Visão**: Aplica filtros matemáticos SVG que corrigem paletas de cores e injetam Alto Contraste.

### 🛠 Módulos Avançados
- **Modo Leitura Focada (Reader View)**: Vasculha páginas poluídas, extrai apenas o conteúdo principal e recria o artigo num ambiente isolado, como se fosse um livro limpo.
- **Régua de Foco**: Uma "lanterna" horizontal que acompanha o mouse e escurece o restante da tela para não perder a linha de leitura.
- **Leitor de Text-to-Speech**: Selecione o texto e escute, ou peça para a extensão ler o Modo Leitura Focada de ponta a ponta.
- **Configuração por Domínio**: Suas escolhas são salvas por site. Você pode querer Fonte Disléxica ativada apenas no *Wikipedia*, e desativada no *YouTube*.

---

## 🚀 Como Instalar (Modo Desenvolvedor)

Como o projeto está em fase de protótipo/testes (Fase 4), a instalação é manual:

1. Faça o download ou clone este repositório para o seu computador.
2. Abra o Google Chrome e digite na barra de endereços: `chrome://extensions/`
3. No canto superior direito, ative o **"Modo do desenvolvedor"**.
4. Clique no botão **"Carregar sem compactação"** (Load unpacked).
5. Selecione a pasta `adapta-extension` que está dentro do projeto.
6. Pronto! A extensão está instalada. Clique no ícone de "quebra-cabeça" na barra de ferramentas do Chrome e fixe a **Adapta**.

---

## 🛠 Tecnologias Utilizadas
A extensão foi construída para ser extremamente leve e performática, sem depender de pesados frameworks terceiros, garantindo compatibilidade universal:
- **Manifest V3**: Padrão mais moderno e seguro de extensões do Google.
- **Vanilla JavaScript**: Algoritmos de injeção de DOM nativos e velozes.
- **Chrome Storage Sync API**: Armazenamento na nuvem nativo do Google, suas configurações te acompanham em qualquer computador logado.
- **CSS Avançado (Glassmorphism & SVG Filters)**: Uma interface premium de luxo, acompanhada de poderosas máscaras SVG para tratamento em tempo real de daltonismo.

---

<div align="center">
  <i>Projeto desenvolvido com foco em Inclusão Digital e Acessibilidade Educacional na UFRA.</i>
</div>
