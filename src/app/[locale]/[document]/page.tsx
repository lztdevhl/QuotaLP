import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, paths } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/locales";
import { Header, Footer } from "@/components/site/chrome";
type Props = { params: Promise<{ locale: string; document: string }> };
// Terms routes are reserved in lib/site.ts. No placeholder legal policy is published.
export function generateStaticParams() {
  return [
    { locale: "pt-br", document: "privacidade" },
    { locale: "en", document: "privacy" },
  ];
}
function valid(locale: string, document: string) {
  return isLocale(locale) && paths[locale].privacy.endsWith(`/${document}`);
}
export async function generateMetadata({ params }: Props) {
  const { locale, document } = await params;
  if (!isLocale(locale) || !valid(locale, document)) notFound();
  return pageMetadata(locale, true);
}
export default async function Privacy({ params }: Props) {
  const { locale, document } = await params;
  if (!isLocale(locale) || !valid(locale, document)) notFound();
  const t = getDictionary(locale);
  return (
    <>
      <Header locale={locale} t={t} privacy />
      <main id="main" className="privacy-page container">
        <Link href={paths[locale].home} className="text-link">
          {t.privacy.back}
        </Link>
        <h1>{t.privacy.title}</h1>
        <p className="privacy-intro">{t.privacy.intro}</p>
        <div className="privacy-document">
          {t.privacy.sections.map(([title, text]) => (
            <section key={title}>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer locale={locale} t={t} privacy />
    </>
  );
}
