export const DOWNLOAD_URL =
  "https://github.com/lztdevhl/Quota/releases/download/v0.1.0/Quota_0.1.0_x64-setup.exe";
const deployment = resolveDeployment(process.env);
export const SITE_URL = deployment.siteUrl;
export const IS_INDEXABLE = deployment.indexable;
export const locales = ["pt-br", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const paths = {
  "pt-br": {
    home: "/pt-br",
    privacy: "/pt-br/privacidade",
    terms: "/pt-br/termos",
  },
  en: { home: "/en", privacy: "/en/privacy", terms: "/en/terms" },
};
import { resolveDeployment } from "./deployment";
