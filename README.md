# Gestão de Projetos

## Sobre o Projeto
Desenvolvi esse projeto com o objetivo de demonstrar um pouco dos meus conhecimentos e me aprimorar utilizando ferramentas que ainda não havia usado.  
O projeto consiste em um Gerenciador de Projetos, onde você pode criar seu usuário, gerenciar projetos e adicionar tarefas dentro deles.

## Tecnologias Utilizadas
- **Backend:**
  - Spring Boot
  - Spring Security
  - Spring Starter Mail (apenas no backend)
  - JWT Authentication
  - MySQL

- **Frontend:**
  - React + Vite
  - Tailwind CSS
  - Shadcn
  - React Router DOM

## Funcionalidades Adicionais
- Desenvolvi três tipos de filtro na tela inicial:
  - Filtro por tags do projeto
  - Filtro por categoria do projeto
  - Filtro pelo nome do projeto

## Endpoints (Disponíveis apenas para usuários autenticados)

| Método | Endpoint | Descrição |
|--------|---------|------------|
| **POST** | `/auth/signup` | Criação de um usuário |
| **POST** | `/auth/signin` | Entrada de um usuário |
| **GET** | `/api/users/profile` | Retorna o perfil do usuário com alguns de seus dados |
| **GET** | `/api/projects` | Retorna todos os projetos criados pelo usuário |
| **GET** | `/api/projects/{projectId}` | Retorna um projeto com base no ID |
| **POST** | `/api/projects/` | Cria um projeto se todos os requisitos forem preenchidos |
| **DELETE** | `/api/projects/{projectId}` | Deleta um projeto com base no ID |
| **PUT** | `/api/projects/{projectId}` | Atualiza um projeto com base no ID |
| **GET** | `/api/issues/projects/{projectId}` | Retorna as issues criadas dentro do projeto pelo `projectId` |
| **POST** | `/api/issues/` | Cria uma issue |
| **DELETE** | `/api/issues/{issueId}` | Deleta uma issue com base no ID |

## Desenvolvido por:
Carlos Oliveira

### 📌 Linkedin:
[Carlos Oliveira](https://www.linkedin.com/in/carlos-oliveira-338a04233/)
