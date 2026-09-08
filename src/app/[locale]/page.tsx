import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/locales";
import { Header, Footer } from "@/components/site/chrome";
import { Hero } from "@/components/hero/hero";
import { Providers } from "@/components/providers/providers";
import {
  Problem,
  OneGlance,
  Codex,
  Settings,
  LocalFirst,
  Flow,
  Features,
  Download,
} from "@/components/sections/sections";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale);
}
export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <>
      <Header locale={locale} t={t} />
      <main id="main">
        <Hero t={t} />
        <Problem t={t} />
        <OneGlance t={t} />
        <Codex t={t} />
        <Providers t={t} />
        <Settings t={t} />
        <LocalFirst t={t} locale={locale} />
        <Flow t={t} />
        <Features t={t} />
        <Download t={t} />
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
