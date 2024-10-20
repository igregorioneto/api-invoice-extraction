# Api Extrair Informações Fatura

Api para extrair informações de fatura de conta de luz seguindo modelo proposto encontrado no desafio utilizando arquitetura hexagonal (também conhecida como arquitetura de portas e adaptadores) com **Node.js** e **TypeScript**.

## Índice

- [Api Extrair Informações Fatura](#api-extrair-informações-fatura)
  - [Índice](#índice)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Endpoints Disponíveis](#endpoints-disponíveis)
    - [Invoices](#invoices)
    - [Arquitetura](#arquitetura)
    - [Camadas](#camadas)
  - [Documentação Swagger](#documentação-swagger)
  - [Estrutura de Pastas](#estrutura-de-pastas)

## Pré-requisitos

- [Node.js](https://nodejs.org/) v14+  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Banco de dados PostgreSQL

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/igregorioneto/api-invoice-extraction.git
   ```


2. Instale as dependências:
   ```
    npm install
    ```

3. Crie o arquivo .env com as variáveis de ambiente necessárias:
  ```
  DATABASE_URL=postgresql://usuario:senha@localhost:5432/banco_de_dados
  DB_PASS=pass
  ```

4. Execute as migrações do Prisma:
  ```
  npx prisma migrate deploy
  ```


## Uso

### Iniciar o servidor

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado em http://localhost:3000.

## Endpoints Disponíveis

### Invoices

- `GET /invoices`: Busca todas as faturas extraídas
- `GET /invoices/:id`: Busca uma informação extraida
- `POST /invoices`: Extrair informações de faturas.


### Arquitetura
Este projeto segue a Arquitetura Hexagonal, separando as responsabilidades em domínios claros e adaptadores externos:

- Domínio: Contém regras de negócios e serviços.
- Aplicação: Define casos de uso.
- Infraestrutura: Adapta o sistema para interagir com o mundo externo (banco de dados, APIs externas, etc.).

### Camadas
- Domain (Domínio): Regras de negócios e entidades.
- Application (Aplicação): Casos de uso e lógica.
- Infrastructure (Infraestrutura): Implementações de repositórios e controladores.


## Documentação Swagger
A documentação da API está disponível em `/api-docs` após iniciar o servidor.

Exemplo de uso no Swagger:

```yaml
tags:
  - name: Invoice
    description: Endpoints relacionados ao gerenciamento de faturas
paths:
  /backups:
    get:
      summary: Retorna todas as faturas
      responses:
        '200':
          description: Sucesso
```

## Estrutura de Pastas
```bash
src/
 ├── app/
 │    ├── controllers/
 │    └── routes/
 ├── invoice/
 │    ├── domain/
 │    │    ├── entities/
 │    │    ├── interfaces/
 │    │    ├── ports/
 │    │    └── services/
 │    ├── infra/
 │    │    ├── mappers/
 │    │    └── repositories/
 ├── clients/
 │    ├── domain/
 │    │    ├── entities/
 │    │    ├── interfaces/
 │    │    ├── ports/
 │    │    └── services/
 │    ├── infra/
 │    │    ├── mappers/
 │    │    └── repositories/
 ├── swagger.ts
 └── index.ts

```