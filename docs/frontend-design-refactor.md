# Quota — refatoração com frontend-design

## Como a skill foi aplicada

O `SKILL.md` de `frontend-design` foi relido integralmente antes das alterações, a partir do diretório de apoio retornado por `npx skills use`. O processo foi: revisar código e screenshots existentes, definir tokens e composição, criticar o plano contra o briefing, implementar e inspecionar screenshots da LP nos dois idiomas.

A crítica inicial identificou a frase inteira em lilás no título, labels em caixa alta, numerações sem sequência, setas em quase todo CTA, quadros elevados repetidos e a captura ainda isolada em um card. A proposta inicial de apenas refinar esse split foi descartada: mantivemos os componentes e assets, mas passamos a usar a borda física da viewport como alinhamento do produto.

```text
Antes:   [headline + CTAs]    [captura em card]

Agora:   Quota                 Recursos Providers PT/EN Baixar

         Seus limites de IA.           captura real ---------│
         Sempre à vista.               Codex e rail          │
         descrição + download                              │
```

O alinhamento principal é à esquerda; apenas a rail vai até o extremo direito. O gesto específico do Quota é seu encaixe na borda, não uma decoração de developer tooling. Preto/violeta e metadata em mono são escolhas explícitas do briefing; não foram trocadas por outra estética sugerida pela skill.

## Tokens e tipografia

| Função | Cor |
| --- | --- |
| Fundo principal, header e seções | `#000000` |
| Texto | `#F5F5F5` |
| Texto secundário | `#A3A3A3` |
| Divisores funcionais | `#262626` |
| CTA / assinatura violeta | `#A78BFA` |
| Seleção de abas / violeta profundo | `#8B5CF6` |

Hover usa `#B99FFF`. CTA sólido, sem gradiente. Títulos sem frase destacada em outra cor. Segoe UI Variable Display/Text e Segoe UI do sistema foram escolhidas por sua relação com o Windows e o app; Inter Variable já existente, auto-hospedada, é fallback. Título desktop 51–80 px, seções aproximadamente 38–58 px, corpo 15–16 px e metadata técnica em Cascadia Code/Consolas. Não se distribuem arquivos proprietários da Segoe UI; a tipografia varia naturalmente nos sistemas em que ela não existe.

## Componentes e apresentação

- Header enxuto; removidos links de repositório e badge redundante.
- Hero preserva `ProductCapture`: recorte CSS da tela real em tamanho natural nos desktops maiores, rail até a borda da viewport. A máscara só suaviza o contexto vazio à esquerda do produto. Mobile usa crop dedicado e CTA antes da captura.
- Problem exibe os nomes das ferramentas como composição textual, sem cinco cards.
- One Glance mantém `RailDemo`, notas curtas e os quadros nativos. Não há percentuais reescritos ou conexões web ao vivo.
- Codex perde a grande superfície de card; o diálogo real fica em preto, com requisitos de compatibilidade ao lado.
- Providers mantém o catálogo verificado: Codex/Copilot disponíveis; Claude Code/OpenRouter/DeepSeek beta; Cursor/Gemini apenas detecção. Status de suporte não implica conexão da instalação do visitante.
- Settings reutiliza capturas originais. Abas ficam verticais no desktop e horizontais no mobile, com orientação ARIA correspondente, setas, Home/End, foco visível e painéis rotulados. Após a crítica visual, Settings (590 px) e o diálogo Codex (460 px) passaram a manter a largura nativa no mobile com pan horizontal e instrução curta, em vez de reduzir toda a janela até tornar os controles ilegíveis. A área de Settings pode ser focada e deslocada por teclado.
- Local-first ganha declaração curta e três promessas, mantendo as ressalvas sobre sessões, credenciais e comunicação com providers.
- Flow exibe VS Code local e rail recolhida. Quatro recursos em colunas abertas, sem cards ou números artificiais.
- Download final e footer simplificados. Privacidade usa a mesma identidade, sem marketing extra.
- As ilhas client recebem somente textos de produto, em vez do dicionário inteiro. Nenhuma dependência de runtime foi adicionada.

## Assets preservados

Os 12 hashes SHA-256 de `public/product/` foram comparados antes/depois e permaneceram iguais. Hero: `desktop-expanded.webp` / `codex-expanded.webp`. Replay: `demo-collapsed.webp`, `codex-expanded.webp`, `codex-pinned.webp`, `open-frames.webp`, `close-frames.webp`. Codex e Settings: `settings-codex.webp`, `settings-general.webp`, `settings-providers.webp`. Flow: `desktop-collapsed.webp` e crop da rail. OpenGraph: `social-codex.png`.

Verdes/laranjas existentes dentro do aplicativo foram preservados, conforme a exigência de não recolorir a UI real. O fundo cinza/azulado dos recortes também pertence à captura, não ao canvas da LP. Sem screenshots gerados, novos providers conectados ou dados pessoais adicionados. A referência continua em português, com data e contexto traduzidos na LP.

## Motion

Uma entrada de 550 ms, limitada ao produto no hero (6 px e opacidade). Hover de CTA com deslocamento de 1 px. Abas com opacidade curta. Na seção Flow, scroll-driven CSS desloca a captura no máximo 12 px e a revela suavemente, somente em desktop com suporte a `animation-timeline: view()`. Sem JavaScript de scroll, parallax pesado ou scroll hijacking. Fallback estático nos demais navegadores. `prefers-reduced-motion` desliga todos esses efeitos e o replay animado.

## Rotas, links e SEO

Preservados `/pt-br`, `/en`, `/pt-br/privacidade`, `/en/privacy` e o seletor manual. Strings por locale, sem tradução runtime. Descrições SEO atualizadas; canonical, hreflang, OpenGraph, Twitter e favicon mantidos.

O único endereço GitHub em `src` é `DOWNLOAD_URL`, exatamente:

`https://github.com/lztdevhl/Quota/releases/download/v0.1.0/Quota_0.1.0_x64-setup.exe`

Não existem links públicos para repo/source no header, hero, footer ou privacidade. A nota de privacidade ainda informa honestamente que GitHub distribui o instalador. O binário não foi executado.

## Validação final

- `npm run build`: aprovado; páginas PT/EN e privacidade pré-renderizadas.
- `npm run lint`: aprovado, sem erros.
- `npm run test:e2e`: 32 testes aprovados em Chrome for Testing e Edge, desktop e mobile emulado. Inclui quatro rotas, SEO, axe WCAG AA, ausência de links para repo, download direto, demo, reduced motion, orientação das abas e pan horizontal de Settings por teclado.
- `node scripts/audit-design.mjs`: dez combinações de locale/largura (320, 390, 768, 1024, 1440 px), sem overflow horizontal da página. Screenshots finais revisadas em `.local-reference/skill-refactor/`.
- Download: HEAD com redirecionamentos respondeu HTTP 200; teste de clique valida o acesso direto sem executar o arquivo.
- Produto: 12 hashes SHA-256 inalterados; nenhuma nova imagem de produto criada.

## Limitações restantes

Capturas refletem a instalação de 08/09/2026, não consumo atual. Interface original em português também na rota inglesa. Mobile é emulado em Chrome e Edge, não validado em aparelhos físicos. Segoe UI depende do sistema; Inter é o fallback. Domínio público não informado: definir `NEXT_PUBLIC_SITE_URL` antes de publicar, pois canonical usa localhost e a indexação fica desabilitada sem essa configuração.
