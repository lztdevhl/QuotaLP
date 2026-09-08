# Quota — na borda

Passada de direção visual de 08/09/2026. Escopo: somente LP. Nenhum arquivo, preferência ou integração do Quota desktop foi modificado.

## Leitura crítica

O hero anterior concentrava título e ações no centro, deixando o produto abaixo da primeira dobra. A mesma sequência de eyebrow numerado, título, descrição e screenshot aparecia repetidamente. O verde acinzentado também dominava bordas, textos auxiliares e CTAs, sem separar marca e conteúdo. Settings exibia duas capturas longas simultaneamente e a seção local-first usava um diagrama genérico.

## Direção implementada

“Na borda”: composição assimétrica, um eixo vertical violeta ao lado do produto, tipografia grande com peso controlado, pretos neutros e intervalos de respiro. O princípio é apresentar uma utilidade desktop como produto, sem adicionar uma interface conceitual.

| Token | Cor | Uso |
| --- | --- | --- |
| Fundo | `#09090c` | Canvas principal |
| Superfície | `#111116` | Cenário elevado e seção Codex |
| Texto | `#f3f0f7` | Off-white |
| Secundário | `#a29dab` | Texto auxiliar |
| Violeta | `#b99af5` | Identidade, foco, detalhes |
| Violeta profundo | `#9771e5` | Luz externa e linhas |
| Lilás | `#d1bff3` | Headline e highlights |
| Borda | `#292630` | Divisores discretos |

CTAs usam uma variação curta entre `#c1a3fa` e `#a580ed`, com texto escuro `#1c112e`. Inter Variable permanece auto-hospedada. Não há nova dependência de runtime.

## Composição

- Hero dividido: título/CTA à esquerda, Quota real na borda direita em tamanho natural nos desktops maiores. A janela original é recortada por CSS, nunca redesenhada. A tela inteira permanece acessível pelo link da captura.
- Mobile usa `codex-expanded.webp`, sem reduzir uma tela inteira. A ordem mantém o download antes do produto e informa que o app é Windows desktop.
- Problema apresentado como um breve intervalo editorial, sem lista decorativa duplicada de providers.
- One Glance mantém o replay original, com controles externos violeta e notas separadas por linhas.
- Codex aparece em um único cenário elevado, com seu diálogo real e requisitos de compatibilidade.
- Providers: Codex e Copilot têm destaque tipográfico. Beta e apenas detecção permanecem explicitamente classificados, sem providers falsamente conectados.
- Settings: abas do site alternam capturas originais de Aparência e Providers. Setas, Home e End navegam pelas abas; foco e seleção seguem o padrão ARIA. O painel reserva espaço para não deslocar as seções seguintes.
- Local-first troca o diagrama por três princípios legíveis e acesso à nota de privacidade.
- Fluxo usa a tela real do VS Code com rail recolhida. Recursos viram linhas editoriais; o fechamento retoma a composição assimétrica do hero.
- Footer, privacidade e OpenGraph usam os mesmos tokens de identidade.

## Fidelidade

Todos os arquivos de `public/product/` foram preservados. Nenhuma cor, número, fonte ou controle dentro do Quota foi recolorido. Laranja/verde que ainda aparecem nas capturas são cores reais do aplicativo. As legendas continuam informando data da captura e interface original em português. O replay mantém timestamps, hotspots e quadros nativos, incluindo reduced motion; o redesign não substitui sua animação por easing inventado.

Os efeitos de entrada da LP são limitados a 8 px e opacidade; as abas usam uma breve transição de opacidade. Ambos são desativados por `prefers-reduced-motion`. Nenhum vídeo, imagem gerada, analytics, fonte externa ou novo backend foi adicionado.

## Validação e continuidade

Scripts: `npm run build`, `npm run lint`, `npm run test:e2e` e `node scripts/audit-design.mjs` (servidor de produção necessário para o último). A matriz de testes cobre Chrome e Edge desktop e mobile emulado, quatro rotas, SEO, contraste automatizado, download direto, fidelidade dos assets, demo e abas de Settings. Auditoria visual em ambos os idiomas e cinco larguras, de 320 a 1440 px.

Próximos refinamentos: atualizar capturas somente quando a versão pública mudar; produzir uma captura nativa em inglês se disponível; configurar o domínio real em `NEXT_PUBLIC_SITE_URL` antes da publicação. Não há alegação de validação em aparelhos físicos ou de tradução da interface capturada.

Resultado desta passada: build e lint aprovados; 32 testes aprovados nos quatro projetos de navegador, sem violações nos testes axe WCAG AA. As dez combinações de idioma/largura passaram sem overflow. O link fixo do instalador respondeu HTTP 200 via HEAD seguindo redirecionamentos; o teste de clique intercepta o binário, sem executar ou instalar nada. Capturas da revisão visual estão em `.local-reference/design/`.
