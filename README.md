# Sistema de Agendamento de Reuniões

Este é o README.md para o projeto **Sistema de Agendamento de Reuniões** hospedado no GitHub.

## Descrição do Projeto

O Sistema de Agendamento de Reuniões é uma aplicação que permite o agendamento eficiente de reuniões entre clientes e corretores em salas de reunião específicas. O sistema gerencia usuários, salas de reunião e as próprias reuniões, facilitando a organização e a gestão de compromissos.

### Entidades

1. **Usuários:** 
   - Clientes
   - Corretores

2. **Salas de Reunião**
3. **Reuniões**

### Tecnologias Utilizadas

- Typescript
- Express
- Mongoose
- Node-cron
- Swagger
- Yup

## Banco de Dados

Foi utilizado o MongoDB Atlas para essa aplicação. É necessário possuir uma conta em https://mongodb.com/ e substituir a string de conexão no arquivo .env pela sua string de conexão.

## Variáveis de Ambiente

Observar o arquivo ".envexample" na aplicação e criar o seu próprio arquivo .env seguindo o mesmo modelo de variáveis, preenchendo a sua string de conexão do MongoDB, a porta pela qual será feita a conexão da sua api, e uma chave secreta aleatória para a geração do token.

## Rotas do Insomnia

Exemplos de chamadas das rotas usando o Insomnia no arquivo "Insomnia_routes.json" na raíz da aplicação, e poderão ser importados para o seu Insomnia para uso.

## Comandos

Siga os passos abaixo para instalar, configurar e executar a aplicação localmente.

1. **Instalar:**
   - Entre na pasta `api` e execute o seguinte comando:
     ```bash
     npm install
     ```

2. **Rodar a aplicação localmente:**
   - Execute o seguinte comando para iniciar a aplicação em modo de desenvolvimento:
     ```bash
     npm run start:dev
     ```

3. **Rodar cronjob para resetar o contador do limite de compromissos diários dos corretores:**
   - Execute o seguinte comando para reiniciar o contador todos os dias à meia-noite:
     ```bash
     npm run cron:resetDailyAppointments
     ```

4. **Rodar cronjob para monitorar e atualizar as reuniões conforme são encerradas:**
   - Execute o seguinte comando para verificar e atualizar as reuniões a cada minuto:
     ```bash
     npm run cron:clearExpiredAppointments
     ```

5. **Rodar a função seeder para alimentar o banco com usuários e salas de reunião:**
   - Execute o seguinte comando para popular o banco com dados de exemplo:
     ```bash
     npm run seed
     ```

6. **Rodar os testes:**
   - Execute o seguinte comando para rodar os testes:
     ```bash
     npm run test
     ```

7. **Rodar a cobertura de testes:**
   - Execute o seguinte comando para verificar a cobertura de testes:
     ```bash
     npm run coverage
     ```

8. **Documentação dos endpoints pelo Swagger:**
   - Uma vez com a API rodando localmente, acesse http://localhost:<suaPortaAqui>/api-docs para visualizar a documentação dos endpoints.

## Requisitos

- CRUD de usuários, reuniões e salas de reunião;
- Sistema de autenticação e autorização de rotas com JsonWebToken;
- Duração das reuniões entre no mínimo 30 minutos e no máximo duas horas;
- Somente clientes podem criar agendamentos, corretores não podem;
- Não é possível um cliente agendar uma reunião com um corretor que já está ocupado em outra reunião no mesmo horário;
- Limite máximo de salas de reunião: 8 salas;
- Limite máximo de reuniões que corretores podem participar em um único dia: 5 reuniões.

## Observações

- Somente a rota de login e a de criação de usuários são abertas (ver documentação dos endpoints do Swagger);
- É necessário rodar os dois cronjobs para que a aplicação cumpra seus requisitos;
- As rotas de GET possuem paginação e filtragem (ver documentação dos endpoints do Swagger).
- Coisas que gostaria de fazer mas não tive tempo: criar o seeder das reuniões, regex nas queries de busca, 100% de cobertura de teste, um error handler mais robusto, testes de integração, dockerizar a aplicação.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto.
