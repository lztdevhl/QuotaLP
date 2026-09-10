# Quota Landing Page

Next.js App Router + TypeScript + Tailwind CSS 4. Segoe UI do sistema aproxima a tipografia da linguagem do Windows, com Inter hospedada localmente como fallback. Páginas pré-renderizadas; apenas o replay da rail e as abas de capturas de Settings usam estado React no cliente. Sem backend de aplicação, analytics ou serviços de terceiros.

## Rodar

```sh
npm install
npm run dev
```

Acesse http://localhost:3000/pt-br ou http://localhost:3000/en.

```sh
npm run build
npm run lint
npm run start
```

## Rotas e traduções

- `/` redireciona para `/pt-br`.
- `/pt-br` e `/en`: landing page.
- `/pt-br/privacidade` e `/en/privacy`: nota de privacidade da beta.
- `/pt-br/termos` e `/en/terms`: caminhos reservados em `src/lib/site.ts`, não publicados até existir conteúdo aprovado.
- Textos completos em `src/locales/pt-br.ts` e `src/locales/en.ts`, com contrato TypeScript compartilhado. Sem tradução automática. O seletor preserva a página de privacidade.

## Estrutura

- `src/components/site`: navegação, footer, marca e CTA.
- `src/components/hero`: hero com captura do Quota instalado sobre o VS Code local.
- `src/components/quota-demo`: capturas responsivas, replay interativo dos quadros reais do app e galeria de Settings com abas acessíveis.
- `src/components/providers`: catálogo editável e estados de suporte.
- `src/components/sections`: narrativa, Codex, Settings real, local-first, fluxo e download.
- `src/lib/site.ts`: URL única do instalador e rotas. Não há URL de repositório no código público.
- `src/lib/metadata.ts`: canonical, hreflang, OpenGraph e Twitter por idioma/página.
- `src/app/[locale]/opengraph-image.tsx`: imagem social gerada por código, sem imagens externas.

## Conteúdo verificado

Fonte: https://github.com/lztdevhl/Quota e inspeção da instalação real v0.1.0 em 2026-09-08. Codex e Copilot estavam conectados. As imagens e os valores vêm do aplicativo real, sem substituições. Captions identificam a data e deixam claro que a LP não consulta a conta. A interface capturada permanece em português nas duas rotas; os textos da LP são traduzidos. Consulte [a referência visual](docs/product-reference.md) para medidas, cores, versões, comportamento, origem dos assets e limitações.

Capturas públicas em `public/product/`. Brutos de inspeção em `.local-reference/`, ignorados pelo Git e nunca servidos. `scripts/prepare-product-assets.mjs` produz crops e WebP lossless, sem inventar UI. O código do aplicativo desktop não foi alterado.

A nota de privacidade descreve o armazenamento de chaves validadas no Gerenciador de Credenciais do Windows, login oficial, dados locais e comunicação com providers conforme o README. Não afirma que todos os dados nunca saem da máquina.

## Publicação / SEO

Pronto para importação na Vercel: Next.js, Node 24.x, instalação por `npm ci` e build por `npm run build`. Root Directory `./`; branch de produção `main`. Não configure export estático nem Output Directory customizado. Veja [o guia de deploy](docs/deploy-vercel.md).

`NEXT_PUBLIC_SITE_URL` é opcional para fixar um domínio próprio. Sem ela, a Vercel fornece o domínio estável em `VERCEL_PROJECT_PRODUCTION_URL`. Canonical, sitemap e imagens sociais usam essa origem; previews permanecem noindex. Localmente, sem variáveis, a origem continua localhost e noindex. A configuração de hospedagem é feita ao importar o repositório; este preparo não cria projeto/conta Vercel automaticamente.

Instalador fixo: https://github.com/lztdevhl/Quota/releases/download/v0.1.1/Quota_0.1.1_x64-setup.exe

Links normais `<a>`, sem página intermediária e sem JavaScript para baixar. Sem `releases/latest`. O aviso de SmartScreen não orienta a desativar ou ignorar segurança.

## Validação em navegador

`npm run test:e2e` roda Playwright em Chrome e Edge, desktop e viewport mobile, com build de produção. Requer os dois navegadores instalados (`npx playwright install chrome` pode instalar Chrome se necessário). Verifica rotas, idioma, SEO, ausência de overflow, axe WCAG AA, interações da rail, reduced motion e navegação direta do download. O teste intercepta o binário; não executa o instalador. Screenshots ficam em `test-results/`.

Para Chrome for Testing portátil, defina `QUOTA_CHROME_PATH` com o caminho de `chrome.exe` antes de rodar os testes. A matriz inclui Google Chrome for Testing e Microsoft Edge, com viewport desktop e emulação mobile (não aparelhos físicos). Também verifica que as imagens são assets reais e que o mobile usa o crop dedicado. O teste do download não executa o instalador.

## Próximos passos

Configurar o domínio, publicar a LP e refazer as capturas quando a interface da versão pública mudar. Revisar o catálogo a cada release e atualizar o aviso quando o instalador receber assinatura digital. Criar termos apenas quando houver conteúdo real.

## Direção visual preto + violeta

A direção atual, refatorada com a skill `frontend-design`, está documentada em [docs/frontend-design-refactor.md](docs/frontend-design-refactor.md). Preto absoluto `#000000`, títulos brancos, CTA violeta sólido e captura real presa à borda da viewport. A página não possui links para o repositório; GitHub é apenas o host do instalador. A visão completa do VS Code permanece na seção de fluxo. O registro da passada anterior está em `docs/art-direction.md`.

Com o servidor de produção rodando, `node scripts/audit-design.mjs` registra as duas versões da LP em 320, 390, 768, 1024 e 1440 px e rejeita overflow horizontal. Usa `QUOTA_CHROME_PATH` ou Edge. Capturas desta auditoria ficam em `.local-reference/skill-refactor/`, fora dos arquivos públicos.
