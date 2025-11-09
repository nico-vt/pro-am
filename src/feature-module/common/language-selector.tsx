import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Globe, ChevronDown, Check } from "react-feather";

const LANGUAGES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "es");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    const langToUse = saved || i18n.language || "es";
    if (langToUse !== i18n.language) {
      i18n.changeLanguage(langToUse);
    }
    setCurrentLanguage(langToUse);
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const handleChangeLanguage = (lng: string | null) => {
    if (lng) {
      i18n.changeLanguage(lng);
      localStorage.setItem("lang", lng);
      setCurrentLanguage(lng);
    }
  };

  const currentLangData = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <Dropdown onSelect={handleChangeLanguage} className="language-selector">
      <Dropdown.Toggle
        variant="link"
        id="language-dropdown"
        className="lang-dropdown-btn no-arrow d-flex align-items-center"
      >
        <Globe size={18} />
        <span className="lang-label lang-label-desktop">{currentLangData.label}</span>
        <ChevronDown size={18} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {LANGUAGES.map(({ code, label }) => (
          <Dropdown.Item
            key={code}
            eventKey={code}
            active={currentLanguage === code}
            className="d-flex align-items-center"
          >
            <span className="check-icon-wrapper">
              {currentLanguage === code && <Check size={18} />}
            </span>
            <span className="lang-label">{label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;