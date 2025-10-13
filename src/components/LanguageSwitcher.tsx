import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const setLng = (lng: "da" | "en") => () => i18n.changeLanguage(lng);

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <button
        onClick={setLng("da")}
        aria-pressed={i18n.resolvedLanguage === "da"}
        className={`px-2 py-1 rounded ${
          i18n.resolvedLanguage === "da" ? "bg-neutral-200" : "hover:bg-neutral-100"
        }`}
      >
        Dansk
      </button>
      <span aria-hidden>·</span>
      <button
        onClick={setLng("en")}
        aria-pressed={i18n.resolvedLanguage === "en"}
        className={`px-2 py-1 rounded ${
          i18n.resolvedLanguage === "en" ? "bg-neutral-200" : "hover:bg-neutral-100"
        }`}
      >
        English
      </button>
    </div>
  );
}
