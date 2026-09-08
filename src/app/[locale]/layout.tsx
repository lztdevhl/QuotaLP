import "@fontsource-variable/inter";
import "../globals.css";
import { notFound } from "next/navigation";
import { isLocale, locales, SITE_URL } from "@/lib/site";
export const metadata = { metadataBase: new URL(SITE_URL) };
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale === "pt-br" ? "pt-BR" : "en"}>
      <body>{children}</body>
    </html>
  );
}
