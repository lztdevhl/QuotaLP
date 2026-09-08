# Referência do Quota real — 08/09/2026

## Origem e limites da inspeção

Aplicativo aberto pela instalação descoberta dinamicamente em `%LOCALAPPDATA%\Quota\quota.exe`. Não foi usado um executável de desenvolvimento. Executável e registro de desinstalação informam **0.1.0**. A API pública do GitHub informa **v0.1.0**, pre-release publicada em 08/09/2026 às 07:57:08 UTC; era a versão pública mais recente na inspeção.

SHA-256 do executável instalado: `713896DF1AB6AC9560BCF6BFF4461A6A94E90A1DFEDCAD28E331864FE445DC13`.

Também existe um checkout local do aplicativo. Seus arquivos foram lidos para apoiar a medição, sem alteração. O executável release desse checkout tem hash diferente do instalado: portanto o código local **não é tratado como prova de correspondência binária**. As imagens públicas e quadros de movimento vêm exclusivamente do executável instalado.

Não foram alterados código, integrações, preferências, idioma, conexões ou credenciais do Quota. Foram usados hover, clique para fixar/desafixar, abertura/fechamento de Settings, rolagem e abertura do diálogo de gerenciamento do Codex. Não foram acionados conectar, atualizar, desconectar ou controles de preferências.

## Estados observados

- Rail recolhida à direita, com **Codex e GitHub Copilot**.
- Codex em hover; expansão para dentro da tela; fixação por clique e fechamento ao clicar novamente.
- Codex ao vivo: inicialmente 79%, depois **81% de uso semanal** e **19% disponível**, reset em **6d 7h**, plano Plus, total de tokens, tokens do dia, atividade e última atualização. Os números nas capturas finais não foram substituídos.
- Copilot conectado na rail com 0,3%. A captura não constitui promessa de suporte a qualquer plano.
- Settings: Geral, Aparência, lista de providers e diálogo de gerenciamento do Codex. Não há sidebar na janela de Settings inspecionada.
- Na lista: Codex/Copilot conectados; Claude/Gemini com dados limitados e somente atividade; Cursor não instalado; OpenRouter não conectado. Providers ocultos não foram habilitados para a captura.

## Geometria (tela 1920 × 1080, escala 100%, DPI 96)

| Elemento | Medida |
| --- | --- |
| Janela nativa recolhida | 76 × 388 px, x=1844, y=326 |
| Janela nativa expandida | 420 × 388 px, x=1500, y=326 |
| Corpo visível da rail / canvas | 76 × 324 px / 64 px extras verticais |
| Distância à borda direita | 0 px |
| Curvas da rail | abertura de 42 px e curva interna de 30 px |
| Indicador / célula | 64 × 78 px |
| Anel em repouso | 48 px; ícone de 20 px |
| Traço do anel / trilha | 3,3 px / 6,402 px (código local compatível com observação) |
| Distância entre células | 34 px; centros dos anéis separados por 112 px |
| Anel do Codex no crop de 420 × 388 | centro x=382, y=126 |
| Expansão observada | 280 × 290 px; x=22, y=12 no crop |
| Expansão → borda direita | 118 px |
| Expansão → rail | 42 px, incluindo cauda de aproximadamente 30 × 38 px |
| Padding / radius da expansão | 16 px / 24 px |
| Barra de progresso | 6 px, padding de 1 px |
| Settings, área cliente | 590 × 790 px |
| Settings, janela Win32 incluindo moldura | 606 × 829 px |
| Settings, grupos | radius 12 px; padding horizontal 14 px |

A demo usa uma área de captura de 420 × 388, com hotspot sobre o indicador real. Screenshots não têm perspective, rotação, tint ou novas sombras aplicadas ao produto. O desktop pode ser reduzido proporcionalmente; o mobile usa o recorte dedicado, com acesso ao original em tamanho completo.

## Cores e tipografia

- Rail, expansão e cauda: `#000000`.
- Texto principal: `#FFFFFF`; labels `#E5E5E5`; secundário `#808080`; badge de atualização `#9A9A9A`.
- Anel/trilha: `#303030`; trilha de barra `#2D2D2D`.
- Uso: `#00FF88` abaixo de 50%, `#F2FF00` de 50% a menos de 70%, `#FF3F00` a partir de 70%. Nas capturas: Codex laranja e Copilot verde.
- Settings: fundo `#101010`, grupos `#1A1A1A`, borda `#2A2A2A`, toggle ligado `#00BD68`.
- Fonte do app no Windows: **Segoe UI**. Percentual da rail: 17 px; título da expansão: 16 px; linhas: 10–11 px; metadata: 9 px. Settings: título 22 px, labels 12 px, descrições 10 px.
- A LP conserva Inter para seus próprios textos. A interface do produto é rasterizada pelo Windows; nenhuma fonte substituta é usada dentro das capturas.

## Movimento

Os sprites `open-frames.webp` e `close-frames.webp` preservam 45 quadros reais cada, organizados em 9 colunas × 5 linhas. Os timestamps observados estão em `rail-demo.tsx`; os quadros são reproduzidos por `requestAnimationFrame`, não por uma animação inventada do card. O carregamento ocorre perto da seção. Não há vídeo em autoplay, consulta a conta ou loop contínuo. Reduced motion mostra somente os estados estáticos.

Dois frames de captura incompleta do compositor (abertura 0 e fechamento 27) mostravam a janela redimensionada antes de terminar a pintura. Nesses instantes, o replay mantém a captura real do estado recolhido. Não foram interpolados quadros nem redesenhados pixels. Os brutos originais continuam disponíveis localmente para auditoria. Assim, o replay é uma sequência editada de capturas reais, não uma gravação contínua sem cortes.

O código local registra abertura de superfície de 230 ms com `cubic-bezier(.18,.72,.22,1)`, conteúdo com atraso de 45–55 ms e duração de 125–145 ms, fechamento de 190 ms com atraso de 35 ms, hover grace de 180 ms e resize após 235 ms. Esses valores são **referência complementar**, não prova de que a build instalada foi compilada desses arquivos. A reprodução utiliza o movimento efetivamente capturado.

Limites: gravação em aproximadamente 60 quadros/s com intervalos reais variáveis; eventos entre dois frames não podem ser recuperados. Interrupções rápidas durante playback retornam ao estado capturado seguinte, não simulam o motor Tauri. O hotspot cobre somente Codex; a imagem do Copilot não é um controle web. Settings é screenshot, não formulário funcional.

## Assets públicos

| Asset em `public/product/` | Origem / finalidade |
| --- | --- |
| `desktop-expanded.webp` | Screenshot real do VS Code local + Quota; hero, 1568 × 972 |
| `desktop-collapsed.webp` | Mesmo ambiente, rail recolhida; seção de fluxo |
| `rail-collapsed.webp` | Recorte nativo da rail, 76 × 388 |
| `demo-collapsed.webp` | Recorte para interação, 420 × 388 |
| `codex-expanded.webp` | Expansão real + rail, 420 × 388; demo/mobile |
| `codex-pinned.webp` | Clique real, com indicador de fixação |
| `settings-general.webp` | Janela real, 590 × 821 com barra de título |
| `settings-providers.webp` | Lista real recortada, 590 × 620 |
| `settings-codex.webp` | Diálogo real do Codex, 460 × 584 |
| `open-frames.webp`, `close-frames.webp` | Quadros reais, sem compressão com perda |
| `social-codex.png` | Mesmo crop real em PNG para OpenGraph |

`scripts/prepare-product-assets.mjs` aplica apenas crops, codificação lossless e organização dos quadros. Nenhum texto/valor do app foi refeito. `scripts/inspect-quota.ps1` captura o desktop e permite observar janelas. Ambos pertencem somente à LP.

## Privacidade e diferenças da LP anterior

Os brutos ficam em `.local-reference/`, ignorado pelo Git e fora de `public`. As capturas de exploração que contêm terminal, logs, paths ou outras janelas **não são publicadas**. As capturas finais do ambiente excluem explorer, terminal, barra de tarefas e janela de navegador. Os screenshots de Settings deixam os detalhes de conta fechados. Não há e-mail, username do Windows, caminho absoluto, API key, senha ou token de autenticação nos assets públicos; números de consumo de tokens permanecem como parte da UI real.

Na versão inglesa, captions e descrições são traduzidas; a imagem continua no português original da instalação. O idioma do Quota não foi alterado para preparar imagens.

## Validação final

`npm run build` e `npm run lint` passaram. **28 testes** passaram em Google Chrome for Testing e Microsoft Edge, com desktop e emulação mobile: quatro rotas, SEO, axe WCAG AA, download direto, seleção de locale, imagens reais, crop mobile, hover/clique/fixação/fechamento/teclado/reduced motion.

Comparação dos pixels decodificados confirmou igualdade exata entre captura/crop e os sete assets principais: expansão, fixação, desktop, rail, Settings geral, providers e diálogo Codex. Houve comparação lado a lado entre nova leitura do Quota nativo e a LP em tamanho natural. O uso ao vivo já havia subido para 89%, enquanto a referência continua em 81%: diferença temporal esperada, não valor substituído. Geometria, tipografia e cores permaneceram correspondentes. A comparação fica em `.local-reference/product-comparison-only.png`, fora dos assets publicados.

Na reinspeção, a rail estava recolhida automaticamente (janela de 16 × 104 px); foi revelada por hover, sem alterar essa preferência. Não foi necessário reiniciar o processo nem mudar a instalação.

Removidos: `UsagePanel`, `Ring`, `ProviderMark` com símbolos substitutos, `Editor` fictício, rail retangular verde, valores inventados 94%/6%/128.450, terminal de conexão fictício, rail fictícia da seção de fluxo e da imagem OpenGraph, CSS relacionado e a antiga marca em Q desenhada para a LP. A marca atual acompanha o anel usado no app. A seção de providers é textual e distingue suporte de conexão observada.
