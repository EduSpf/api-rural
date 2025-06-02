# ✨ API Rural - Gerenciamento de Produtores Rurais

API desenvolvida em **NestJS** para cadastro e gestão de produtores rurais, propriedades, safras e culturas. Implementa boas práticas de arquitetura e qualidade de código.

## ✅ Regras de Negócio

- Cadastro, edição e exclusão de **produtores rurais**.
- Validação de **CPF/CNPJ** do produtor.
- A soma das áreas **agricultável** e de **vegetação** não pode ultrapassar a **área total** da propriedade.
- Cada produtor pode ter 0 ou mais **propriedades rurais**.
- Cada propriedade pode conter 0 ou mais **safras**.
- Cada safra pode conter 0 ou mais **culturas plantadas**.
- **Dashboard** com:
  - Total de fazendas cadastradas.
  - Total de hectares registrados.
  - Gráficos de pizza:
    - Por estado.
    - Por cultura plantada.
    - Por uso do solo (agricultável vs vegetação).

---

## 🚀 Tecnologias Utilizadas

- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Docker** / **Docker Compose**
- **Swagger** (OpenAPI)
- **Jest** (Testes unitários e integrados)

---

## 📆 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/api-rural.git
cd api-rural
```

### 2. Arquivo `.env`

```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=ruraldb
```

### 3. Subir com Docker Compose

```bash
docker-compose up --build
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🔮 Documentação da API

Acesse o Swagger em:

[http://localhost:3000/api](http://localhost:3000/api)

---

## 🚧 Seeds - Popular Banco

Para rodar os dados fake:

```bash
npx ts-node src/seeds/seed.ts
```

---

## 🕹️ Testes

### Unitários
```bash
npm run test
```

### Integrados (e2e)
```bash
npm run test:e2e
```

---

## 🧑‍💻 Arquitetura e Boas Práticas

- **SOLID**
- **KISS** (Keep It Simple, Stupid)
- **Clean Code**
- **Arquitetura em Camadas**
- **API Contracts (DTOs)**
- **OpenAPI** com Swagger
- **Seed e dados mockados**
- **Testes completos** (unitários e integrados)

---

## 📚 Estrutura do Projeto

- `modules/` - Separado por domínio: producer, property, harvest, crop
- `services/` - Regras de negócio
- `controllers/` - Rotas REST
- `dto/` - Contratos de dados
- `entities/` - Entidades TypeORM
- `seeds/` - Popular banco com dados mock
- `test/` - Testes integrados

---

## 👨‍💼 Autor

Eduardo Santana Santos  
[LinkedIn](https://www.linkedin.com/in/eduardo-santana-santos-731b2a15b/)

---

> Projeto completo com Swagger, dockerizado, seguindo Clean Architecture, SOLID, testado e documentado.
