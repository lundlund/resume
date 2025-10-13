import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importér default resources (kan tree-shakes)
import daCommon from "@/locales/da/common.json";
import enCommon from "@/locales/en/common.json";

export const resources = {
  da: { common: daCommon },
  en: { common: enCommon },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "da",
    supportedLngs: ["da", "en"],
    defaultNS: "common",
    ns: ["common"],

    detection: {
      // rækkefølge: localStorage -> navigator -> html lang
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: { escapeValue: false },
  });

// Hold <html lang="..."> synkroniseret
const html = document.documentElement;
html.setAttribute("lang", i18n.resolvedLanguage || "da");
i18n.on("languageChanged", (lng) => html.setAttribute("lang", lng));

export default i18n;
