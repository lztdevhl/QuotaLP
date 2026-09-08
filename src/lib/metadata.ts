import type { Metadata } from "next";
import { SITE_URL, IS_INDEXABLE, paths, type Locale } from "./site";
import { getDictionary } from "@/locales";
export function pageMetadata(locale: Locale, privacy = false): Metadata {
  const t = getDictionary(locale);
  const page = privacy ? "privacy" : "home";
  const title = privacy ? `${t.nav.privacy} — Quota` : t.meta.title;
  const description = privacy ? t.privacy.intro : t.meta.description;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: paths[locale][page],
      languages: {
        "pt-BR": paths["pt-br"][page],
        en: paths.en[page],
        "x-default": paths.en[page],
      },
    },
    openGraph: {
      title,
      description,
      url: paths[locale][page],
      siteName: "Quota",
      locale: locale === "pt-br" ? "pt_BR" : "en_US",
      alternateLocale: locale === "en" ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/${locale}/opengraph-image`],
    },
    robots: { index: IS_INDEXABLE, follow: true },
    icons: { icon: "/icon.svg" },
  };
}
