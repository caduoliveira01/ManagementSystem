# Gestão de projetos

# Sobre o projeto
Desenvolvi esse projeto com o cunho de demostrar um pouco meus conhecimentos e me aprimorar utilizando ferramentas que não utilizei antes, o projeto consiste em um Gerenciador de projetos onde você cria seu usuário e cria projetos podendo criar tasks dentro dele.

# Tecnologias utilizadas
-Spring boot
-Spring secutiry
-Spring starter mail(apenas no backend)
-JWT Authentication
-React + Vite
-Tailwind CSS
-Shadcn
-React Router DOM
-MySQL

# Adicionais
-Desenvolvi 3 tipos de filtro no home, um para tags do projeto, outro pra sua categoria e outro pelo nome

# Endpoints (disponiveis apenas se o usuário tiver autenticado)
| Método | Endpoint | Descrição |
| Post | /auth/signup | Metodo para a criação de um usuário |
| Post | /auth/signin | Metodo para a entrada de um usuário |
| Get | /api/users/profile | Retorna o perfil do usuario com alguns de seus dados |
| Get | /api/projects | Devolve todos os projetos criados pelo usuario |
| Get | /api/projects/{projectId} | Devolve o projeto com base no id |
| Post | /api/projects/ | Cria um projeto se todos os requisitos forem preenchidos |
| Delete | /api/projects/{projectId} | Deleta um projeto com base em seu id |
| Put | /api/projects/{projectId} | Atualiza um projeto com base em seu id |
| Get | /api/issues/projects/{projectId} | Retorna as issues criadas dentro do project pelo projectId |
| Post | /api/issues/ | Cria uma issue |
| Delete | /api/issues/{issueId} | Deleta uma issue com base em seu id |

# Desenvolvido por:
Carlos Oliveira

# Linkedin
https://www.linkedin.com/in/carlos-oliveira-338a04233/
