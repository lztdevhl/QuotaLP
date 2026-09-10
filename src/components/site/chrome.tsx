import Link from "next/link";
import { QUOTA_DOWNLOAD_URL, paths, type Locale } from "@/lib/site";
import type { Dictionary } from "@/locales";
import { QuotaMark, WindowsIcon } from "./icons";
export function DownloadButton({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <a
      href={QUOTA_DOWNLOAD_URL}
      className={`download-button ${compact ? "compact" : ""}`}
    >
      <WindowsIcon />
      <span>{children}</span>
    </a>
  );
}
function Languages({
  locale,
  privacy = false,
  label,
}: {
  locale: Locale;
  privacy?: boolean;
  label: string;
}) {
  return (
    <nav className="languages" aria-label={label}>
      {(["pt-br", "en"] as const).map((l) => (
        <Link
          key={l}
          href={paths[l][privacy ? "privacy" : "home"]}
          lang={l === "pt-br" ? "pt-BR" : "en"}
          hrefLang={l === "pt-br" ? "pt-BR" : "en"}
          aria-current={locale === l ? "page" : undefined}
        >
          {l === "pt-br" ? "PT" : "EN"}
        </Link>
      ))}
    </nav>
  );
}
export function Header({
  locale,
  t,
  privacy = false,
}: {
  locale: Locale;
  t: Dictionary;
  privacy?: boolean;
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        {t.nav.skip}
      </a>
      <header className="header">
        <div className="header-inner">
          <Link href={paths[locale].home} className="brand" aria-label="Quota">
            <QuotaMark />
            Quota
          </Link>
          <nav
            className="main-nav"
            aria-label={
              locale === "en" ? "Main navigation" : "Navegação principal"
            }
          >
            <Link href={`${paths[locale].home}#features`}>
              {t.nav.features}
            </Link>
            <Link href={`${paths[locale].home}#providers`}>
              {t.nav.providers}
            </Link>
            <Link href={paths[locale].privacy}>{t.nav.privacy}</Link>
          </nav>
          <div className="header-actions">
            <Languages
              locale={locale}
              privacy={privacy}
              label={t.nav.language}
            />
            <DownloadButton compact>{t.nav.download}</DownloadButton>
          </div>
        </div>
      </header>
    </>
  );
}
export function Footer({
  locale,
  t,
  privacy = false,
}: {
  locale: Locale;
  t: Dictionary;
  privacy?: boolean;
}) {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <Link className="brand" href={paths[locale].home}>
            <QuotaMark />
            Quota
          </Link>
          <p>{t.footer}</p>
        </div>
        <nav aria-label="Footer">
          <Link href={`${paths[locale].home}#features`}>{t.nav.features}</Link>
          <Link href={`${paths[locale].home}#providers`}>
            {t.nav.providers}
          </Link>
          <Link href={paths[locale].privacy}>{t.nav.privacy}</Link>
          <a href={QUOTA_DOWNLOAD_URL} className="footer-download">
            {t.hero.download}
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Quota</span>
        <Languages locale={locale} privacy={privacy} label={t.nav.language} />
      </div>
    </footer>
  );
}
