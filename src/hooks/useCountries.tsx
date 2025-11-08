import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import countries from 'i18n-iso-countries';
import es from 'i18n-iso-countries/langs/es.json';
import en from 'i18n-iso-countries/langs/en.json';

// Registrar idiomas una sola vez
countries.registerLocale(es);
countries.registerLocale(en);

export const useCountries = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const countryOptions = useMemo(() => {
    const countriesData = countries.getNames(currentLanguage, { select: 'official' });
    
    return Object.entries(countriesData)
      .map(([code, name]) => ({
        value: code,
        label: name as string,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [currentLanguage]);

  return { countryOptions };
};
