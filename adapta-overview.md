# Adapta — Extensão de Acessibilidade para Neurodivergentes

> Adapta qualquer site às suas necessidades. Para alunos com dislexia, TEA, TDAH e daltonismo.

---

## O que é a Adapta?

A **Adapta** é uma extensão para o Google Chrome que permite a qualquer pessoa adaptar visualmente e funcionalmente qualquer site da web ao seu perfil neurodivergente — sem precisar saber programar, sem acessar o código da página, sem configurar nada complexo.

O objetivo é simples: o aluno instala a extensão, faz login, escolhe seu perfil (ou personaliza do zero), e a página se transforma automaticamente para se adequar às suas necessidades. As configurações ficam salvas e se aplicam toda vez que ele voltar ao mesmo site.

---

## Para quem é?

A Adapta foi pensada principalmente para **estudantes** com as seguintes condições:

| Perfil | Dificuldade principal | O que a Adapta resolve |
|---|---|---|
| **Dislexia** | Decodificação de texto, leitura lenta | Fonte OpenDyslexic, espaçamento, régua de leitura |
| **TEA (Transtorno do Espectro Autista)** | Sobrecarga sensorial, distrações visuais | Remove animações, limpa a página, paleta neutra |
| **TDAH** | Foco, distração por estímulos | Oculta sidebars, banners, autoplay e pop-ups |
| **Daltonismo** | Distinção de cores | Filtros para Protanopia, Deuteranopia e Tritanopia |
| **Personalizado** | Múltiplas necessidades combinadas | Configuração livre de todos os módulos |

---

## Como funciona?

A extensão age diretamente na página aberta no navegador, injetando CSS e JavaScript para modificar a aparência e o comportamento do site em tempo real — da mesma forma que um desenvolvedor faria pelo "Inspecionar Elemento", mas de forma automatizada, acessível e persistida.

Nenhum dado da página visitada é enviado a servidores. As adaptações acontecem inteiramente no dispositivo do usuário.

---

## Módulos de adaptação

### Tipografia
Substitui a fonte do site por **OpenDyslexic** (fonte gratuita criada especificamente para disléxicos). Controla tamanho da fonte, espaçamento entre letras, altura de linha e largura máxima das colunas de texto para facilitar a leitura.

### Animações
Desativa todas as animações, transições e efeitos de movimento da página — incluindo GIFs animados, carrosséis e efeitos de parallax. Especialmente útil para usuários com TEA e TDAH que são sensíveis a movimento.

### Limpeza de página
Remove ou oculta elementos visuais que não fazem parte do conteúdo principal: sidebars, banners, pop-ups, widgets de chat, notificações e anúncios. Modo "leitura focada" deixa apenas o conteúdo central da página visível.

### Nivelamento de áudio
Usa a **Web Audio API** do navegador para interceptar todo áudio e vídeo reproduzido na página e normalizar o volume a um nível pré-definido pelo usuário. Também bloqueia reprodução automática (autoplay) de mídia.

### Cores e contraste
Aplica filtros de correção para os três tipos de daltonismo mais comuns. Oferece modo de alto contraste, modo escuro forçado e seletor de cor de fundo personalizado para conforto visual.

### Régua de leitura
Sobrepõe uma faixa semitransparente que acompanha o cursor do usuário e destaca a linha de texto atual, reduzindo o risco de "perder o lugar" durante a leitura — recurso muito útil para disléxicos.

---

## Perfis salvos

Após fazer login com a conta Google, o usuário pode:

- Criar e nomear diferentes perfis (ex: "Ler artigos", "Assistir aulas no Moodle")
- Salvar configurações específicas por site (ex: configuração diferente para o YouTube e para o AVA)
- Sincronizar automaticamente seus perfis entre diferentes dispositivos
- Compartilhar configurações exportadas com professores ou responsáveis

---

## Princípios de design

A Adapta foi projetada com base nos seguintes princípios:

**Respeito à autonomia** — o usuário define suas próprias necessidades. A extensão não diagnostica, não rotula e não impõe uma configuração "padrão para disléxicos". Oferece ferramentas, não julgamentos.

**Privacidade por padrão** — nenhum conteúdo da página visitada é coletado ou enviado. O processamento é local.

**Baixa fricção** — uma extensão que demora para configurar não será usada. O objetivo é chegar ao estado funcional em menos de dois minutos após a instalação.

**Inclusão real** — testada com usuários reais neurodivergentes, não apenas com base em premissas de designers.

---

## Tecnologia

A Adapta é construída sobre o padrão **Chrome Extensions Manifest V3**, com autenticação via **Google OAuth 2.0** e sincronização de dados via **Firebase**. Não depende de nenhum servidor intermediário para funcionar — a adaptação das páginas ocorre inteiramente no navegador do usuário.

---

*Adapta — porque aprender não deveria ser uma barreira.*
