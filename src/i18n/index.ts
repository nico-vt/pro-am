import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es_form from "./locales/es/translation.json";
import en_form from "./locales/en/translation.json";
import es_home from "./locales/es/home.json";
import en_home from "./locales/en/home.json";

const savedLanguage = localStorage.getItem("lang") || "es";
const defaultLanguage = savedLanguage === "en" || savedLanguage === "es" ? savedLanguage : "es";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en_form,
        home: en_home
      },
      es: {
        translation: es_form,
        home: es_home
      },
    },
    
    defaultNS: "translation",
    
    lng: defaultLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;