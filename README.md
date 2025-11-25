# EcommerceProjectUFSC 🛒

![.NET][badge-dotnet] ![React][badge-react] ![Vite][badge-vite] ![Bootstrap][badge-bootstrap] ![Azure][badge-azure] ![Vercel][badge-vercel]

Aplicação Web de comércio eletrônico desenvolvida como parte da disciplina **INE5646 – Programação para Web** da Universidade Federal de Santa Catarina (UFSC).

🔗 **Acesse a aplicação online:** [ecommerce-project-ufsc.vercel.app](https://ecommerce-project-ufsc.vercel.app/)

---

## 📖 Sobre o Projeto

O **EcommerceProjectUFSC** é um sistema completo de e-commerce projetado para aplicar conceitos modernos de desenvolvimento web. O objetivo acadêmico foi cobrir o desenvolvimento full-stack, arquitetura limpa e hospedagem em nuvem.

### Funcionalidades Principais
* ✅ **Gestão de Usuários:** Cadastro e edição.
* ✅ **Gestão de Produtos:** Cadastro, listagem, edição e exclusão.
* ✅ **Catálogo:** Visualização amigável dos produtos.
* ✅ **Disponibilidade:** Experiência funcional 24/7 para avaliação.

---

## 🏗️ Arquitetura

O projeto foi estruturado seguindo os princípios de **Domain-Driven Design (DDD)** no backend, o que garante modularidade, testabilidade e facilidade de manutenção.

A solução está organizada nas seguintes camadas:
1.  **Domain:** Regras de negócio e entidades.
2.  **Application:** Casos de uso e serviços.
3.  **Infrastructure:** Acesso a dados e serviços externos.
4.  **API:** Pontos de entrada da aplicação.

---

## 🚀 Tecnologias Utilizadas

### Backend (Hospedado na Azure)
* **Linguagem:** C#
* **Framework:** .NET 9 / ASP.NET Core
* **Arquitetura:** DDD (Domain-Driven Design)

### Frontend (Hospedado na Vercel)
* **Framework:** React
* **Build Tool:** Vite
* **Linguagem:** JavaScript
* **Estilização:** Bootstrap

---

## 👥 Membros do Grupo

| Nome | Matrícula |
| :--- | :--- |
| **Lucas Orion** | 24103657 |
| **Barbara Mina** | 24202522 |

---

## 💻 Como Rodar o Projeto Localmente

### Pré-Requisitos
Certifique-se de ter instalado em sua máquina:
* [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
* [Node.js + NPM](https://nodejs.org/)
* IDE de preferência (Visual Studio, VS Code ou Rider)

### 📌 Passo a Passo – Backend

1.  Navegue até a pasta do backend:
    ```bash
    cd ./BE
    ```

2.  **Configure o `appsettings.json`:**
    Abra o arquivo `appsettings.json` (ou `appsettings.Development.json`) e edite a **Connection String** para apontar para o seu banco de dados local ou instância desejada.

3.  Restaure as dependências:
    ```bash
    dotnet restore
    ```

4.  Execute a API:
    ```bash
    dotnet run
    ```
    > O terminal exibirá o endereço local onde a API está rodando.

### 🎨 Passo a Passo – Frontend

1.  Em um novo terminal, vá para a pasta do frontend:
    ```bash
    cd ./FE
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Execute o projeto:
    ```bash
    npm run dev
    ```
    > O frontend estará acessível em: `http://localhost:5173` (ou porta similar indicada no terminal).

---

## 🌐 Deploy

O projeto está online e disponível para avaliação:

* 🚀 **Frontend (Aplicação):** [https://ecommerce-project-ufsc.vercel.app/](https://ecommerce-project-ufsc.vercel.app/)
* ☁️ **Backend:** Hospedado na **Microsoft Azure** (App Service).

---

[badge-dotnet]: https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=fff&style=for-the-badge
[badge-react]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge
[badge-vite]: https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge
[badge-azure]: https://img.shields.io/badge/Azure-0078D4?logo=microsoftazure&logoColor=fff&style=for-the-badge
[badge-vercel]: https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge
[badge-bootstrap]: https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff&style=for-the-badge
