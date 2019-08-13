import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from '../config';
import { backend } from './backend';
import { fakeLang, transformFake } from './fake';

export const I18N_DEFAULT_NAMESPACE = 'common';

export const availableLanguages = {
  en: 'English',
  [fakeLang]: transformFake('Fake'),
};

const defaultLanguage = config.isDevelopment ? fakeLang : 'en';

export const initializeTranslations = () =>
  i18n
    .use(backend)
    .use(initReactI18next)
    .init({
      debug: config.isDevelopment,
      fallbackLng: 'en',
      fallbackNS: I18N_DEFAULT_NAMESPACE,
      interpolation: {
        escapeValue: false,
      },
      lng: defaultLanguage,
      ns: I18N_DEFAULT_NAMESPACE,
      react: {
        useSuspense: true,
      },
    });
