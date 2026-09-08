import type { Dictionary } from "@/locales";
import { DownloadButton } from "@/components/site/chrome";
import { ProductCapture } from "@/components/quota-demo/product-capture";
export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="hero">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1>
            {t.hero.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-ctas">
            <DownloadButton>{t.hero.download}</DownloadButton>
            <a className="text-link" href="#product-demo">
              {t.product.try}
            </a>
          </div>
          <div className="hero-meta">
            <span>Windows 10/11</span>
            <span>x64</span>
            <span>v0.1.0 Beta</span>
            <span>{t.download.free}</span>
          </div>
          <p className="smart-notice">{t.hero.notice}</p>
          <p className="mobile-notice">{t.hero.mobile}</p>
        </div>
        <div className="real-hero-stage">
          <ProductCapture t={t} priority edge />
          <div className="capture-heading">
            <span>{t.product.label}</span>
            <span>{t.hero.edge}</span>
          </div>
        </div>
      </div>
      <div className="proof-strip container">
        {t.proof.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
    </section>
  );
}
