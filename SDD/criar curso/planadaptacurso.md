# Plano — Módulo de Cursos da Plataforma Adapta

> Documento de especificação funcional para o time de produto/interface.
> Cobre o fluxo completo: criação de curso → criação de aula → adaptação automática de conteúdo → publicação.

---

## 1. Ponto de entrada (Área de Trabalho)

O professor está na página **Área de Trabalho** e vê a seção **"Cursos criados"** — um novo carrossel de cards, no mesmo padrão visual de "Meu progresso por trilha" (já existente na tela).

Cada card do carrossel mostra:
- Nome do curso
- Turma vinculada
- Número de aulas
- % de progresso dos alunos

O professor clica em um card ou em **"Ver todos os cursos"**. Isso abre a página de cursos.

---

## 2. Página: Meus Cursos

O professor vê os cursos que já criou — ou, se for o primeiro acesso, uma tela vazia com o botão **"Criar primeiro curso"**.

Ele clica em **"Novo Curso"** e preenche:

| Campo | Descrição |
|---|---|
| Nome do curso | Texto livre |
| Descrição curta | Texto livre |
| Turma vinculada | Dropdown — puxa as turmas já criadas |
| Perfil de adaptação padrão | Dropdown — puxa os perfis salvos (ex: "Turma com TEA leve") |

Ao salvar, o curso é criado e o professor entra automaticamente dentro dele.

---

## 3. Dentro do Curso: Lista de Aulas

O professor vê a estrutura do curso — uma lista de aulas, inicialmente vazia.

Ele clica em **"Nova Aula"**.

---

## 4. Criando uma Aula — Duas Rotas

Ao clicar em "Nova Aula", aparece uma escolha com duas opções claras:

### Rota A — Usar material já convertido
O professor abre a **Biblioteca de materiais** diretamente dentro dessa tela. Seleciona um material que já foi adaptado pelo Estúdio. Esse material entra como conteúdo base da aula — **já chega adaptado** conforme o perfil vinculado ao curso.

### Rota B — Criar o material agora
O professor cola um texto, sobe um PDF, uma imagem ou um vídeo — exatamente como faz no Estúdio de materiais. O processo de adaptação roda ali mesmo, sem precisar sair da página do curso. O material convertido já fica salvo na aula **e também** na Biblioteca.

---

## 5. O motor de adaptação — como o conteúdo se transforma para cada perfil

> Esta é a etapa central do produto: é aqui que um mesmo conteúdo se torna acessível para diferentes perfis de alunos. Abaixo, o exemplo de referência para perfil **TEA**.

### Pipeline de transformação

```
Conteúdo enviado (PDF / Texto, Vídeo / Áudio, Imagem / Slides)
            ↓
Motor de análise do conteúdo
(extrai conceitos, vocabulário, estrutura e nível de abstração)
            ↓
Perfil do aluno (configurado por pais/professores)
(ex: não gosta de escrever, prefere imagens, sensível a sons, gosta de jogos)
            ↓
Fragmentação inteligente
(1 conceito = 1 micro-atividade de até 5 minutos)
            ↓
Geração de blocos de atividade conforme o perfil:
  🎧 Escuta   — áudio narrado com pausa
  ⬜ Complete — lacunas com imagem/figura
  🔀 Ordene   — sequência de imagens/fatos
  ✏️ Desenhe — representação do que aprendeu
  📄 No papel — folha impressa para escrever
            ↓
Registro de progresso
(professor e pais veem quais atividades foram concluídas)
```

### Exemplo real — "História do Brasil" para aluno TEA que não gosta de ler ou escrever

**Atividade 1 — Ouça e aponte**
Narração de 90s sobre a chegada de Pedro Álvares Cabral. O aluno aperta PAUSA e aponta em um mapa ilustrado onde aconteceu. Sem ler. Sem escrever.

**Atividade 2 — A folha de papel entra aqui**
A plataforma gera um PDF para imprimir: "Ligue o personagem ao que ele fez" (3 figuras).

### 5.1 Exemplos de matérias prontas — História, 7 anos, perfil TEA

> Dois exemplos de referência para popular a Biblioteca de materiais e servir de modelo de aula no MVP. Ambos seguem o mesmo pipeline da seção 5: fragmentação em micro-atividades de até 5 minutos, sem exigir leitura ou escrita longa.

#### Exemplo 1 — "O Dia do Indígena: como viviam os primeiros povos do Brasil"

**Conteúdo original (fonte):** texto/PDF de 1 página sobre os povos indígenas brasileiros antes da chegada dos portugueses.

**Perfil do aluno:** 7 anos, não gosta de ler ou escrever, sensível a sons altos, prefere imagens.

| Bloco | Como é adaptado |
|---|---|
| 🎧 Atividade 1 — Ouça e aponte | Narração curta (60–90s), tom de voz calmo, sem efeitos sonoros bruscos: "Antes dos navios chegarem, várias famílias indígenas já moravam aqui, perto dos rios e das matas." Aluno aperta PAUSA e aponta, em uma ilustração, onde ficavam as aldeias (perto do rio, perto da mata, perto da praia). |
| ⬜ Atividade 2 — Complete com imagem | Frase com lacuna ilustrada: "Os indígenas pescavam no 🖼️ (rio)" — aluno arrasta a imagem certa para o espaço, sem escrever. |
| 🔀 Atividade 3 — Ordene | 3 imagens (plantar → colher → cozinhar) para o aluno organizar na ordem certa do dia a dia de uma aldeia. |
| 📄 Atividade 4 — No papel | PDF gerado automaticamente: "Ligue a atividade à imagem certa" (pescar → rio, caçar → mata, dançar → roda). |

#### Exemplo 2 — "A Chegada dos Portugueses ao Brasil"

**Conteúdo original (fonte):** vídeo curto narrado sobre a chegada de Pedro Álvares Cabral em 1500.

**Perfil do aluno:** 7 anos, não gosta de escrever, gosta de jogos, adora desenhar.

| Bloco | Como é adaptado |
|---|---|
| 🎧 Atividade 1 — Ouça e aponte | Narração de 90s: "Há muito tempo, navios grandes chegaram ao Brasil. Os homens dentro deles vieram de muito longe, de um lugar chamado Portugal." Aluno aperta PAUSA e aponta, em um mapa ilustrado simples, de onde os navios vieram e onde chegaram. |
| 🔀 Atividade 2 — Ordene | Sequência de 3 imagens: navio no mar → navio chegando à praia → pessoas descendo do navio. Aluno arrasta na ordem certa (vira um jogo de sequência, não uma prova). |
| ✏️ Atividade 3 — Desenhe | "Desenhe como você imagina que era o navio de Pedro Álvares Cabral." Sem exigência de texto, só desenho livre. |
| 📄 Atividade 4 — No papel | PDF gerado automaticamente: "Ligue o personagem ao que ele fez" (Cabral → desceu do navio, indígena → mostrou a terra, marinheiro → remou o barco). |

> Ambos os exemplos podem entrar já cadastrados na Biblioteca de materiais como conteúdo de demonstração (seed data) para o MVP, permitindo que o professor veja o resultado da adaptação antes mesmo de subir seu próprio material.

### Por que isso importa para o módulo de Cursos
Cada **bloco de atividade** dentro de uma aula (ver seção 6) é gerado seguindo exatamente esse pipeline. O professor não precisa montar essas variações manualmente — o sistema já aplica a fragmentação e escolhe os formatos de atividade (escuta, complete, ordene, desenhe, no papel) com base no perfil vinculado ao curso ou ao aluno individual.

---

## 6. Estrutura de uma Aula

Depois de escolher a Rota A ou B, a aula é montada com os seguintes blocos:

1. **Bloco de conteúdo principal**
   O material adaptado: texto fragmentado, vídeo com legendas, áudio narrado, imagens com descrição — conforme o perfil do aluno.

2. **Blocos de atividade**
   Gerados automaticamente a partir do conteúdo. Cada conceito identificado vira uma micro-atividade (ver pipeline na seção 5). O professor pode adicionar, remover ou reordenar.

3. **Bloco de atividade impressa**
   Se o perfil do aluno indica preferência por papel, a aula gera automaticamente um PDF para imprimir. O professor vê o botão **"Visualizar folha para impressão"**.

4. **Bloco de avaliação**
   Pergunta simples no final da aula para registrar se o aluno concluiu e como foi.

---

## 7. Publicação

O professor revisa a aula e clica em **"Publicar"**.

A aula aparece para os alunos da turma vinculada, **já no formato adaptado ao perfil de cada um**.

> Se a turma tem alunos com perfis diferentes, a mesma aula é exibida de formas diferentes para cada aluno:
> - Aluno A → recebe com áudio prioritário
> - Aluno B → recebe com imagens
> - Aluno C → recebe com a folha para imprimir

Isso é possível porque a adaptação (seção 5) não acontece uma única vez por aula — ela é recalculada **por perfil de aluno** no momento da publicação/visualização.

---

## 8. Fluxo resumido em uma linha

**Área de Trabalho (carrossel "Cursos criados") → Meus Cursos → Curso → Aula → [Biblioteca ou Estúdio] → Motor de análise → Perfil do aluno → Fragmentação inteligente → Blocos de atividade gerados → Folha impressa (se necessário) → Publicado para a turma → Cada aluno vê conforme seu perfil**

---

## 9. Próximos passos sugeridos

- [ ] Definir wireframe do carrossel "Cursos criados" na Área de Trabalho
- [ ] Definir wireframe da tela "Meus Cursos" (vazio + populado)
- [ ] Definir wireframe da tela "Novo Curso" (formulário)
- [ ] Definir wireframe da "Lista de Aulas" dentro do curso
- [ ] Definir wireframe da escolha Rota A / Rota B
- [ ] Definir wireframe da estrutura de blocos da aula (conteúdo, atividades, folha impressa, avaliação)
- [ ] Definir wireframe da visualização da aula publicada por perfil de aluno
