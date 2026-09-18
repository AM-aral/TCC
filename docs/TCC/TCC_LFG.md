# LFG - Look For Group: Plataforma Web para Conexão de Jogadores

---

## CAPA

**Serviço Nacional de Aprendizagem Industrial - SENAI**

**Curso:** Desenvolvimento de Sistemas

**Trabalho de Conclusão de Curso**

**Título:** LFG - Look For Group: Plataforma Web para Conexão de Jogadores

**Integrantes:** Pedro Henrique Amaral de Souza

**Professor Orientador:** Samuel Cunha

**Cidade:** Curitiba, Paraná

**2026**

---

## SUMÁRIO

1. Introdução
2. Objetivos
3. Descrição do Problema
4. Tecnologias Utilizadas
5. Levantamento de Requisitos
6. Modelagem do Sistema
7. Banco de Dados
8. Desenvolvimento do Back-end
9. Desenvolvimento do Front-end
10. Funcionalidades do Sistema
11. Testes Realizados
12. Dificuldades Encontradas
13. Melhorias Futuras
14. Conclusão
15. Referências

---

## 1. INTRODUÇÃO

O projeto consiste em um sistema web desenvolvido para conectar jogadores de videogame e formar equipes por interesses em comum. A plataforma, denominada **LFG (Look For Group)**, permite que jogadores criem salas para diferentes jogos, definindo critérios como elo, modo de jogo, função e gênero, além de possibilitar a busca por outros jogadores e a avaliação das experiências por meio de um sistema de notas e comentários.

O sistema foi desenvolvido para jogadores que desejam montar equipes fixas ou encontrar parceiros de jogo compatíveis, atendendo a uma necessidade comum no cenário de jogos competitivos e cooperativos: a dificuldade de encontrar pessoas com interesses, nível de habilidade e disponibilidade semelhantes.

Para atender a essa necessidade, o projeto foi dividido em duas partes: um **back-end** que disponibiliza uma API REST com banco de dados MongoDB, e um **front-end** responsivo desenvolvido com React e Vite.

---

## 2. OBJETIVOS

### 2.1 Objetivo Geral

Desenvolver uma plataforma web capaz de conectar jogadores e formar equipes de jogo de acordo com interesses em comum, substituindo o pareamento aleatório por um processo de busca intencional e compatível.

### 2.2 Objetivos Específicos

- Desenvolver uma API REST com autenticação por token JWT.
- Criar uma interface web responsiva e intuitiva.
- Integrar o banco de dados MongoDB.
- Permitir o cadastro e o login de usuários.
- Permitir a criação, a listagem, a edição de status e a exclusão de salas.
- Implementar filtros de salas por elo, modo de jogo, gênero e número de jogadores.
- Implementar um sistema de avaliações (feedbacks) entre jogadores.
- Implementar a busca de jogadores e de salas.
- Permitir o gerenciamento do perfil do usuário, incluindo jogos, elos e funções.

---

## 3. DESCRIÇÃO DO PROBLEMA

### Qual problema existe?

Jogadores que preferem jogar em grupo — seja em jogos competitivos ou cooperativos — frequentemente enfrentam o pareamento aleatório promovido pelas próprias plataformas de jogo. Esse pareamento não considera afinidade, nível de habilidade, função preferida ou horários, o que resulta em partidas menos agradáveis e em dificuldade para manter uma equipe fixa.

Além disso, não existe um canal centralizado que reúna informações de compatibilidade entre jogadores, como elo alcançado, funções dominadas e jogos de interesse. As tentativas de montar time dependem de conversas em grupos genéricos, ausentes de critérios objetivos.

### Quem sofre com esse problema?

Jogadores solo que desejam jogar em equipe, possuem rotinas específicas e buscam parceiros com perfil semelhante ao seu. Também afeta grupos que precisam de um jogador específico (por exemplo, um suporte em League of Legends ou um duelista em Valorant) para completar a equipe.

### Como o sistema resolve esse problema?

O sistema LFG centraliza, em uma única plataforma, a criação de salas organizadas por jogo, com critérios configuráveis (elo, modo, função, gênero e tamanho da equipe). O jogador pode filtrar salas conforme sua necessidade, entrar na sala desejada e ainda consultar o perfil público dos outros jogadores, incluindo a avaliação média recebida por meio de feedbacks. Dessa forma, a formação de times passa a ser intencional, baseada em dados, e não mais aleatória.

---

## 4. TECNOLOGIAS UTILIZADAS

**Tabela 1** — Tecnologias utilizadas no desenvolvimento do projeto.

| Tecnologia   | Finalidade                                       |
|--------------|--------------------------------------------------|
| React        | Interface do usuário (front-end)                 |
| Vite         | Ambiente de desenvolvimento e build              |
| JavaScript   | Linguagem utilizada no front-end e no back-end   |
| Node.js      | Ambiente de execução do servidor                 |
| Express      | Desenvolvimento da API REST                      |
| MongoDB      | Banco de dados NoSQL                             |
| Mongoose     | Modelagem e gerenciamento de dados (ODM)         |
| JSON Web Token (JWT) | Autenticação e sessão de usuários        |
| Bcrypt       | Criptografia de senhas                           |
| CORS         | Liberação de requisições entre origens           |
| Dotenv       | Gerenciamento de variáveis de ambiente           |
| Nodemon      | Reinicialização automática do servidor em desenvolvimento |
| Git          | Controle de versão                               |

---

## 5. LEVANTAMENTO DE REQUISITOS

### 5.1 Requisitos Funcionais

**Tabela 2** — Requisitos funcionais do sistema.

| Código | Descrição                                                     |
|--------|----------------------------------------------------------------|
| RF01   | Cadastrar usuário com nome, email e senha.                     |
| RF02   | Realizar login com email e senha.                              |
| RF03   | Recuperar o perfil do usuário logado.                          |
| RF04   | Editar o perfil (nome, apelido, descrição, foto, banner, tags, preferências e jogos). |
| RF05   | Criar salas de jogo.                                           |
| RF06   | Listar salas de um jogo.                                       |
| RF07   | Filtrar salas por elo, modo de jogo, gênero e número de jogadores. |
| RF08   | Entrar em uma sala.                                            |
| RF09   | Sair de uma sala.                                              |
| RF10   | Alterar o status da sala (aberta, concluída ou cancelada) — somente o criador. |
| RF11   | Excluir uma sala — somente o criador.                          |
| RF12   | Visualizar o histórico de salas do usuário.                    |
| RF13   | Avaliar outros jogadores com nota de 1 a 5 estrelas e comentário. |
| RF14   | Visualizar o perfil público de um jogador com média de avaliações. |
| RF15   | Buscar jogadores por nome, apelido ou email.                   |
| RF16   | Buscar salas por nome, descrição ou jogo.                      |
| RF17   | Trocar de conta por meio de contas salvas no dispositivo.      |
| RF18   | Encerrar a sessão (logout).                                    |

### 5.2 Requisitos Não Funcionais

**Tabela 3** — Requisitos não funcionais do sistema.

| Código | Descrição                                                     |
|--------|----------------------------------------------------------------|
| RNF01  | Interface intuitiva e de fácil navegação.                      |
| RNF02  | Sistema responsivo, adaptável a diferentes tamanhos de tela.   |
| RNF03  | API REST estruturada e separada do front-end.                  |
| RNF04  | Banco de dados MongoDB.                                        |
| RNF05  | Senhas armazenadas de forma criptografada (Bcrypt).            |
| RNF06  | Sessões seguras por token JWT com expiração (7 dias).          |
| RNF07  | Suporte a imagens em base64 (foto e banner do perfil).         |

---

## 6. MODELAGEM DO SISTEMA

### 6.1 Diagrama de Casos de Uso

O diagrama de casos de uso representa as interações entre o ator **Jogador** e o sistema. O jogador pode se cadastrar, entrar no sistema, gerenciar o próprio perfil, criar salas, visualizar salas, entrar e sair de salas, gerenciar o status das próprias salas, avaliar outros jogadores e consultar perfis públicos.

> **[Inserir captura: Diagrama de Casos de Uso — Figura 1]**

A Figura 1 apresenta o diagrama de casos de uso do sistema, destacando os principais casos considerados no desenvolvimento.

### 6.2 Modelo do Banco de Dados

O modelo de dados é composto por três coleções: **User**, **Room** e **Feedback**. Um usuário (User) pode ser criador de uma ou mais salas (Room) e participar de várias salas; cada sala possui um único criador e vários jogadores. Os feedbacks relacionam um remetente (usuário avaliador) a um destinatário (usuário avaliado), permitindo que um usuário receba várias avaliações.

> **[Inserir captura: Modelo do Banco de Dados — Figura 2]**

A Figura 2 apresenta o modelo do banco de dados com as coleções e seus relacionamentos.

### 6.3 Fluxograma (opcional)

O fluxo principal do sistema pode ser descrito da seguinte forma: o usuário acessa a plataforma; caso não possua conta, realiza o cadastro; em seguida, realiza o login e é direcionado à página inicial. A partir da home, o usuário pode selecionar um jogo, visualizar as salas disponíveis, aplicar filtros, entrar em uma sala existente ou criar uma nova sala. Ao término da partida, o usuário pode avaliar os jogadores que participaram e consultar as avaliações recebidas no próprio perfil.

> **[Inserir captura: Fluxograma do funcionamento do sistema — Figura 3]**

A Figura 3 apresenta o fluxograma simplificado do funcionamento do sistema.

---

## 7. BANCO DE DADOS

O banco de dados utilizado foi o **MongoDB**, gerenciado por meio do **Mongoose**. O banco é composto por três coleções, descritas a seguir.

### 7.1 Coleção: Usuários

**Tabela 4** — Campos da coleção Usuários.

| Campo        | Tipo     | Obrigatório |
|--------------|----------|-------------|
| nome         | String   | Sim         |
| email        | String   | Sim         |
| senha        | String   | Sim         |
| foto         | String   | Não         |
| descricao    | String   | Não         |
| apelido      | String   | Não         |
| banner       | String   | Não         |
| tags         | String[] | Não         |
| preferencias | String[] | Não         |
| jogos        | Array de objetos (jogo, elo, funcao, funcao2) | Não |

O campo `email` é único e armazenado em letras minúsculas. O campo `senha` guarda apenas o hash gerado pelo Bcrypt. A coleção possui os campos de data de criação e atualização (`timestamps`).

### 7.2 Coleção: Salas

**Tabela 5** — Campos da coleção Salas.

| Campo         | Tipo     | Obrigatório |
|---------------|----------|-------------|
| jogo          | String   | Sim         |
| nome          | String   | Sim         |
| descricao     | String   | Não         |
| modo          | String   | Não         |
| time          | String   | Não         |
| elo           | String   | Não         |
| funcao        | String   | Não         |
| genero        | String   | Não         |
| maxJogadores  | Number   | Não         |
| status        | String   | Não         |
| criador       | ObjectId (ref. User) | Sim |
| jogadores     | ObjectId[] (ref. User) | Não |

O campo `status` assume os valores `aberta`, `concluida` ou `cancelada`, e a sala inicia sempre como `aberta`. O campo `maxJogadores` é definido conforme o tamanho da equipe escolhida no momento da criação (DUO = 2, TRIO = 3, SQUAD = 4, 5V5 = 5) ou pelo modo SoloQ (fixado em 2).

### 7.3 Coleção: Feedbacks

**Tabela 6** — Campos da coleção Feedbacks.

| Campo       | Tipo     | Obrigatório |
|-------------|----------|-------------|
| remetente   | ObjectId (ref. User) | Sim |
| destinatario| ObjectId (ref. User) | Sim |
| jogo        | String   | Não         |
| nota        | Number   | Sim         |
| comentario  | String   | Não         |

A nota é um valor inteiro entre 1 e 5. O sistema impede que um usuário avalie a si mesmo.

---

## 8. DESENVOLVIMENTO DO BACK-END

O back-end foi desenvolvido em **Node.js** com o framework **Express**, seguindo o padrão de organização em camadas: rotas, controllers, models e middlewares.

### 8.1 Estrutura de Pastas

```
back end/
├── src/
│   ├── server.js
│   ├── database/
│   │   └── connection.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Room.js
│   │   └── Feedback.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── usuarioController.js
│   │   ├── roomController.js
│   │   └── feedbackController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── usuarioRoutes.js
│   │   ├── roomRoutes.js
│   │   └── feedbackRoutes.js
│   └── middleware/
│       └── auth.js
└── .env
```

> **[Inserir captura: Estrutura de pastas do back-end — Figura 4]**

A Figura 4 apresenta a organização dos arquivos do back-end.

### 8.2 Servidor e Conexão com o Banco

O arquivo `server.js` configura os middlewares gerais — como o CORS e o parser de JSON com limite de 8MB para imagens em base64 — registra as rotas e inicia o servidor após a conexão com o MongoDB. A conexão é realizada pelo arquivo `database/connection.js` por meio da string `MONGO_URI` definida no arquivo `.env`. O servidor escuta na porta definida pela variável `PORT` (padrão 3000).

### 8.3 Models

Os models são os schemas do Mongoose que descrevem a estrutura dos documentos das coleções **User**, **Room** e **Feedback**, conforme detalhado na seção 7.

### 8.4 Controllers

Os controllers concentram a lógica de negócio das rotas:

- **authController**: cadastro, login, busca do perfil do usuário logado e atualização de perfil.
- **usuarioController**: busca de jogadores e exibição de perfil público com resumo de avaliações.
- **roomController**: criação, listagem, entrada, saída, histórico, alteração de status e exclusão de salas.
- **feedbackController**: envio e listagem de feedbacks.

### 8.5 Middlewares

- **auth**: verifica o token JWT no cabeçalho da requisição (`Authorization: Bearer <token>`), decodifica os dados do usuário e os disponibiliza na requisição. Rotas sem token válido recebem a resposta 401.

### 8.6 Principais Rotas

**Tabela 7** — Principais rotas da API.

| Método | Rota                     | Autenticação | Descrição                                   |
|--------|--------------------------|--------------|---------------------------------------------|
| POST   | /auth/cadastro           | Não          | Cadastra um novo usuário                    |
| POST   | /auth/login              | Não          | Realiza o login e retorna o token           |
| GET    | /auth/me                 | Sim          | Retorna o perfil do usuário logado          |
| PUT    | /auth/perfil             | Sim          | Atualiza o perfil do usuário logado         |
| GET    | /rooms                   | Não          | Lista salas (filtro por jogo e busca)       |
| GET    | /rooms/minhas            | Sim          | Lista salas do usuário (histórico)          |
| POST   | /rooms                   | Sim          | Cria uma sala                               |
| POST   | /rooms/:id/entrar        | Sim          | Entra em uma sala                           |
| POST   | /rooms/:id/sair          | Sim          | Sai de uma sala                             |
| PUT    | /rooms/:id/status        | Sim          | Altera o status (somente o criador)         |
| DELETE | /rooms/:id               | Sim          | Exclui a sala (somente o criador)           |
| GET    | /feedbacks               | Sim          | Lista feedbacks recebidos e enviados        |
| POST   | /feedbacks               | Sim          | Envia um feedback                           |
| GET    | /usuarios                | Não          | Busca jogadores por termo (q)               |
| GET    | /usuarios/:id            | Não          | Retorna o perfil público com avaliações     |

As respostas de erro seguem um padrão comum, com mensagem em português e códigos HTTP apropriados (400, 401, 403, 404 e 500).

---

## 9. DESENVOLVIMENTO DO FRONT-END

O front-end foi desenvolvido em **React** com o **Vite**, utilizando JavaScript e CSS. A navegação entre páginas é controlada por estado no componente principal `App.jsx`, que mapeia 16 jogos para seus componentes de sala e de criação de sala.

### 9.1 Organização das Pastas

```
frontend/src/
├── main.jsx
├── App.jsx
├── api.js
├── index.css
├── assets/
│   ├── games/          (imagens dos jogos)
│   ├── games-icon/     (logos dos jogos)
│   ├── icon/           (ícones da navbar)
│   ├── sidebar/        (ícones da barra lateral)
│   ├── room-modes/     (imagens dos modos de jogo)
│   ├── elos/           (ícones dos elos)
│   ├── funcoes/        (ícones das funções)
│   └── profile/        (imagens de perfil)
├── components/
│   ├── RoomCard.jsx
│   ├── TeamSize.jsx
│   ├── Input.jsx
│   ├── SocialLogin.jsx
│   ├── BuscarJogador.jsx
│   ├── EditProfileModal.jsx
│   └── FeedbackModal.jsx
├── hooks/
│   └── useRooms.js
├── pages/
│   ├── Login.jsx / Home.jsx / Buscar.jsx / PublicProfile.jsx
│   ├── Profile.jsx / History.jsx / Feedbacks.jsx / Settings.jsx
│   ├── (16 páginas de salas, ex.: lolRooms.jsx, valRoom.jsx)
│   └── (16 páginas de criação, ex.: lolCreateRoom.jsx, valCreateRoom.jsx)
└── utils/
    └── filtros.js
```

> **[Inserir captura: Estrutura de pastas do front-end — Figura 5]**

A Figura 5 apresenta a organização dos arquivos do front-end.

### 9.2 Páginas

- **Login**: tela de entrada com login e cadastro.
- **Home**: página inicial com busca e seleção de jogos.
- **Buscar**: resultados da busca de perfis e salas.
- **PublicProfile**: perfil público de um jogador com média de avaliações.
- **Profile**: perfil do usuário logado, com opção de edição.
- **History**: histórico de salas do usuário.
- **Feedbacks**: avaliações recebidas e enviadas.
- **Settings**: configurações da conta, sair e troca de conta.
- **Salas por jogo (16)**: listagem de salas de cada jogo, com filtros e ações de entrar/sair.
- **Criação de sala (16)**: formulário específico de criação de sala para cada jogo.

### 9.3 Componentes

- **RoomCard**: cartão de exibição de uma sala.
- **TeamSize**: seleção do tamanho da equipe.
- **Input**: campo de entrada reutilizável.
- **SocialLogin**: botões de redes sociais (Discord, Google e Twitch).
- **BuscarJogador**: busca de jogadores para avaliação.
- **EditProfileModal**: modal de edição de perfil.
- **FeedbackModal**: modal de envio de avaliação.

### 9.4 Serviços e Hooks

- **api.js**: centraliza as requisições ao back-end, o gerenciamento do token e dos dados do usuário no `localStorage`, além das funcionalidades de contas salvas (troca de conta).
- **useRooms.js**: hook responsável por buscar e recarregar as salas de um jogo.
- **filtros.js**: utilitários de normalização de texto e de aplicação dos filtros de sala.

### 9.5 Capturas das Principais Telas

> **[Inserir captura: Tela de Login — Figura 6]**

A Figura 6 apresenta a tela de login/cadastro.

> **[Inserir captura: Tela Inicial (Home) — Figura 7]**

A Figura 7 apresenta a página inicial com os jogos disponíveis.

> **[Inserir captura: Tela de Salas — Figura 8]**

A Figura 8 apresenta a listagem de salas de um jogo.

> **[Inserir captura: Tela de Criação de Sala — Figura 9]**

A Figura 9 apresenta o formulário de criação de sala.

> **[Inserir captura: Tela de Perfil — Figura 10]**

A Figura 10 apresenta o perfil do usuário.

> **[Inserir captura: Tela de Histórico — Figura 11]**

A Figura 11 apresenta o histórico de salas.

> **[Inserir captura: Tela de Feedbacks — Figura 12]**

A Figura 12 apresenta o histórico de avaliações.

> **[Inserir captura: Tela de Configurações — Figura 13]**

A Figura 13 apresenta as configurações da conta.

---

## 10. FUNCIONALIDADES DO SISTEMA

### 10.1 Cadastro e Login

**Objetivo:** permitir que o jogador crie sua conta e acesse o sistema de forma segura.

**Descrição:** o usuário informa nome, email e senha para se cadastrar. A senha é criptografada com Bcrypt no servidor. Após o cadastro, o usuário realiza o login informando email e senha; o sistema valida as credenciais e retorna um token JWT válido por 7 dias, armazenado no navegador.

> **[Inserir captura: Tela de Cadastro/Login — Figura 14]**

**Resultado esperado:** ao concluir o cadastro, o usuário é informado e direcionado ao login; ao realizar o login, é redirecionado para a página inicial autenticado.

### 10.2 Gerenciamento de Perfil

**Objetivo:** permitir que o usuário personalize seu perfil e informe seus jogos, elos e funções.

**Descrição:** o usuário pode editar nome, apelido, descrição, foto, banner, tags, preferências e a lista de jogos (com elo, função principal e secundária). As imagens são enviadas em base64.

> **[Inserir captura: Edição de perfil — Figura 15]**

**Resultado esperado:** as alterações são salvas no banco e refletidas no perfil público.

### 10.3 Criação de Salas

**Objetivo:** permitir que o jogador crie uma sala para formar uma equipe.

**Descrição:** em cada jogo, o usuário escolhe o modo de jogo, o tamanho da equipe, o elo (quando aplicável), a função desejada, o gênero, além do nome e da descrição da sala. O sistema calcula automaticamente o número máximo de jogadores.

> **[Inserir captura: Tela de criação de sala — Figura 16]**

**Resultado esperado:** a sala é criada com o usuário como criador e primeiro jogador, e passa a aparecer na listagem.

### 10.4 Listagem e Filtros de Salas

**Objetivo:** permitir que o jogador encontre salas adequadas ao seu perfil.

**Descrição:** as salas são listadas por jogo, podendo ser filtradas por gênero, número de jogadores, elo e modo de jogo. Os filtros são aplicados no próprio navegador.

> **[Inserir captura: Tela de salas com filtros — Figura 17]**

**Resultado esperado:** a listagem apresenta apenas as salas que atendem aos filtros selecionados, além dos estados de carregamento, vazio e erro.

### 10.5 Entrar e Sair de Salas

**Objetivo:** permitir que o jogador participe ou deixe uma sala.

**Descrição:** o jogador pode entrar em uma sala com vagas disponíveis; se já estiver na sala, pode sair. O sistema impede a entrada em salas cheias ou se o usuário já estiver nela.

> **[Inserir captura: Cartão de sala com ações entrar/sair — Figura 18]**

**Resultado esperado:** ao entrar, o usuário passa a integrar a lista de jogadores da sala; ao sair, é removido da lista.

### 10.6 Histórico de Salas

**Objetivo:** permitir que o usuário consulte as salas das quais participou ou criou.

**Descrição:** a página de histórico apresenta todas as salas em que o usuário é criador ou jogador, ordenadas pelas mais recentes. O criador pode alterar o status (aberta, concluída, cancelada) e excluir a sala.

> **[Inserir captura: Tela de histórico — Figura 19]**

**Resultado esperado:** o usuário visualiza o histórico completo e gerencia as próprias salas.

### 10.7 Avaliações (Feedbacks)

**Objetivo:** permitir que jogadores avaliem a experiência com outros jogadores.

**Descrição:** o usuário seleciona um jogador, informa o jogo, atribui uma nota de 1 a 5 e, opcionalmente, escreve um comentário. O sistema impede a autoavaliação.

> **[Inserir captura: Modal de avaliação — Figura 20]**

**Resultado esperado:** a avaliação é registrada, calcula a média do jogador avaliado e passa a aparecer no perfil público e na página de feedbacks.

### 10.8 Busca de Jogadores e Salas

**Objetivo:** permitir que o usuário encontre jogadores e salas por texto.

**Descrição:** a busca consulta jogadores por nome, apelido ou email; as salas podem ser encontradas por nome, descrição ou jogo, além da busca por página de jogo.

> **[Inserir captura: Tela de busca — Figura 21]**

**Resultado esperado:** a busca retorna os resultados relevantes e permite navegar ao perfil público ou às salas.

### 10.9 Troca de Conta

**Objetivo:** permitir a alternância rápida entre contas no mesmo dispositivo.

**Descrição:** o sistema armazena localmente as contas que já entraram, permitindo alternar a sessão sem informar novamente as credenciais, além de remover contas salvas.

> **[Inserir captura: Tela de configurações com troca de conta — Figura 22]**

**Resultado esperado:** ao selecionar outra conta, a sessão é trocada e o usuário é direcionado à página inicial.

---

## 11. TESTES REALIZADOS

Os testes foram realizados manualmente durante o desenvolvimento, validando o fluxo completo do sistema com o back-end em execução e o MongoDB conectado.

**Tabela 8** — Resultado dos testes realizados.

| Teste                     | Resultado   |
|---------------------------|-------------|
| Cadastro de usuário       | Aprovado    |
| Login                     | Aprovado    |
| Edição de perfil          | Aprovado    |
| Criação de sala           | Aprovado    |
| Listagem de salas          | Aprovado    |
| Filtros de sala           | Aprovado    |
| Entrar na sala            | Aprovado    |
| Sair da sala              | Aprovado    |
| Alteração de status       | Aprovado    |
| Exclusão de sala          | Aprovado    |
| Histórico de salas        | Aprovado    |
| Envio de feedback         | Aprovado    |
| Média de avaliações       | Aprovado    |
| Busca de jogadores        | Aprovado    |
| Busca de salas            | Aprovado    |
| Troca de conta            | Aprovado    |
| Regra de sala cheia       | Aprovado    |
| Regra de autoavaliação    | Aprovado    |

---

## 12. DIFICULDADES ENCONTRADAS

- **Integração entre API e front-end:** alinhar as chamadas HTTP, o tratamento de respostas e os erros exibidos ao usuário exigiu padronização das mensagens do back-end.
- **Modelagem do banco de dados:** definir os relacionamentos entre usuários, salas e avaliações, além dos critérios de tamanho de equipe e status.
- **Organização dos componentes React:** com 16 jogos, cada um com páginas de salas e de criação, foi necessário criar um mapa central de componentes em `App.jsx`.
- **Tratamento de erros:** cobrir os casos de sala cheia, usuário já presente, autorização do criador e sessão expirada.
- **Manipulação de imagens:** o envio de imagens em base64 exigiu o aumento do limite do JSON no servidor.

---

## 13. MELHORIAS FUTURAS

- Implementar upload real de imagens (armazenamento em nuvem) em vez de base64.
- Implementar login social funcional (Google, Discord e Twitch).
- Adicionar chat em tempo real entre os jogadores de uma sala.
- Enviar notificações em tempo real (WebSocket) quando novas salas forem criadas.
- Criar dashboard com estatísticas de uso para os usuários.
- Gerar relatórios de avaliações e de salas.
- Implementar recuperação e troca de senha.
- Publicar a aplicação em ambiente de produção na nuvem.
- Implementar controle de permissões e moderação.

---

## 14. CONCLUSÃO

O objetivo geral do projeto foi alcançado: foi desenvolvida uma plataforma web capaz de conectar jogadores e formar equipes por interesses em comum, unindo um back-end em Node.js e Express com MongoDB e um front-end em React.

O sistema resolve o problema proposto ao substituir o pareamento aleatório por um processo de busca intencional, com salas organizadas por jogo, filtros de compatibilidade e avaliações entre jogadores.

Durante o desenvolvimento foram adquiridos e consolidados conhecimentos em desenvolvimento web full-stack, incluindo a construção de APIs REST, autenticação com JWT, modelagem de bancos NoSQL, consumo de APIs no front-end e organização de componentes em React.

---

## 15. REFERÊNCIAS

- Documentação oficial do React. Disponível em: https://react.dev/
- Documentação oficial do Vite. Disponível em: https://vite.dev/
- Documentação oficial do Node.js. Disponível em: https://nodejs.org/
- Documentação oficial do Express. Disponível em: https://expressjs.com/
- Documentação oficial do MongoDB. Disponível em: https://www.mongodb.com/docs/
- Documentação oficial do Mongoose. Disponível em: https://mongoosejs.com/
- Documentação oficial do JSON Web Token (JWT). Disponível em: https://jwt.io/
- Documentação oficial do Bcrypt. Disponível em: https://www.npmjs.com/package/bcrypt
- Documentação oficial do JavaScript (MDN Web Docs). Disponível em: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- Material didático do curso de Desenvolvimento de Sistemas, SENAI.

---

## ANEXOS (Opcional)

### Anexo A — Trechos de código importantes

```javascript
// exemplos de trechos relevantes do projeto
// (structure de um controller, middleware de autenticação, etc.)
```

### Anexo B — Estrutura completa das pastas

Verificar as seções 8.1 e 9.1 para a estrutura de pastas do back-end e do front-end.

### Anexo C — Capturas adicionais

Quadro com capturas de tela adicionais do sistema em funcionamento.