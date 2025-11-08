import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const LANGUAGES = [
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "en", label: "EN", flag: "🇺🇸" }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "es");

  // Aplicar idioma guardado en LS 
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
      setCurrentLanguage(saved);
    } else {
      setCurrentLanguage(i18n.language);
    }

    // Escuchar cambios de idioma desde i18n
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setCurrentLanguage(lng);
  };

  return (
    <div className="language-selector">
      {LANGUAGES.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => handleChangeLanguage(code)}
          className={`lang-btn ${currentLanguage === code ? "active" : ""}`}
          type="button"
          aria-label={`Cambiar idioma a ${label}`}
        >
          <span className="lang-flag">{flag}</span>
          <span className="lang-label">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;

