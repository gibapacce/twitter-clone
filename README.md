# Twitter Clone

Clone funcional do Twitter/X desenvolvido com [Next.js](https://nextjs.org), [React](https://react.dev) e [Bulma](https://bulma.io/).

> **Atenção:** Este projeto é apenas para fins de estudo e prototipagem. Não há persistência de dados: tudo é mantido em memória enquanto o servidor está rodando.

---

## Funcionalidades

- Cadastro e login de usuários (nome, usuário e senha)
- Feed de tweets (criar, listar, curtir, retweetar, comentar, deletar)
- Página de perfil do usuário
- Página de explorar/buscar tweets e usuários
- Interface responsiva e moderna com Bulma
- Estado global simples com useState/localStorage

---

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Estrutura de Pastas

```
src/
  app/
    api/         # Rotas de API (tweets, users, auth, comments)
    components/   # Componentes React reutilizáveis
    page.js       # Feed principal
    login/        # Página de login
    register/     # Página de cadastro
    profile/      # Página de perfil
    explore/      # Página de busca
```

---

## Tecnologias Utilizadas
- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)
- [React 18+](https://react.dev)
- [Bulma CSS](https://bulma.io/)

---

## Observações
- **Sem banco de dados:** Todos os dados são armazenados em variáveis em memória no backend (API). Ao reiniciar o servidor, tudo é perdido.
- **Ideal para prototipagem, testes e estudos.**

---

## Deploy
Você pode fazer deploy facilmente no [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/).

---

## Prints
Adicione prints da interface aqui para ilustrar o funcionamento do projeto.

---

## Licença
MIT
