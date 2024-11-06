# Sistema de Quiz para ensino de algoritmo

<p align="center">
   <img src="https://img.shields.io/static/v1?label=STATUS&message=IN PROGRESS&color=RED&style=for-the-badge" #vitrinedev/>
</p>

Este repositório é um projeto de sistema de quiz voltado para o ensino de Lógica de Programação. Ele é dividido em dois módulos principais:
- **Backend** (web-service): API desenvolvida em NestJS para gerenciar autenticação, criação de quizzes, cadastro de perguntas e respostas, e relatórios de desempenho dos alunos.
- **Frontend** (web-app): Interface de usuário para acesso dos alunos e professores, permitindo interação com quizzes, visualização de desempenho e exportação de relatórios.

## Visão Geral
Este sistema foi desenvolvido para promover um aprendizado interativo de conceitos básicos de programação e lógica. Professores podem cadastrar quizzes, selecionar níveis de dificuldade e acompanhar o desempenho dos alunos, enquanto alunos podem responder às perguntas e monitorar seu progresso e pontuação em relação aos colegas.


## Estrutura do Projeto
```bash
├── web-service/        # Backend (API NestJS)
├── web-app/            # Frontend (Aplicação Web)
└── README.md           # Documentação principal do projeto
```

## Como Executar o Projeto

### Clonar o Repositório

```bash
git clone https://github.com/GabriellyOlinsc/AlgorithmQuiz.git
cd web-service  // ou cd web-app
```

### Executar o Backend (web-service)
Crie o arquivo .env na raiz do backend e defina as variáveis de ambiente.

```bash
cd web-service
npm install
npm run start:dev
```

### Executar o Frontend (web-app)
```bash
cd web-app
npm install
npm run dev
```