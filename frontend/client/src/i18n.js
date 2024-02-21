// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/language/en.json';
import viTranslation from './locales/language/vi.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    vi: {
      translation: viTranslation,
    },
  },
  fallbackLng: 'vi',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;