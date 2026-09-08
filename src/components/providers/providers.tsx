import type { Dictionary } from "@/locales";
// Verified against the public README. Beta denotes conditional, account-dependent support.
// Update status and localized capability text together when release support changes.
export const providers = [
  { id: "codex", name: "Codex", status: "available" },
  { id: "claude", name: "Claude Code", status: "beta" },
  { id: "copilot", name: "GitHub Copilot", status: "available" },
  { id: "openrouter", name: "OpenRouter", status: "beta" },
  { id: "deepseek", name: "DeepSeek API", status: "beta" },
  { id: "cursor", name: "Cursor", status: "detection" },
  { id: "gemini", name: "Gemini CLI", status: "detection" },
] as const;
export function Providers({ t }: { t: Dictionary }) {
  return (
    <section className="providers-section section container" id="providers">
      <div className="section-heading">
        <div>
          <h2>{t.providers.title}</h2>
        </div>
        <p>{t.providers.description}</p>
      </div>
      <div className="provider-featured">
        {providers
          .filter((p) => p.status === "available")
          .map((p) => (
            <article className="provider-spotlight" key={p.id}>
              <span className="provider-status available">
                <i />
                {t.providers.available}
              </span>
              <h3>{p.name}</h3>
              <p>{t.providers.details[p.id]}</p>
            </article>
          ))}
      </div>
      <div className="provider-list">
        {providers
          .filter((p) => p.status !== "available")
          .map((p) => (
            <div className="provider-row" key={p.id}>
              <div className="provider-name">
                <h3>{p.name}</h3>
              </div>
              <p>{t.providers.details[p.id]}</p>
              <span className={`provider-status ${p.status}`}>
                <i />
                {t.providers[p.status]}
              </span>
            </div>
          ))}
      </div>
      <p className="section-footnote">{t.providers.note}</p>
    </section>
  );
}
