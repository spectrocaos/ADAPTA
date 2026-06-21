# Plano de Refinamento e Melhorias Contínuas (Adapta V2)

Nesta etapa, nosso foco muda de "criar funcionalidades do zero" para **"refinar, aprofundar e entregar uma experiência de altíssimo nível"**. Vamos melhorar a inteligência por trás de cada botão.

### 1. Refinamento do Onboarding (A "Entrada" na Extensão)
- **Como é hoje:** O usuário clica no nome da sua deficiência (TDAH, TEA, etc) e as chaves são ligadas automaticamente nos bastidores, pulando direto pro painel.
- **A Melhoria (Wizard de Configuração):**
  - **Entrevista Interativa:** Em vez de assumir as configurações, a extensão faz 3 perguntinhas rápidas com exemplos visuais. Exemplo: *"Qual desses dois textos você lê melhor?"* (Mostra Arial vs OpenDyslexic). *"Esse fundo muito claro incomoda seus olhos?"*.
  - **Teste de Daltonismo:** Mostrar uma imagem rápida (teste de Ishihara) para a extensão descobrir sozinha se é Protanopia ou Deuteranopia.

### 2. Refinamento do Perfil TDAH (Foco Extremo)
- **Como é hoje:** Liga a Limpeza Básica e a Régua.
- **A Melhoria:**
  - **Leitura Focada Automática:** Perguntar ao usuário se ele deseja que o "Modo Leitura" abra sozinho sempre que ele entrar em um blog ou portal de notícias.
  - **Filtro de Escala de Cinza:** Adicionar uma opção de deixar a tela em "Preto e Branco" para remover o gatilho de dopamina de botões vermelhos/coloridos de redes sociais.

### 3. Refinamento do Perfil TEA (Espectro Autista)
- **Como é hoje:** Pausa as animações.
- **A Melhoria:**
  - **Bloqueio de Autoplay Total:** Um script mais agressivo que impede qualquer vídeo ou áudio do YouTube/Sites de começar a tocar sozinho ao abrir a página (evita sustos/sobrecarga auditiva).
  - **Cores Calmantes:** Opção de aplicar um filtro Sépia suave ou "Modo Pastel" na tela inteira para reduzir a agressividade de fundos brancos brilhantes.

### 4. Refinamento do Perfil Dislexia e Régua de Leitura
- **Como é hoje:** Troca a fonte para OpenDyslexic, ativa a régua cinza.
- **A Melhoria:**
  - **Customização da Régua:** Colocar uma "engrenagem" do lado da chave da régua no popup, permitindo que o usuário escolha a **cor da régua** (azul claro ajuda muito alguns disléxicos, a Síndrome de Irlen) e a **espessura da faixa**.
  - **Espaçamento Fino:** Um slider simples para ajustar a distância entre as letras e linhas (Letter-spacing/Line-height customizáveis).

### 5. Melhorias de Feedback e Interface (UX)
- **Toast Notifications:** Quando o usuário ligar a Tipografia no popup, mostrar uma pequena notificação flutuante verde na própria página dizendo "Fonte Adaptada Ativada para este site". Assim ele sabe que a ação funcionou na hora.
- **Tratamento de Erros no Áudio:** Se a página não tiver texto selecionado, o botão de áudio avisa: "Selecione o texto que quer ouvir primeiro".
