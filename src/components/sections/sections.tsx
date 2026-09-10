import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/locales";
import { paths, QUOTA_VERSION_LABEL, type Locale } from "@/lib/site";
import { RailDemo } from "@/components/quota-demo/rail-demo";
import { ProductCapture } from "@/components/quota-demo/product-capture";
import { SettingsGallery } from "@/components/quota-demo/settings-gallery";
import { DownloadButton } from "@/components/site/chrome";

export function Problem({ t }: { t: Dictionary }) {
  return (
    <section className="problem section container">
      <p className="problem-tools">
        {["Codex.", "Claude.", "Cursor.", "Gemini.", "Copilot."].map((name) => (
          <span key={name}>{name}</span>
        ))}
      </p>
      <div className="problem-copy">
        <h2>{t.problem.title}</h2>
        <p className="problem-end">{t.problem.end}</p>
        <a className="text-link" href="#providers">
          {t.problem.note}
        </a>
      </div>
    </section>
  );
}
export function OneGlance({ t }: { t: Dictionary }) {
  return (
    <section className="glance section container" id="features">
      <div className="glance-capture" id="product-demo">
        <p className="capture-label">{t.product.replay}</p>
        <RailDemo t={{ product: t.product }} />
      </div>
      <div className="glance-copy">
        <h2>{t.glance.title}</h2>
        <p className="section-description">{t.glance.description}</p>
        <div className="glance-notes">
          {t.glance.notes.map(([title, text]) => (
            <div key={title}>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Codex({ t }: { t: Dictionary }) {
  return (
    <section className="codex-section container">
      <div className="codex-copy">
        <h2>{t.codex.title}</h2>
        <p className="section-description">{t.codex.description}</p>
        <p className="section-footnote">{t.codex.note}</p>
      </div>
      <figure className="codex-real-capture">
        <a
          href="/product/settings-codex.webp"
          target="_blank"
          rel="noreferrer"
          aria-label={t.product.fullSize}
        >
          <Image
            src="/product/settings-codex.webp"
            width={460}
            height={584}
            alt={t.product.codexSettingsAlt}
            unoptimized
          />
        </a>
        <p className="capture-pan-hint">{t.product.panHint}</p>
        <figcaption>{t.product.codexSettingsCaption}</figcaption>
      </figure>
    </section>
  );
}
export function Settings({ t }: { t: Dictionary }) {
  return (
    <section className="settings-showcase container">
      <div className="settings-copy">
        <h2>{t.product.settingsTitle}</h2>
        <p className="section-description">{t.product.settingsDescription}</p>
      </div>
      <SettingsGallery t={{ product: t.product }} />
    </section>
  );
}
export function LocalFirst({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="local-section section container">
      <div className="local-heading">
        <h2>{t.local.title}</h2>
        <p className="section-description">{t.local.description}</p>
        <Link href={paths[locale].privacy} className="text-link">
          {t.local.link}
        </Link>
      </div>
      <div className="local-principles">
        <p className="local-promise">
          {t.local.promise.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
        <ul className="privacy-points">
          {t.local.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function Flow({ t }: { t: Dictionary }) {
  return (
    <section className="flow-section">
      <div className="container">
        <h2>
          <span>{t.flow.first}</span>
          <br />
          {t.flow.second}
        </h2>
        <p>{t.flow.description}</p>
        <ProductCapture t={t} collapsed />
      </div>
    </section>
  );
}
export function Features({ t }: { t: Dictionary }) {
  return (
    <section className="features-grid container" aria-label={t.nav.features}>
      {t.features.map(([title, description]) => (
        <div key={title}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </section>
  );
}
export function Download({ t }: { t: Dictionary }) {
  return (
    <section id="download" className="download-section container">
      <div className="download-copy">
        <h2>{t.download.title}</h2>
      </div>
      <div className="download-action">
        <DownloadButton>{t.download.button}</DownloadButton>
        <div className="download-meta">
          <span>Windows 10/11</span>
          <span>x64</span>
          <span>{QUOTA_VERSION_LABEL}</span>
          <span>{t.download.free}</span>
        </div>
        <p className="update-notice">{t.download.update}</p>
        <p className="smart-notice">{t.download.note}</p>
      </div>
    </section>
  );
}
