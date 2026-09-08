# Deploy na Vercel

## Importação

1. Importe o repositório `lztdevhl/QuotaLP` na Vercel.
2. Escolha a branch de produção `main` e Root Directory `./`.
3. Framework: Next.js. Node.js: 24.x (definido em `package.json`).
4. Instalação: `npm ci`. Build: `npm run build` (definidos em `vercel.json`).
5. Mantenha Output Directory no padrão do framework. Não use `out`, export estático, rewrites de SPA ou `npm run start` como comando de build.
6. Faça o deploy. Depois, adicione o domínio personalizado se houver.

O projeto não exige banco, token, API key, conta Quota ou serviço de analytics. A hospedagem serve a LP e a rota de geração de OpenGraph do Next.js; não há backend de aplicação.

## Domínio e SEO

`NEXT_PUBLIC_SITE_URL` é opcional. Quando preenchida, deve ser uma origem absoluta, como `https://seu-dominio`, sem caminho, query, fragmento ou credenciais.

Sem essa variável, o código usa `VERCEL_PROJECT_PRODUCTION_URL`, fornecida pela Vercel, para canonical, hreflang, sitemap e OpenGraph. Mantenha a exposição de System Environment Variables ativada no projeto. Não copie `localhost` para as variáveis de produção.

Ordem de resolução: origem explícita → domínio estável de produção Vercel → URL temporária do deployment → localhost. Previews e desenvolvimento são sempre noindex, mesmo se a origem explícita estiver configurada. Produção com domínio estável habilita indexação. O fallback de URL temporária permanece noindex para evitar indexar um endereço efêmero.

Mudanças de domínio/variáveis precisam de novo deploy porque as páginas são pré-renderizadas. Se configurar domínio próprio, prefira defini-lo explicitamente em `NEXT_PUBLIC_SITE_URL` para escolher o canonical desejado.

Referências oficiais: [variáveis de ambiente da Vercel](https://vercel.com/docs/environment-variables/system-environment-variables), [Next.js na Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) e [Node.js suportado](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Assets e segurança do envio

`public/product/` contém somente capturas já revisadas do Quota. `next.config.ts` inclui explicitamente o PNG original usado pelo OpenGraph no rastreamento de arquivos das funções. Não remova esse asset do deploy.

`.gitignore` e `.vercelignore` excluem referências privadas, relatórios, dependências, builds, logs e arquivos `.env`. `.env.example` é apenas documentação, sem segredos. Os arquivos ignorados continuam no computador; não foram apagados.

## Checklist após o deploy

- `/` redireciona para `/pt-br`.
- `/pt-br`, `/en`, `/pt-br/privacidade`, `/en/privacy` respondem normalmente.
- PT/EN preserva a página de privacidade.
- `/pt-br/opengraph-image` e `/en/opengraph-image` retornam imagem PNG.
- `/robots.txt` permite indexar produção e bloqueia previews; `/sitemap.xml` usa o domínio correto.
- Canonical/hreflang não apontam para localhost ou deployment efêmero.
- Todos os links de download apontam diretamente a `https://github.com/lztdevhl/Quota/releases/download/v0.1.0/Quota_0.1.0_x64-setup.exe`.

## Verificações locais

```sh
npm ci
npm run test:unit
npm run lint
npm run build
npm run test:e2e
```

Os testes de navegador usam uma build local sem variáveis de domínio, com Chrome e Edge instalados. O teste unitário cobre domínio explícito, produção Vercel, preview, desenvolvimento, fallback temporário e origens inválidas.
