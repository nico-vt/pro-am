import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

// Obtener idioma guardado en localStorage o usar español por defecto
const savedLanguage = localStorage.getItem("lang") || "es";
const defaultLanguage = savedLanguage === "en" || savedLanguage === "es" ? savedLanguage : "es";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: defaultLanguage, // idioma por defecto (desde localStorage si existe)
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
