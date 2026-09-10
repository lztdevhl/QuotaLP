import { QUOTA_VERSION, QUOTA_VERSION_LABEL } from "@/lib/site";

export const en = {
  meta: {
    title: "Quota — AI usage monitor for Windows",
    description:
      "Track usage, limits and resets across the AI tools you use to code directly on Windows.",
  },
  nav: {
    features: "Features",
    providers: "Providers",
    privacy: "Privacy",
    download: "Download",
    language: "Select language",
    skip: "Skip to content",
  },
  hero: {
    badge: `${QUOTA_VERSION_LABEL} is here`,
    eyebrow: "A LITTLE SPACE. A CLEARER PICTURE.",
    lines: ["Your AI limits.", "Always in sight."],
    edge: "Right at the edge.",
    description:
      "Track usage, limits and resets across the AI tools you use to code — directly from the edge of Windows.",
    download: "Download for Windows",
    free: "Free during beta",
    notice:
      "This beta is not yet Windows code-signed, so SmartScreen may show an “Unknown publisher” warning.",
    mobile: "A desktop app for Windows 10/11, x64.",
    aside: "Your flow, uninterrupted.",
    asideSub: "Your limits, one glance away.",
  },
  product: {
    label: "Quota on Windows. Actual capture.",
    try: "Try the interaction",
    replay: "From the Windows app",
    toggle: "Open or pin the recorded Codex expansion",
    open: "Open Codex",
    close: "Close Codex",
    pinned: "Pinned · click the ring again to close",
    hint: "Hover the ring · click to pin · Esc to close",
    replayNote:
      "Recorded interaction, not a live connection. The frames and values come from Quota running on Windows.",
    snapshot: "Captured September 8, 2026. Values reflect that moment.",
    originalLanguage: "Original app interface in Portuguese.",
    fullSize: "View the original capture at full size",
    detailAlt:
      "Real Quota v0.1.0: black rail with Codex and Copilot; Codex expansion with 81% weekly usage, 19% remaining, reset in 6d 7h, token counts, activity and last update.",
    desktopAlt:
      "The actual Quota app at the right edge of a local Visual Studio Code window, with its Codex expansion open.",
    collapsedAlt:
      "Actual Quota rail, collapsed at the right edge of Visual Studio Code. Codex and Copilot are visible.",
    settingsEyebrow: "THE APP, AS IT IS",
    settingsTabs: ["Appearance", "Providers"],
    panHint: "Swipe sideways to see the full window.",
    settingsTitle: "Your rail.\nYour settings.",
    settingsDescription:
      "Appearance and provider connections in the actual Windows app.",
    settingsAlt:
      "Actual Quota Settings window showing language, always on top, rail visibility, auto-hide, position and percentage controls.",
    providersAlt:
      "Actual provider list: Codex and GitHub Copilot connected; Claude and Gemini with limited activity; Cursor not installed and OpenRouter not connected.",
    settingsCaption: "General and appearance · original capture",
    providersCaption: "Providers · crop of the original window",
    settingsNote:
      "These captures show the inspected installation. Other providers are not presented as connected. No account details, keys or passwords are visible.",
    codexSettingsAlt:
      "Actual Codex management dialog in Quota, with usage available and connected status. Technical account details remain closed.",
    codexSettingsCaption: "Codex connection · actual Settings dialog",
  },
  proof: ["Built for developers", "Windows-first", "Local-first"],
  problem: {
    eyebrow: "LESS TAB SWITCHING",
    title: "Different tools.\nDifferent limits.",
    description:
      "Codex. Claude. Cursor. Gemini. Copilot. Your tools work together. Their usage dashboards don't.",
    end: "Quota puts them in one place.",
    note: "Provider availability varies. See support below.",
  },
  glance: {
    eyebrow: "THE SIGNAL YOU NEED",
    title: "Everything\nat a glance.",
    description:
      "Usage, remaining quota and the next reset. Without leaving your flow.",
    notes: [
      ["Usage, in context", "A quiet ring shows where you stand."],
      ["Know what's next", "Remaining quota and the next reset, together."],
      [
        "There when you need it",
        "Compact at rest. More detail on interaction.",
      ],
    ],
  },
  codex: {
    eyebrow: "MADE FOR YOUR EVERYDAY",
    title: "Codex.\nNo complicated setup.",
    description:
      "If Codex is already installed and authenticated on your PC, Quota can detect it and surface your limits directly.",
    note: "Requires a compatible Codex App Server and account. Plan and token metrics appear when provided.",
    detected: "Existing Codex session",
    ready: "Ready to connect",
    command: "Your session stays on your PC.",
  },
  providers: {
    eyebrow: "YOUR TOOLKIT",
    title: "For the tools\nyou actually use.",
    description: "Different providers. Different limits. One place to check.",
    available: "Available",
    beta: "Beta",
    soon: "Coming soon",
    detection: "Detection only",
    note: "Support depends on your account, installed version and the data each provider exposes. A connection doesn't guarantee usage data.",
    details: {
      codex: "Usage, limits and resets. Compatible App Server required.",
      claude:
        "Session cost; 5h / 7-day limits on compatible Pro/Max accounts via status line.",
      cursor:
        "App detection available. Personal quota monitoring is not integrated.",
      gemini:
        "App detection available. Account quota monitoring is not integrated.",
      copilot:
        "Chat, completions and premium allowance through the official CLI.",
      openrouter:
        "Key spending, daily spending and configured limit. API key required.",
      deepseek:
        "Account balance via API key. No usage history from the balance API.",
    },
  },
  local: {
    eyebrow: "ON YOUR MACHINE",
    title: "Local-first.",
    promise: ["No Quota account.", "No web dashboard.", "No interruption."],
    description:
      "Quota runs on your PC and talks to your providers directly whenever possible.",
    items: [
      "Existing local sessions, where supported.",
      "API keys stored in Windows Credential Manager.",
      "Integrations can communicate directly with providers.",
    ],
    link: "Read the beta privacy note",
    diagram: "YOUR WINDOWS PC",
    credential: "Local credentials",
    provider: "Provider APIs",
    connection: "Direct connection when needed",
  },
  flow: {
    eyebrow: "IN YOUR PERIPHERAL. OUT OF YOUR WAY.",
    first: "Don't open another dashboard.",
    second: "Keep coding.",
    description:
      "A small rail at the edge of Windows. More room for what you're building.",
  },
  features: [
    ["Usage at hand", "Check the latest available data while you work."],
    ["Reset countdown", "See when your provider's quota renews."],
    ["One compact rail", "Keep supported AI tools in a single view."],
    ["Local-first", "Built to run directly on your Windows PC."],
  ],
  download: {
    eyebrow: "LESS CHECKING. MORE BUILDING.",
    title: "Your AI limits are\none glance away.",
    button: "Download Quota for Windows",
    free: "Free",
    update: `Automatic updates starting with v${QUOTA_VERSION}.`,
    note: "This beta is not yet Windows code-signed, so SmartScreen may show an “Unknown publisher” warning.",
  },
  footer: "AI usage monitor for developers.",
  signature: "LESS NOISE. MORE SIGNAL.",
  localCaption: "LOCAL-FIRST / NO QUOTA ACCOUNT",
  privacy: {
    title: "Privacy, in plain text.",
    eyebrow: "QUOTA / BETA PRIVACY NOTE",
    intro: "How the current Quota beta handles connections and usage data.",
    back: "Back to Quota",
    sections: [
      [
        "On your computer",
        "Quota is a local-first Windows application. You do not currently need a Quota account. Settings and provider connections are managed on your PC.",
      ],
      [
        "Provider connections",
        "Integrations can use an existing local session or communicate directly with a provider. The provider's own privacy policy and authentication rules apply to those communications.",
      ],
      [
        "Credentials and passwords",
        "Where API keys are required, validated keys are stored locally in Windows Credential Manager. Quota does not ask for your provider passwords. Supported local assistants reuse an existing login or use the provider's official authentication flow.",
      ],
      [
        "Usage data",
        "The available data depends on each provider's APIs and protocols, your plan and compatible software. Some integrations read local exports. Missing or stale data may be shown as unavailable. Not every provider exposes quota or usage history.",
      ],
      [
        "Downloads and this website",
        "GitHub distributes the installer. Visiting GitHub or downloading the file is subject to GitHub's policies. This landing page includes no analytics service, advertising trackers or account forms. Your hosting provider may process standard request logs.",
      ],
      [
        "About this note",
        "This is a simple description of the beta, not a promise that every integration behaves identically. It should be updated as the app changes.",
      ],
    ],
  },
};
export type Dictionary = typeof en;
