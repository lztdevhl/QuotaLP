import { en } from "./en";
import { ptBR } from "./pt-br";
import type { Locale } from "@/lib/site";
export const dictionaries = { "pt-br": ptBR, en };
export const getDictionary = (locale: Locale) => dictionaries[locale];
export type { Dictionary } from "./en";
