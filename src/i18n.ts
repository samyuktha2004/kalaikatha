import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocale } from './utils/localeLoader';

// Minimal i18n initialization. Languages are loaded on demand via `loadLanguage`.
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {},
  interpolation: { escapeValue: false },
});

export async function loadLanguage(lang: string) {
  try {
    const translations = await getLocale(lang);
    i18n.addResourceBundle(lang, 'translation', translations, true, true);
    await i18n.changeLanguage(lang);
  } catch (err) {
    console.error('Failed to load language', lang, err);
    throw err;
  }
}

export default i18n;
