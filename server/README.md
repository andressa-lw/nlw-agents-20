# NLW Agents

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

## Descrição

O NLW Agents é um servidor Node.js que utiliza TypeScript, Drizzle ORM e Docker para gerenciamento de ambientes e banco de dados. O projeto segue boas práticas de organização de código e utiliza padrões como separação de responsabilidades por módulos (rotas, banco, schemas).

## Principais Tecnologias e Bibliotecas

- **Node.js**
- **TypeScript**
- **Drizzle ORM** (mapeamento objeto-relacional)
- **Docker** (containerização e banco de dados)
- **HTTP Client** (testes de rotas via `client.http`)

## Estrutura de Pastas

- `src/` - Código-fonte principal
  - `db/` - Conexão, seeds e migrações do banco
  - `schema/` - Definição dos schemas do banco
  - `http/routes/` - Rotas HTTP

## Setup e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd nlw-agents-20/server
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Edite o arquivo `.env` conforme necessário (veja `src/env.ts`).
4. **Suba o banco de dados com Docker:**
   ```bash
   docker-compose up -d
   ```
5. **Execute as migrações e seeds:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
6. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

## Observações
- O projeto utiliza Drizzle para manipulação do banco de dados e migrations.
- O padrão de organização segue separação clara entre rotas, banco e schemas.
- Para testar rotas, utilize o arquivo `client.http`.

---
Desenvolvido durante o NLW da Rocketseat.
