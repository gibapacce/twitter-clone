# 🐦 Twitter Clone

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev/)
[![Bulma](https://img.shields.io/badge/Bulma-0.9.4-00D1B2?logo=bulma)](https://bulma.io/)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Clone funcional do Twitter/X feito com Next.js, React e Bulma.**  
> **Atenção:** Este projeto é para estudo/prototipagem. Não há persistência de dados.

---

## 📑 Sumário
- [Funcionalidades](#funcionalidades)
- [Como rodar](#como-rodar-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Observações](#observações)
- [Deploy](#deploy)
- [Prints](#prints)
- [Licença](#licença)
- [Autor](#autor)

---

## ✨ Funcionalidades

- 👤 Cadastro e login de usuários (nome, usuário e senha)
- 📝 Feed de tweets (criar, listar, curtir, retweetar, comentar, deletar)
- 🙍‍♂️ Página de perfil do usuário
- 🔍 Página de explorar/buscar tweets e usuários
- 📱 Interface responsiva e moderna com Bulma
- ⚡ Estado global simples com useState/localStorage

---

## 🚀 Como rodar o projeto

```bash
npm install
npm run dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura de Pastas

```
src/
  app/
    api/         # Rotas de API (tweets, users, auth, comments)
    components/  # Componentes React reutilizáveis
    page.js      # Feed principal
    login/       # Página de login
    register/    # Página de cadastro
    profile/     # Página de perfil
    explore/     # Página de busca
```

---

## 🛠 Tecnologias Utilizadas
- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)
- [React 18+](https://react.dev)
- [Bulma CSS](https://bulma.io/)

---

## ⚠️ Observações
- **Sem banco de dados:** Todos os dados são armazenados em variáveis em memória no backend (API). Ao reiniciar o servidor, tudo é perdido.
- **Ideal para prototipagem, testes e estudos.**

---

## ☁️ Deploy
Você pode fazer deploy facilmente no [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/).

---

## 📄 Licença
MIT

---

## 👨‍💻 Autor

Feito com 💙 por [Gilberto Pacce](https://www.linkedin.com/in/gilberto-pacce/)  
[![GitHub](https://img.shields.io/badge/GitHub-gibapacce-181717?logo=github)](https://github.com/gibapacce)
