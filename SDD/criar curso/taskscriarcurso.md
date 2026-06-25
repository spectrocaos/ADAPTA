# Tasks — Implementação do Módulo de Cursos (Plataforma Adapta)

> Baseado em: `planadaptacurso.md`
> Fragmentação das tarefas necessárias para executar o plano, da entrada na Área de Trabalho até a publicação da aula adaptada por perfil.

---

## ⚠️ REGRA OBRIGATÓRIA PARA TODAS AS TASKS

**Antes de iniciar qualquer task abaixo, é obrigatório apresentar um Plano de Implementação e aguardar aprovação.**

O Plano de Implementação de cada task deve conter, no mínimo:
1. **Objetivo da task** — o que será entregue
2. **Escopo** — o que entra e o que explicitamente NÃO entra nessa task
3. **Dependências** — quais tasks/decisões precisam estar prontas antes
4. **Abordagem técnica/visual** — como será feito (componentes, dados, telas envolvidas)
5. **Critérios de aceite** — como saber que a task está concluída
6. **Riscos ou pontos em aberto** — dúvidas que precisam de validação antes de codar/desenhar

🚫 Nenhuma task deve ser iniciada (código, wireframe ou conteúdo final) sem que o Plano de Implementação correspondente tenha sido apresentado e aprovado.

---

## Fase 0 — Preparação

### Task 0.1 — Validar perfis de adaptação existentes
- Confirmar quais perfis salvos já existem na plataforma (ex: "Turma com TEA leve") e seus parâmetros (sensibilidade a som, preferência por imagem, preferência por papel, etc.)
- **Depende de:** nada — é ponto de partida
- **Plano de implementação obrigatório antes de iniciar.**

### Task 0.2 — Definir seed data de exemplo (Histórias para TEA, 7 anos)
- Cadastrar os 2 exemplos do plano ("O Dia do Indígena" e "A Chegada dos Portugueses ao Brasil") como conteúdo de demonstração na Biblioteca de materiais
- **Depende de:** Task 0.1
- **Plano de implementação obrigatório antes de iniciar.**

---

## Fase 1 — Entrada e listagem de cursos

### Task 1.1 — Carrossel "Cursos criados" na Área de Trabalho
- Criar o carrossel de cards seguindo o padrão visual de "Meu progresso por trilha"
- Cada card: nome do curso, turma vinculada, número de aulas, % de progresso
- Botão "Ver todos os cursos" leva para a página Meus Cursos
- **Depende de:** Task 1.2 (precisa existir ao menos a estrutura de dados de curso)
- **Plano de implementação obrigatório antes de iniciar.**

### Task 1.2 — Página "Meus Cursos"
- Estado vazio com botão "Criar primeiro curso"
- Estado populado com lista/grid de cursos existentes
- **Depende de:** nada (pode ser feita em paralelo com 1.1, mas 1.1 consome seus dados)
- **Plano de implementação obrigatório antes de iniciar.**

### Task 1.3 — Formulário "Novo Curso"
- Campos: nome do curso, descrição curta, turma vinculada (dropdown), perfil de adaptação padrão (dropdown)
- Ação de salvar cria o curso e redireciona para dentro dele
- **Depende de:** Task 0.1 (perfis), turmas já existentes na plataforma
- **Plano de implementação obrigatório antes de iniciar.**

---

## Fase 2 — Dentro do curso

### Task 2.1 — Lista de Aulas dentro do curso
- Tela que mostra a estrutura do curso e suas aulas (vazio inicialmente)
- Botão "Nova Aula"
- **Depende de:** Task 1.3
- **Plano de implementação obrigatório antes de iniciar.**

### Task 2.2 — Tela de escolha: Rota A ou Rota B
- Apresentar as duas opções claramente (usar material da Biblioteca vs. criar material agora)
- **Depende de:** Task 2.1
- **Plano de implementação obrigatório antes de iniciar.**

---

## Fase 3 — Rotas de criação de conteúdo

### Task 3.1 — Rota A: Biblioteca de materiais embutida na tela do curso
- Permitir abrir e selecionar um material já adaptado sem sair da tela de criação de aula
- Material selecionado entra como conteúdo base, já adaptado ao perfil do curso
- **Depende de:** Task 2.2, Biblioteca de materiais já existente
- **Plano de implementação obrigatório antes de iniciar.**

### Task 3.2 — Rota B: Upload/colagem de conteúdo direto na tela do curso
- Reaproveitar o fluxo do Estúdio de materiais (texto, PDF, imagem, vídeo) dentro da tela do curso
- Material final salvo simultaneamente na aula e na Biblioteca
- **Depende de:** Task 2.2, motor de adaptação (Fase 4) já operante
- **Plano de implementação obrigatório antes de iniciar.**

---

## Fase 4 — Motor de adaptação

### Task 4.1 — Pipeline de análise de conteúdo
- Implementar/conectar o motor que extrai conceitos, vocabulário, estrutura e nível de abstração do material enviado
- **Depende de:** nada além do conteúdo de entrada (Task 3.2 ou material já existente)
- **Plano de implementação obrigatório antes de iniciar.**

### Task 4.2 — Fragmentação inteligente (1 conceito = 1 micro-atividade)
- Implementar a lógica que quebra o conteúdo analisado em micro-atividades de até 5 minutos
- **Depende de:** Task 4.1
- **Plano de implementação obrigatório antes de iniciar.**

### Task 4.3 — Geração de blocos de atividade por perfil
- Implementar a geração dos formatos: Escuta, Complete, Ordene, Desenhe, No papel — conforme o perfil do aluno/curso
- Validar com os 2 exemplos de seed data (Task 0.2) como casos de teste
- **Depende de:** Task 4.2, Task 0.1 (perfis)
- **Plano de implementação obrigatório antes de iniciar.**

---

## Fase 5 — Estrutura e edição da aula

### Task 5.1 — Bloco de conteúdo principal
- Renderizar o material adaptado dentro da aula (texto fragmentado, vídeo com legenda, áudio narrado, imagem com descrição)
- **Depende de:** Fase 4 completa
- **Plano de implementação obrigatório antes de iniciar.**

### Task 5.2 — Blocos de atividade editáveis
- Exibir as micro-atividades geradas automaticamente
- Permitir ao professor adicionar, remover ou reordenar
- **Depende de:** Task 4.3, Task 5.1
- **Plano de implementação obrigatório antes de iniciar.**

### Task 5.3 — Bloco de atividade impressa
- Gerar PDF automaticamente quando o perfil indicar preferência por papel
- Botão "Visualizar folha para impressão"
- **Depende de:** Task 4.3
- **Plano de implementação obrigatório antes de iniciar.**

### Task 5.4 — Bloco de avaliação final
- Pergunta simples de conclusão/feedback ao final da aula
- **Depende de:** Task 5.1
- **Plano de implementação obrigatório antes de iniciar.**

---

## Fase 6 — Publicação e visualização por perfil

### Task 6.1 — Fluxo de publicação da aula
- Botão "Publicar" na tela de edição da aula
- Validações antes de publicar (conteúdo principal presente, ao menos 1 atividade)
- **Depende de:** Fase 5 completa
- **Plano de implementação obrigatório antes de iniciar.**

### Task 6.2 — Renderização da aula por perfil de aluno
- Implementar a lógica de recalcular a exibição da aula publicada conforme o perfil de cada aluno da turma (áudio prioritário, imagens, folha impressa, etc.)
- **Depende de:** Task 6.1, Fase 4 (motor de adaptação)
- **Plano de implementação obrigatório antes de iniciar.**

### Task 6.3 — Registro de progresso
- Professor e responsáveis veem quais atividades cada aluno concluiu e como foi
- **Depende de:** Task 6.2
- **Plano de implementação obrigatório antes de iniciar.**

---

## Fase 7 — Wireframes (paralelos, conforme seção 9 do plano)

> Estas tasks podem rodar em paralelo às fases acima, mas cada wireframe também precisa de Plano de Implementação antes de ser produzido.

- [ ] **Task 7.1** — Wireframe do carrossel "Cursos criados" na Área de Trabalho
- [ ] **Task 7.2** — Wireframe da tela "Meus Cursos" (vazio + populado)
- [ ] **Task 7.3** — Wireframe da tela "Novo Curso" (formulário)
- [ ] **Task 7.4** — Wireframe da "Lista de Aulas" dentro do curso
- [ ] **Task 7.5** — Wireframe da escolha Rota A / Rota B
- [ ] **Task 7.6** — Wireframe da estrutura de blocos da aula (conteúdo, atividades, folha impressa, avaliação)
- [ ] **Task 7.7** — Wireframe da visualização da aula publicada por perfil de aluno

---

## Ordem geral recomendada de execução

```
Fase 0 (preparação)
   ↓
Fase 1 (entrada/listagem) ──┐
   ↓                        ├─→ podem ser paralelas
Fase 2 (dentro do curso) ───┘
   ↓
Fase 4 (motor de adaptação) — pode começar em paralelo com Fase 1/2
   ↓
Fase 3 (rotas de conteúdo) — depende da Fase 4 estar funcional
   ↓
Fase 5 (estrutura da aula)
   ↓
Fase 6 (publicação e visualização por perfil)

Fase 7 (wireframes) — paralela a todas, sempre 1 etapa antes da implementação correspondente
```

---

## Checklist de conformidade (repetir a cada task)

- [ ] Plano de Implementação apresentado
- [ ] Plano de Implementação aprovado
- [ ] Task executada conforme o plano aprovado
- [ ] Critérios de aceite verificados
- [ ] Pendências/riscos documentados para a próxima task
