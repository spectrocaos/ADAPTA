# Plano do Backend com Firebase: ADAPTA

Este documento explica como o back-end do Adapta será estruturado usando o **Firebase** (Authentication e Firestore) para tornar o aplicativo totalmente funcional e persistente. Ele substituirá os estados fictícios armazenados no `localStorage` por dados reais em nuvem.

---

## 1. Arquitetura do Firebase

### A. Firebase Authentication
Gerenciará o login, cadastro e sessões de usuários com segurança.
*   **Contas de Professores e Alunos:** Identificadas no banco por seu identificador único (`uid`).

### B. Firestore Database (Banco de Dados NoSQL)
Usaremos coleções do Firestore estruturadas da seguinte forma:

```
[Coleção: users] -> Salva perfis, tipo de usuário (professor/aluno), foto e adaptações.
[Coleção: materials] -> Salva os materiais convertidos e adaptados.
[Coleção: classes] -> Salva as turmas de professores, contendo IDs de alunos e IDs de materiais.
```

#### Coleção: `users`
Armazena os perfis e preferências visuais dos usuários (Alunos e Professores).
```json
{
  "uid": "ID_DO_FIREBASE_AUTH",
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "profile": "teacher" | "student",
  "photoUrl": "URL_DA_FOTO_DE_PERFIL",
  "condition": "tea" | "dyslexia" | "adhd" | "color_blind" | null,
  "onboarded": true | false,
  "createdAt": "2026-06-20T21:58:05Z"
}
```

#### Coleção: `materials`
Armazena os materiais convertidos e adaptados.
```json
{
  "id": "ID_GERADO",
  "title": "Título do Material",
  "content": "Conteúdo adaptado em markdown...",
  "originalType": "Texto de Apoio",
  "adaptType": "Resumo em Texto",
  "fileType": "pdf" | "txt",
  "subject": "Matemática",
  "neurodiversity": "tea" | "dyslexia" | "adhd" | "color_blind",
  "createdBy": "ID_DO_PROFESSOR",
  "createdAt": "2026-06-20T21:58:05Z"
}
```

#### Coleção: `classes`
Armazena as turmas criadas por professores e os alunos associados a elas.
```json
{
  "id": "ID_GERADO",
  "name": "Turma 8º Ano A",
  "subject": "Matemática",
  "code": "CÓDIGO_ÚNICO_DE_ACESSO",
  "teacherId": "ID_DO_PROFESSOR",
  "students": ["ID_DO_ALUNO_1", "ID_DO_ALUNO_2"],
  "materials": ["ID_DO_MATERIAL_1"],
  "createdAt": "2026-06-20T21:58:05Z"
}
```

---

## 2. Como Vamos Aplicar no Código

### Passo 1: Instalar e Configurar o SDK do Firebase
1. Instalar a dependência oficial: `npm install firebase`
2. Criar o arquivo de conexão `src/firebase/config.js` com a inicialização do Firebase usando credenciais seguras.

### Passo 2: Migrar os Hooks para o Firestore
*   `useAuth.jsx`: Migrar o fluxo de cadastro e login usando `createUserWithEmailAndPassword` e `signInWithEmailAndPassword` do Firebase. Salvaremos os metadados do perfil no Firestore (`users/{uid}`).
*   `useLibrary.js`: Ler e salvar materiais na coleção `materials` do Firestore.
*   `useClasses.js`: Gerenciar a criação de turmas, inclusão de alunos usando o código único da turma e atribuição de materiais usando o Firestore.

---

## 3. Plano de Verificação e Instalação

1. Executar a instalação do pacote `firebase`.
2. Criar e configurar o arquivo Firebase.
3. Testar a compilação com `npm run build` para garantir que não há conflitos.
