import type { Dictionary } from "./en";
import { QUOTA_VERSION, QUOTA_VERSION_LABEL } from "@/lib/site";
export const ptBR: Dictionary = {
  meta: {
    title: "Quota — Monitore o uso das suas IAs no Windows",
    description:
      "Acompanhe uso, limites e resets das ferramentas de IA que você usa para programar direto no Windows.",
  },
  nav: {
    features: "Recursos",
    providers: "Providers",
    privacy: "Privacidade",
    download: "Baixar",
    language: "Selecionar idioma",
    skip: "Pular para o conteúdo",
  },
  hero: {
    badge: `${QUOTA_VERSION_LABEL} disponível`,
    eyebrow: "POUCO ESPAÇO. MUITO MAIS CLAREZA.",
    lines: ["Seus limites de IA.", "Sempre à vista."],
    edge: "Bem na lateral.",
    description:
      "Acompanhe uso, limites e resets das ferramentas de IA que você usa para programar — direto na lateral do Windows.",
    download: "Baixar para Windows",
    free: "Grátis durante a beta",
    notice:
      "Esta beta ainda não possui assinatura digital do Windows, então o SmartScreen pode exibir “Editor desconhecido”.",
    mobile: "Aplicativo desktop para Windows 10/11, x64.",
    aside: "Seu fluxo, sem interrupções.",
    asideSub: "Seus limites, a um olhar de distância.",
  },
  product: {
    label: "Quota no Windows. Captura real.",
    try: "Experimente a interação",
    replay: "Do aplicativo Windows",
    toggle: "Abrir ou fixar a expansão gravada do Codex",
    open: "Abrir Codex",
    close: "Fechar Codex",
    pinned: "Fixado · clique novamente no anel para fechar",
    hint: "Passe o mouse · clique para fixar · Esc para fechar",
    replayNote:
      "Interação gravada, sem conexão ao vivo. Os quadros e valores vêm do Quota em execução no Windows.",
    snapshot: "Capturado em 08/09/2026. Valores daquele momento.",
    originalLanguage: "Interface original do app em português.",
    fullSize: "Ver a captura original em tamanho completo",
    detailAlt:
      "Quota v0.1.0 real: rail preta com Codex e Copilot; expansão do Codex com 81% de uso semanal, 19% disponível, reset em 6d 7h, tokens, atividade e última atualização.",
    desktopAlt:
      "O aplicativo Quota real na borda direita de uma janela local do Visual Studio Code, com a expansão do Codex aberta.",
    collapsedAlt:
      "Rail real do Quota recolhida na lateral direita do Visual Studio Code. Codex e Copilot estão visíveis.",
    settingsEyebrow: "O APLICATIVO, COMO ELE É",
    settingsTabs: ["Aparência", "Providers"],
    panHint: "Deslize para os lados para ver a janela inteira.",
    settingsTitle: "Sua rail.\nSuas configurações.",
    settingsDescription:
      "Aparência e conexões de providers no aplicativo Windows real.",
    settingsAlt:
      "Janela real de Configurações do Quota: idioma, sempre em primeiro plano, visibilidade da rail, ocultação automática, posição e porcentagem.",
    providersAlt:
      "Lista real de providers: Codex e GitHub Copilot conectados; Claude e Gemini com atividade limitada; Cursor não instalado e OpenRouter desconectado.",
    settingsCaption: "Geral e aparência · captura original",
    providersCaption: "Providers · recorte da janela original",
    settingsNote:
      "As capturas mostram a instalação inspecionada. Outros providers não são apresentados como conectados. Dados de conta, chaves e senhas não estão visíveis.",
    codexSettingsAlt:
      "Diálogo real de gerenciamento do Codex no Quota, com uso disponível e status conectado. Os detalhes técnicos da conta permanecem fechados.",
    codexSettingsCaption: "Conexão do Codex · diálogo real de Settings",
  },
  proof: ["Feito para devs", "Windows-first", "Local-first"],
  problem: {
    eyebrow: "MENOS TROCA DE ABAS",
    title: "Tudo separado.",
    description:
      "Codex. Claude. Cursor. Gemini. Copilot. Suas ferramentas trabalham juntas. Os painéis de uso, não.",
    end: "Quota junta seus limites em um só lugar.",
    note: "A disponibilidade varia por provider. Veja abaixo.",
  },
  glance: {
    eyebrow: "O QUE IMPORTA, VISÍVEL",
    title: "Tudo\nem um olhar.",
    description: "Veja uso, restante e reset sem sair do seu fluxo.",
    notes: [
      ["Uso, com contexto", "Um anel discreto mostra onde você está."],
      ["Saiba o que vem depois", "Quota restante e próximo reset, juntos."],
      [
        "Ali quando você precisa",
        "Compacto em repouso. Detalhes ao interagir.",
      ],
    ],
  },
  codex: {
    eyebrow: "FEITO PARA O SEU DIA A DIA",
    title: "Codex.\nSem complicação.",
    description:
      "Se o Codex já estiver instalado e autenticado no seu PC, o Quota pode detectá-lo e mostrar seus limites diretamente.",
    note: "Requer conta e App Server do Codex compatíveis. Plano e métricas de tokens aparecem quando fornecidos.",
    detected: "Sessão existente do Codex",
    ready: "Pronto para conectar",
    command: "Sua sessão continua no seu PC.",
  },
  providers: {
    eyebrow: "SUAS FERRAMENTAS",
    title: "Feito para as ferramentas\nque devs realmente usam.",
    description:
      "Providers diferentes. Limites diferentes. Um lugar para acompanhar.",
    available: "Disponível",
    beta: "Beta",
    soon: "Em breve",
    detection: "Apenas detecção",
    note: "O suporte depende da conta, da versão instalada e dos dados expostos por cada provider. Conectar não garante dados de uso.",
    details: {
      codex: "Uso, limites e resets. Requer App Server compatível.",
      claude:
        "Custo da sessão; limites de 5h / 7 dias em Pro/Max compatível via barra de status.",
      cursor:
        "Detecta o aplicativo. Monitoramento de quota pessoal ainda não integrado.",
      gemini:
        "Detecta o aplicativo. Monitoramento de quota da conta ainda não integrado.",
      copilot: "Chat, sugestões e franquia premium pela CLI oficial.",
      openrouter:
        "Gastos da chave, gastos diários e limite configurado. Requer API key.",
      deepseek:
        "Saldo da conta via API key. A API de saldo não oferece histórico de uso.",
    },
  },
  local: {
    eyebrow: "NA SUA MÁQUINA",
    title: "Local-first.",
    promise: [
      "Sem conta Quota.",
      "Sem dashboard web.",
      "Sem atrapalhar seu fluxo.",
    ],
    description:
      "Quota roda no seu PC e consulta seus providers diretamente quando possível.",
    items: [
      "Sessões locais existentes, quando suportadas.",
      "API keys no Gerenciador de Credenciais do Windows.",
      "Integrações podem se comunicar diretamente com providers.",
    ],
    link: "Leia a nota de privacidade da beta",
    diagram: "SEU PC WINDOWS",
    credential: "Credenciais locais",
    provider: "APIs dos providers",
    connection: "Conexão direta quando necessário",
  },
  flow: {
    eyebrow: "NO SEU CAMPO DE VISÃO. FORA DO SEU CAMINHO.",
    first: "Não abra outro dashboard.",
    second: "Continue programando.",
    description:
      "Uma pequena rail na lateral do Windows. Mais espaço para o que você está construindo.",
  },
  features: [
    ["Uso à vista", "Consulte os últimos dados disponíveis enquanto trabalha."],
    [
      "Contagem para o reset",
      "Veja quando a quota do seu provider será renovada.",
    ],
    [
      "Uma rail compacta",
      "Reúna as ferramentas de IA suportadas em uma visualização.",
    ],
    ["Local-first", "Projetado para rodar direto no seu PC Windows."],
  ],
  download: {
    eyebrow: "MENOS CONFERIR. MAIS CONSTRUIR.",
    title: "Seu próximo limite está\na um olhar de distância.",
    button: "Baixar Quota para Windows",
    free: "Grátis",
    update: `Atualizações automáticas a partir da v${QUOTA_VERSION}.`,
    note: "Esta beta ainda não possui assinatura digital do Windows, então o SmartScreen pode exibir “Editor desconhecido”.",
  },
  footer: "Monitor de uso de IA para desenvolvedores.",
  signature: "MENOS RUÍDO. MAIS CLAREZA.",
  localCaption: "LOCAL-FIRST / SEM CONTA QUOTA",
  privacy: {
    title: "Privacidade, sem rodeios.",
    eyebrow: "QUOTA / PRIVACIDADE NA BETA",
    intro: "Como a beta atual do Quota lida com conexões e dados de uso.",
    back: "Voltar para o Quota",
    sections: [
      [
        "No seu computador",
        "O Quota é um aplicativo Windows local-first. Atualmente, você não precisa de uma conta Quota. Configurações e conexões com providers são gerenciadas no seu PC.",
      ],
      [
        "Conexões com providers",
        "As integrações podem usar uma sessão local existente ou se comunicar diretamente com um provider. A política de privacidade e as regras de autenticação do próprio provider se aplicam a essas comunicações.",
      ],
      [
        "Credenciais e senhas",
        "Quando API keys são necessárias, as chaves validadas são armazenadas localmente no Gerenciador de Credenciais do Windows. O Quota não solicita senhas dos providers. Assistentes locais suportados reutilizam um login existente ou usam o fluxo oficial de autenticação do provider.",
      ],
      [
        "Dados de uso",
        "Os dados disponíveis dependem das APIs e dos protocolos de cada provider, do seu plano e de software compatível. Algumas integrações leem exportações locais. Dados ausentes ou desatualizados podem aparecer como indisponíveis. Nem todo provider expõe quota ou histórico de uso.",
      ],
      [
        "Downloads e este site",
        "O instalador é distribuído pelo GitHub. Acessar o GitHub ou baixar o arquivo está sujeito às políticas do GitHub. Esta landing page não inclui serviço de analytics, rastreadores de publicidade ou formulários de conta. O serviço de hospedagem pode processar registros normais de acesso.",
      ],
      [
        "Sobre esta nota",
        "Este texto descreve a beta de forma simples; não promete que todas as integrações funcionem da mesma maneira. Deve ser atualizado conforme o app mudar.",
      ],
    ],
  },
};
