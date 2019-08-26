import { I18N_DEFAULT_NAMESPACE } from 'i18n';
import { object, string } from 'prop-types';
import { useEffect } from 'react';
import { withTranslation } from 'react-i18next';

export const LOCAL_STORAGE_LANGUAGE_KEY = 'language';

const readLocal = fallbackLocale =>
  localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || fallbackLocale;

const TranslationSync = ({ locale, i18n }) => {
  useEffect(() => {
    const sync = () => {
      i18n.changeLanguage(readLocal(locale));
    };

    sync();
  }, [locale]);

  return null;
};

TranslationSync.defaultProps = {
  defaultLocale: undefined,
};

TranslationSync.propTypes = {
  defaultLocale: string,
  i18n: object.isRequired,
};

const TranslatedWithCommon = withTranslation(I18N_DEFAULT_NAMESPACE)(
  TranslationSync
);

export { TranslatedWithCommon as TranslationSync };
