# TCC — LFGP / LFG (Documentação Revisada)

## CAPA

**Serviço Nacional de Aprendizagem Industrial - SENAI**

**Curso:** Desenvolvimento de Sistemas

**Trabalho de Conclusão de Curso**

**Título:** LFGP - Looking For Group Phresh: Desenvolvimento de um sistema web para formação de comunidades e grupos de jogos

**Integrantes:** Pedro Henrique Amaral de Souza

**Professor Orientador:** Samuel Cunha

**Cidade:** CURITIBA - PR

**Ano:** 2026

---

## FOLHA DE ROSTO

**LFG – LOOKING FOR GROUP**

**Plataforma Web para Conexão de Jogadores**

Serviço Nacional de Aprendizagem Industrial – SENAI

Curso de Desenvolvimento de Sistemas

Integrantes: Pedro Henrique Amaral de Souza

Professor Orientador: Samuel Cunha

Cidade: CURITIBA - PR

Ano: 2026

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

Atualmente, os jogos eletrônicos fazem parte do dia a dia de muitas pessoas. Existem vários jogos que possuem modos multiplayer, nos quais os jogadores precisam ou preferem jogar com outras pessoas para formar equipes e participar das partidas. Porém, nem sempre é fácil encontrar alguém que esteja disponível para jogar, que tenha interesses parecidos ou que possua um nível de habilidade próximo.

Pensando nisso, surgiu a ideia de desenvolver o LFG (Looking For Group), uma plataforma web criada para ajudar jogadores a encontrar outras pessoas para jogar e formar equipes.

A ideia do projeto é reunir em um único lugar pessoas que estão procurando jogadores ou grupos para diferentes jogos. O usuário pode escolher um jogo, visualizar as salas disponíveis e utilizar filtros para encontrar uma sala que combine com o que está procurando.

Além de procurar salas, o usuário também pode criar sua própria sala e definir algumas características, como modo de jogo, elo, função, gênero e quantidade de jogadores. Dessa forma, outros jogadores conseguem entender melhor o tipo de grupo que está sendo procurado.

O projeto foi desenvolvido como uma aplicação Full Stack, envolvendo tanto a parte visual do sistema quanto a parte responsável pelo funcionamento e armazenamento das informações. No Front-end foram utilizados React, Vite, JavaScript e CSS. Já no Back-end foram utilizados Node.js, Express e MongoDB.

Durante o desenvolvimento também foram criadas funcionalidades relacionadas ao perfil dos usuários e às avaliações entre jogadores. Com isso, o sistema não serve somente para encontrar uma sala, mas também para conhecer melhor outros jogadores.

O desenvolvimento do LFG permitiu colocar em prática vários conhecimentos aprendidos durante o curso de Desenvolvimento de Sistemas, principalmente relacionados à criação de sistemas web, banco de dados, programação, organização de projetos e integração entre Front-end e Back-end.

---

## 2. OBJETIVOS

### 2.1 Objetivo Geral

Desenvolver uma plataforma web que facilite a procura e a formação de grupos de jogadores, permitindo que os usuários encontrem pessoas para jogar de acordo com seus interesses e características.

### 2.2 Objetivos Específicos

Para alcançar o objetivo principal do projeto, foram definidos os seguintes objetivos:

- Criar um sistema para conectar jogadores que procuram pessoas para jogar.
- Permitir o cadastro e login dos usuários.
- Criar uma página inicial para escolher o jogo desejado.
- Permitir a criação de salas.
- Permitir a visualização de salas disponíveis.
- Criar filtros para facilitar a procura por salas.
- Permitir que os usuários entrem e saiam das salas.
- Permitir que o criador gerencie sua própria sala.
- Criar perfis para os jogadores.
- Permitir que os usuários pesquisem outros jogadores.
- Criar um sistema de avaliações entre jogadores.
- Armazenar as informações do sistema em um banco de dados.
- Desenvolver uma aplicação utilizando Front-end e Back-end.
- Aplicar os conhecimentos aprendidos durante o curso de Desenvolvimento de Sistemas.

Esses objetivos foram definidos com base nas principais funcionalidades planejadas para o sistema.

---

## 3. DESCRIÇÃO DO PROBLEMA

Um dos problemas que serviu como motivação para o desenvolvimento do projeto foi a dificuldade de encontrar outras pessoas para jogar.

Em muitos jogos multiplayer, ter outras pessoas na equipe pode ser importante para conseguir participar de determinados modos de jogo. Porém, nem sempre o jogador possui amigos disponíveis naquele momento.

Também pode acontecer de o jogador procurar pessoas em diferentes lugares, como grupos de mensagens, redes sociais ou comunidades de jogos. Nesses casos, as informações podem ficar espalhadas e ser mais difícil encontrar alguém que realmente esteja procurando uma partida naquele momento.

Outro problema é que cada jogador pode estar procurando uma coisa diferente. Uma pessoa pode querer jogar de forma competitiva, enquanto outra pode estar procurando apenas alguém para jogar casualmente. Também existem jogadores que procuram uma função específica, um determinado elo ou uma quantidade específica de pessoas para completar a equipe.

Por causa disso, surgiu a ideia do LFG. A proposta é reunir essas informações em uma plataforma própria, onde o jogador possa escolher o jogo e procurar salas de acordo com as características que deseja.

O sistema permite utilizar filtros relacionados ao elo, modo de jogo, gênero e quantidade de jogadores. Dessa maneira, o usuário consegue encontrar salas mais próximas do que está procurando.

---

## 4. TECNOLOGIAS UTILIZADAS

Durante o desenvolvimento do LFG foram utilizadas várias tecnologias. Cada uma delas possui uma função dentro do projeto.

### 4.1 Tabela de Tecnologias

**Tabela 1 – Tecnologias utilizadas**

| Tecnologia   | Finalidade                                          |
|--------------|-----------------------------------------------------|
| React        | Desenvolvimento da interface do sistema             |
| Vite         | Ambiente de desenvolvimento do Front-end            |
| JavaScript   | Linguagem utilizada no projeto                      |
| CSS          | Desenvolvimento da parte visual                     |
| Node.js      | Execução do Back-end                                |
| Express      | Criação da API                                      |
| MongoDB      | Armazenamento dos dados                             |
| Mongoose     | Organização e comunicação com o MongoDB             |
| JWT          | Autenticação dos usuários                           |
| Bcrypt       | Proteção das senhas                                 |
| CORS         | Comunicação entre Front-end e Back-end              |
| Dotenv       | Armazenamento de variáveis de ambiente              |
| Nodemon      | Facilitar o desenvolvimento do servidor             |
| Git          | Controle de versão                                  |

Essas tecnologias foram utilizadas para criar as diferentes partes do sistema e permitir a comunicação entre elas.

### 4.2 React

O React foi utilizado para desenvolver o Front-end do LFG. Com ele foram criadas as páginas e componentes utilizados pelo usuário.

Entre as páginas desenvolvidas estão o login, página inicial, salas, criação de salas, perfil, histórico e configurações.

### 4.3 Vite

O Vite foi utilizado como ferramenta para criar e executar o projeto Front-end durante o desenvolvimento.

Ele também facilita a visualização das alterações feitas no código enquanto o sistema está sendo desenvolvido.

### 4.4 JavaScript

O JavaScript foi utilizado para criar a lógica e as interações do sistema.

Por meio dele são realizadas ações como navegação, busca, filtros, criação de salas e comunicação com a API.

### 4.5 CSS

O CSS foi utilizado para desenvolver a parte visual do sistema.

Foram utilizados estilos para definir cores, tamanhos, fontes, imagens, fundos, botões, menus e organização dos elementos das páginas.

### 4.6 Node.js

O Node.js foi utilizado para executar o Back-end do projeto.

Ele permite que o JavaScript seja utilizado no lado do servidor.

### 4.7 Express

O Express foi utilizado para criar a API REST do sistema.

As rotas responsáveis por cadastro, login, salas, usuários e feedbacks foram desenvolvidas utilizando essa tecnologia.

### 4.8 MongoDB

O MongoDB foi utilizado para armazenar os dados do sistema.

Diferente de bancos relacionais tradicionais, o MongoDB trabalha com coleções e documentos.

### 4.9 Mongoose

O Mongoose foi utilizado para facilitar a organização dos dados e a comunicação entre o Back-end e o MongoDB.

### 4.10 JWT

O JSON Web Token foi utilizado para realizar a autenticação dos usuários.

Depois do login, o sistema gera um token que é utilizado para identificar o usuário nas requisições que precisam de autenticação.

### 4.11 Bcrypt

O Bcrypt foi utilizado para proteger as senhas dos usuários.

Em vez de guardar a senha diretamente no banco de dados, o sistema armazena uma versão criptografada dela.

### 4.12 Git

O Git foi utilizado para controlar as versões do projeto.

Durante o desenvolvimento, ele permitiu registrar as alterações realizadas no código e manter um histórico do projeto.

---

## 5. LEVANTAMENTO DE REQUISITOS

O levantamento de requisitos foi realizado para definir o que o sistema deveria fazer e quais características ele deveria possuir.

Os requisitos foram divididos em requisitos funcionais e não funcionais.

### 5.1 Requisitos Funcionais

Os requisitos funcionais representam as funções que o usuário pode realizar dentro do sistema.

**Tabela 2 – Requisitos funcionais**

| Código | Requisito                                          |
|--------|----------------------------------------------------|
| RF01   | Cadastrar um novo usuário.                         |
| RF02   | Realizar login.                                    |
| RF03   | Visualizar o próprio perfil.                       |
| RF04   | Editar o próprio perfil.                           |
| RF05   | Criar uma sala.                                    |
| RF06   | Visualizar salas disponíveis.                      |
| RF07   | Pesquisar salas.                                   |
| RF08   | Filtrar salas.                                     |
| RF09   | Entrar em uma sala.                                |
| RF10   | Sair de uma sala.                                  |
| RF11   | Alterar o status de uma sala criada pelo usuário.  |
| RF12   | Excluir uma sala criada pelo usuário.              |
| RF13   | Visualizar o histórico de salas.                   |
| RF14   | Avaliar outros jogadores.                          |
| RF15   | Visualizar o perfil de outros jogadores.           |
| RF16   | Pesquisar jogadores.                               |
| RF17   | Trocar entre contas salvas.                        |
| RF18   | Encerrar a sessão.                                 |
| RF19   | Editar ou excluir um feedback enviado pelo usuário.|
| RF20   | Excluir a própria conta.                           |

Os requisitos foram definidos de acordo com as funcionalidades descritas no projeto.

### 5.2 Requisitos Não Funcionais

Os requisitos não funcionais estão relacionados às características do sistema.

**Tabela 3 – Requisitos não funcionais**

| Código | Requisito                                                        |
|--------|------------------------------------------------------------------|
| RNF01  | O sistema deve possuir uma interface simples de utilizar.        |
| RNF02  | O sistema deve funcionar em diferentes tamanhos de tela.         |
| RNF03  | O Front-end deve se comunicar com o Back-end através de uma API. |
| RNF04  | O sistema deve utilizar MongoDB para armazenar os dados.         |
| RNF05  | As senhas devem ser protegidas utilizando Bcrypt.                |
| RNF06  | O sistema deve utilizar autenticação através de JWT.             |
| RNF07  | O sistema deve permitir o armazenamento de imagens de perfil e banner. |

Esses requisitos foram definidos pensando principalmente na organização, segurança e facilidade de utilização do sistema.

---

## 6. MODELAGEM DO SISTEMA

A modelagem foi utilizada para representar melhor como o sistema funciona antes de analisar cada parte do código.

Foram considerados principalmente o Diagrama de Casos de Uso e a estrutura do banco de dados.

### 6.1 Diagrama de Casos de Uso

O Diagrama de Casos de Uso mostra as principais ações que o usuário pode realizar no LFG.

Entre elas estão:

- Cadastrar conta;
- Fazer login;
- Editar perfil;
- Criar sala;
- Procurar salas;
- Filtrar salas;
- Entrar em uma sala;
- Sair de uma sala;
- Gerenciar uma sala;
- Avaliar jogadores;
- Visualizar perfis;
- Pesquisar jogadores;
- Excluir a própria conta.

### 6.2 Modelo de Dados

Como o sistema utiliza MongoDB, o banco não possui tabelas e relacionamentos da mesma maneira que um banco relacional.

O projeto possui três coleções principais:

- User
- Room
- Feedback

A coleção User armazena os usuários, a coleção Room armazena as salas e a coleção Feedback armazena as avaliações entre os jogadores.

---

## 7. BANCO DE DADOS

O banco de dados utilizado no projeto é o MongoDB.

As informações foram separadas em três coleções principais: usuários, salas e feedbacks.

### 7.1 Coleção User

A coleção User possui as informações dos jogadores.

**Tabela 4 – Coleção User**

| Campo      | Tipo             | Obrigatório |
|------------|------------------|-------------|
| nome       | String           | Sim         |
| email      | String           | Sim         |
| senha      | String           | Sim         |
| foto       | String           | Não         |
| descrição  | String           | Não         |
| apelido    | String           | Não         |
| banner     | String           | Não         |
| tags       | Array            | Não         |
| preferências | Array          | Não         |
| jogos      | Array de objetos | Não         |

A senha é armazenada utilizando proteção com Bcrypt e o email é utilizado de forma única.

### 7.2 Coleção Room

A coleção Room armazena as salas criadas pelos jogadores.

**Tabela 5 – Coleção Room**

| Campo         | Tipo               | Obrigatório |
|---------------|--------------------|-------------|
| jogo          | String             | Sim         |
| nome          | String             | Sim         |
| descrição     | String             | Não         |
| modo          | String             | Não         |
| time          | String             | Não         |
| elo           | String             | Não         |
| função        | String             | Não         |
| gênero        | String             | Não         |
| maxJogadores  | Number             | Não         |
| status        | String             | Não         |
| criador       | ObjectId           | Sim         |
| jogadores     | Array de ObjectId  | Não         |
| pedidos       | Array de ObjectId  | Não         |

O status da sala pode ser aberta, concluída ou cancelada.

A sala também possui um limite de jogadores de acordo com o tamanho da equipe escolhido. O campo `pedidos` armazena os jogadores que solicitaram entrar na sala e que ainda aguardam a aprovação do criador.

### 7.3 Coleção Feedback

A coleção Feedback armazena as avaliações realizadas pelos usuários.

**Tabela 6 – Coleção Feedback**

| Campo        | Tipo             | Obrigatório |
|--------------|------------------|-------------|
| remetente    | ObjectId         | Sim         |
| destinatário | ObjectId         | Sim         |
| jogo         | String           | Não         |
| nota         | Number           | Sim         |
| comentário   | String           | Não         |

A nota pode variar de 1 a 5 estrelas e o sistema não permite que um usuário avalie a si mesmo.

---

## 8. DESENVOLVIMENTO DO BACK-END

O Back-end foi desenvolvido utilizando Node.js e Express.

Ele é responsável por receber as requisições do Front-end, processar as informações, acessar o banco de dados e devolver os resultados.

### 8.1 Estrutura de Pastas

A estrutura principal utilizada no Back-end é:

```
back end/
└── src/
    ├── server.js
    ├── database/
    │   └── connection.js
    ├── models/
    │   ├── User.js
    │   ├── Room.js
    │   └── Feedback.js
    ├── controllers/
    │   ├── authController.js
    │   ├── usuarioController.js
    │   ├── roomController.js
    │   └── feedbackController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── usuarioRoutes.js
    │   ├── roomRoutes.js
    │   └── feedbackRoutes.js
    └── middleware/
        └── auth.js
```

### 8.2 Controllers

Os controllers são responsáveis por concentrar as principais funções da aplicação.

O authController é responsável pelas funções de cadastro, login, perfil e exclusão de conta.

O usuarioController é responsável pelas funções de busca e visualização de usuários.

O roomController controla as funções relacionadas às salas, incluindo a criação, a listagem, os pedidos de entrada e a aprovação pelo criador.

O feedbackController controla o envio, a edição, a exclusão e as buscas das avaliações.

### 8.3 Models

Os Models representam a estrutura dos dados que serão armazenados no MongoDB.

Foram criados os Models:

- User.js
- Room.js
- Feedback.js

### 8.4 Rotas

As principais rotas desenvolvidas são:

**Tabela 7 – Principais rotas**

| Método | Rota                                 | Função                       |
|--------|--------------------------------------|------------------------------|
| POST   | /auth/cadastro                       | Cadastro                     |
| POST   | /auth/login                          | Login                        |
| GET    | /auth/me                             | Perfil logado                |
| PUT    | /auth/perfil                         | Atualizar perfil             |
| DELETE | /auth/conta                          | Excluir conta                |
| GET    | /rooms                               | Listar salas                 |
| GET    | /rooms/minhas                        | Histórico                    |
| GET    | /rooms/:id                           | Detalhes da sala (lobby)     |
| POST   | /rooms                               | Criar sala                   |
| POST   | /rooms/:id/pedir                     | Pedir para entrar            |
| POST   | /rooms/:id/pedidos/cancelar          | Cancelar pedido              |
| POST   | /rooms/:id/pedidos/:usuarioId/aprovar| Aprovar pedido (criador)     |
| POST   | /rooms/:id/pedidos/:usuarioId/recusar| Recusar pedido (criador)     |
| POST   | /rooms/:id/entrar                    | Entrar                       |
| POST   | /rooms/:id/sair                      | Sair                         |
| PUT    | /rooms/:id/status                    | Alterar status               |
| DELETE | /rooms/:id                           | Excluir                      |
| GET    | /feedbacks                           | Listar feedbacks             |
| POST   | /feedbacks                           | Criar feedback               |
| PUT    | /feedbacks/:id                       | Editar feedback (remetente)  |
| DELETE | /feedbacks/:id                       | Excluir feedback (remetente) |
| GET    | /usuarios                            | Buscar usuários              |
| GET    | /usuarios/:id                        | Perfil público               |

Essas são algumas das principais rotas utilizadas pela API do sistema.

### 8.5 Autenticação

Para proteger algumas funções do sistema foi criado um middleware de autenticação.

O usuário recebe um token JWT depois de realizar o login. Esse token é enviado nas requisições que precisam identificar o usuário.

O formato utilizado é:

```
Authorization: Bearer <token>
```

Quando o token não é válido, o sistema impede o acesso à função solicitada.

---

## 9. DESENVOLVIMENTO DO FRONT-END

O Front-end foi desenvolvido utilizando React, Vite, JavaScript e CSS.

A ideia foi dividir o sistema em páginas e componentes para facilitar a organização do código.

### 9.1 Estrutura do Front-end

A estrutura principal é:

```
frontend/src/
├── main.jsx
├── App.jsx
├── api.js
├── index.css
├── assets/
├── components/
├── hooks/
├── pages/
└── utils/
```

### 9.2 Páginas

Entre as principais páginas estão:

- Login;
- Home;
- Buscar;
- Perfil;
- Perfil público;
- Histórico;
- Feedbacks;
- Configurações;
- Lobby (visão interna de uma sala);
- Salas;
- Criação de salas.

### 9.3 Componentes

Alguns componentes foram separados para poderem ser utilizados em diferentes partes do sistema.

Entre eles estão:

- RoomCard;
- TeamSize;
- Input;
- SocialLogin;
- BuscarJogador;
- EditProfileModal;
- FeedbackModal.

### 9.4 API

O arquivo api.js foi utilizado para centralizar as requisições realizadas pelo Front-end.

Ele também participa do gerenciamento do token e dos dados do usuário.

Além disso, foi criado o hook useRooms.js, utilizado para trabalhar com as salas, e o arquivo filtros.js, utilizado nas funções de busca e filtragem.

---

## 10. FUNCIONALIDADES DO SISTEMA

### 10.1 Cadastro e Login

A primeira parte do sistema é o acesso do usuário.

O usuário pode criar uma conta informando nome, email e senha. Depois disso, pode utilizar suas informações para fazer login.

A senha é protegida utilizando Bcrypt e, após o login, é gerado um token JWT.

### 10.2 Perfil

O usuário possui um perfil onde pode colocar informações sobre si mesmo.

É possível alterar nome, apelido, descrição, foto, banner, tags, preferências e informações relacionadas aos jogos.

### 10.3 Criação de Sala

A criação de salas é uma das principais funções do LFG.

O usuário pode escolher informações como jogo, modo, tamanho do time, elo, função, gênero, nome e descrição.

### 10.4 Busca e Filtros

O sistema possui uma área onde o usuário pode visualizar as salas disponíveis.

Também é possível utilizar filtros para tentar encontrar uma sala que tenha as características desejadas.

Os filtros incluem informações como gênero, quantidade de jogadores, elo e modo.

### 10.5 Entrar e Sair de uma Sala

Quando uma sala possui espaço disponível, o jogador pode entrar nela.

Em algumas situações, o jogador envia um pedido de entrada, que fica pendente até o criador aprovar. O criador pode aprovar ou recusar os pedidos.

Depois de entrar, o jogador passa a fazer parte da lista de participantes.

Também existe a opção de sair da sala.

O sistema verifica o limite máximo de jogadores para evitar que a sala ultrapasse sua capacidade.

### 10.6 Histórico

O sistema possui uma área de histórico para que o usuário consiga visualizar as salas das quais participou ou que criou.

O criador da sala também possui funções adicionais para alterar o status ou excluir sua própria sala.

### 10.7 Feedbacks

Depois de jogar com outra pessoa, o usuário pode realizar uma avaliação.

A avaliação possui uma nota de 1 a 5 estrelas e pode conter um comentário.

O usuário também pode editar ou excluir as avaliações que enviou.

O sistema também impede que o usuário faça uma avaliação de si mesmo.

### 10.8 Busca de Jogadores

O sistema permite procurar outros usuários.

A pesquisa pode ser realizada utilizando nome, apelido ou email.

### 10.9 Troca de Conta

O sistema também possui uma função para trocar entre contas salvas no dispositivo.

Essa função facilita o uso do sistema quando mais de uma conta é utilizada no mesmo computador.

### 10.10 Exclusão de Conta

O usuário pode excluir a própria conta a partir das configurações.

Ao excluir a conta, o sistema remove também as salas criadas pelo usuário, a sua participação em outras salas e as avaliações que envolvem a conta.

---

## 11. TESTES REALIZADOS

Os testes foram realizados durante o desenvolvimento para verificar se as principais funções estavam funcionando como esperado.

Foram realizados testes envolvendo cadastro, login, salas, perfis, avaliações, pesquisas e outras funções.

**Tabela 8 – Testes realizados**

| Teste                        | Resultado   |
|------------------------------|-------------|
| Cadastro de usuário          | Aprovado    |
| Login                        | Aprovado    |
| Edição de perfil             | Aprovado    |
| Criação de sala              | Aprovado    |
| Listagem de salas            | Aprovado    |
| Filtros                      | Aprovado    |
| Entrada em sala              | Aprovado    |
| Saída de sala                | Aprovado    |
| Pedido de entrada e aprovação| Aprovado    |
| Alteração de status          | Aprovado    |
| Exclusão de sala             | Aprovado    |
| Histórico                    | Aprovado    |
| Envio de feedback            | Aprovado    |
| Edição de feedback           | Aprovado    |
| Exclusão de feedback         | Aprovado    |
| Exclusão de conta            | Aprovado    |
| Média de avaliações          | Aprovado    |
| Busca de jogadores           | Aprovado    |
| Busca de salas               | Aprovado    |
| Troca de conta               | Aprovado    |
| Limite de jogadores          | Aprovado    |
| Bloqueio de autoavaliação    | Aprovado    |

Os testes foram realizados de forma manual durante o desenvolvimento, verificando o funcionamento do sistema com o back-end em execução e o banco de dados conectado.

---

## 12. DIFICULDADES ENCONTRADAS

Durante o desenvolvimento do projeto foram encontradas algumas dificuldades.

Uma das principais foi fazer o Front-end e o Back-end funcionarem juntos. Foi necessário organizar as requisições e verificar se as informações estavam sendo enviadas e recebidas corretamente.

Outra dificuldade foi organizar o banco de dados, principalmente por causa das informações relacionadas aos usuários, salas e avaliações.

Também houve dificuldades na organização do projeto React, já que existem várias páginas e componentes diferentes.

A criação do sistema de salas também exigiu alguns cuidados, principalmente para controlar a quantidade de jogadores, a entrada e saída dos usuários e as permissões do criador.

Outra parte que precisou de atenção foi o sistema de autenticação, pois algumas funções só podem ser acessadas quando o usuário está logado.

Também foi necessário configurar o servidor para receber imagens maiores quando utilizadas em determinadas partes do sistema.

---

## 13. MELHORIAS FUTURAS

Mesmo com as funcionalidades desenvolvidas, ainda existem algumas coisas que poderiam ser adicionadas ao projeto no futuro.

Algumas das melhorias pensadas são:

- Implementar upload de imagens utilizando armazenamento em nuvem;
- Fazer funcionar os logins com Google, Discord e Twitch;
- Criar um chat dentro das salas;
- Adicionar notificações em tempo real;
- Criar um dashboard com estatísticas;
- Criar relatórios;
- Adicionar recuperação de senha;
- Publicar o sistema em um servidor na nuvem;
- Criar um sistema de permissões e moderação.

Essas melhorias poderiam deixar o sistema mais completo e aumentar as possibilidades de interação entre os jogadores.

---

## 14. CONCLUSÃO

O desenvolvimento do LFG foi uma forma de colocar em prática os conhecimentos aprendidos durante o curso de Desenvolvimento de Sistemas.

O projeto conseguiu reunir diferentes partes do desenvolvimento de sistemas em uma única aplicação. Foram desenvolvidos o Front-end, o Back-end, a API, o banco de dados e as funcionalidades necessárias para o funcionamento da plataforma.

A ideia principal do projeto era criar uma forma mais organizada de ajudar jogadores a encontrar outras pessoas para jogar. Para isso, foram criadas funções como cadastro, login, criação de salas, busca, filtros, entrada e saída de salas, perfis e avaliações.

Durante o desenvolvimento também foi possível aprender mais sobre tecnologias como React, Node.js, Express e MongoDB, além de aprender na prática sobre a comunicação entre Front-end e Back-end.

Também foram encontradas algumas dificuldades durante o projeto, principalmente relacionadas à integração das diferentes partes do sistema. Porém, esses problemas fizeram parte do processo de aprendizagem e ajudaram a entender melhor como um sistema completo é desenvolvido.

No final, o projeto resultou em uma plataforma que busca facilitar a formação de grupos entre jogadores e que pode continuar sendo melhorada no futuro com novas funcionalidades.

---

## 15. REFERÊNCIAS

- REACT. React Documentation. Disponível em: https://react.dev/
- VITE. Vite Documentation. Disponível em: https://vite.dev/
- NODE.JS. Node.js Documentation. Disponível em: https://nodejs.org/
- EXPRESS. Express Documentation. Disponível em: https://expressjs.com/
- MONGODB. MongoDB Documentation. Disponível em: https://www.mongodb.com/docs/
- MONGOOSE. Mongoose Documentation. Disponível em: https://mongoosejs.com/
- JSON WEB TOKEN. Introduction to JSON Web Tokens. Disponível em: https://jwt.io/
- MDN WEB DOCS. JavaScript. Disponível em: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- SENAI. Material didático do curso de Desenvolvimento de Sistemas.