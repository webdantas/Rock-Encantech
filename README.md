# Catálogo de E-commerce com Autenticação

Projeto Full-Stack de e-commerce construído com Laravel/MySQL no Backend e React/Vite no Frontend, orquestrado e containerizado 100% com Docker.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de que sua máquina possui:
- Docker e Docker Compose instalados.

### Passos de Inicialização

1. **Suba os Serviços no Docker:**
Na raiz do projeto (neste mesmo diretório), execute o seguinte comando:
```bash
docker compose up -d
```
Ele subirá três containers:
- `laravel_app` (Backend API e PHP FPM)
- `nginx_server` (Servidor Web do Backend, acessível na porta 8000)
- `mysql_db` (Banco de Dados, acessível na porta 3306)
- `react_frontend` (Frontend DevServer, acessível na porta 5173)

2. **Configure o Banco de Dados Fictício (Migrations & Seeders):**
Após os containers rodarem, prepare o banco de dados rodando os comandos no backend:
```bash
docker compose exec app php artisan migrate:fresh --seed
```
Isso resetará o banco e criará imediatamente categorias padrões e os primeiros produtos para teste (+ User default).

3. **Acesso aos Sistemas:**
- **Frontend (Acessar a Aplicação Web):** Abra seu navegador e entre em `http://localhost:5173`. Você verá o seu Catálogo!
- **Backend (API):** Responde em `http://localhost:8000/api/...`. Exemplo: acessar a lista bruta em `http://localhost:8000/api/products`.

---

## Estrutura do Sistema

- **Padrão Utilizado (Backend):** Service & Repository Pattern. Todas as chamadas de API são direcionadas aos Controllers `(ProductController, AuthController, etc)`, que invocam a camada de negócio `*Service`, que por fim, solicita os dados na camada do banco `*Repository`.
- **Coleções (Backend):** Utilizando `ProductCollection` para envelopar perfeitamente a paginação e separar meta-atributos.
- **Segurança e Cadastro de Produtos via API:** Conforme os requisitos, todas as rotas sensíveis (criar, atualizar, excluir produtos) operam plenamente no Backend e estão rigorosamente protegidas via middleware `auth:sanctum`. Operações como o **Cadastro de Novos Produtos**, **Edição** e **Exclusão** podem ser testadas consumindo os endpoints `POST /api/products`, `PUT` e `DELETE` fornecendo o cabeçalho *Authorization: Bearer Token* via Insomnia, Postman ou aplicações de terceiros.
- **Identidade:** A funcionalidade de Login gera e devolve um Bearer token via endpoint que deve autenticar requisições seguras.

## Features do Frontend Adicionadas
- **Navegação Inteligente**: Configuração nativa de Frontend com `react-router-dom`.
- **Autenticação Direta**: Tela de `/login` e `/cadastro` gravando JWT Token no `localStorage` após registro.
- **Detalhamento**: Uma vez no grid principal de produtos, você clica e é redirecionado para ler apenas o detalhamento do item (Rota `/produto/:id`).
