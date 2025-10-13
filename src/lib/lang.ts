import i18n from "@/i18n";

export type Lang = "da" | "en";

export function getLang(): Lang {
  const lng = i18n.resolvedLanguage || "da";
  return lng.toLowerCase().startsWith("en") ? "en" : "da";
}
