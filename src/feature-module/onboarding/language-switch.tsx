"use client";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const form = useFormContext?.(); // safe check (por si no está dentro del provider)
  const clearErrors = form?.clearErrors;

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    clearErrors?.(); // limpia los errores actuales del form sin resetear valores
    localStorage.setItem("lang", lng); // guarda preferencia
  };

  // aplicar idioma guardado en localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== i18n.language) i18n.changeLanguage(saved);
  }, [i18n]);

  return (
    <div className="flex gap-2 justify-end mb-3">
      {LANGUAGES.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => handleChangeLanguage(code)}
          className={`px-2 py-1 rounded-md border ${
            i18n.language === code ? "bg-gray-800 text-white" : "bg-gray-100"
          }`}
          type="button"
        >
          <span className="mr-1">{flag}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
