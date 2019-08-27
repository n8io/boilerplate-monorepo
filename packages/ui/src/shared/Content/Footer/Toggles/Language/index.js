import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';
import { Language as LanguageType, Languages } from 'types/language';
import { LOCAL_STORAGE_LANGUAGE_KEY } from 'modules/app/components/App/Providers/TranslationSync';
import { Context } from '../../../../Button';
import { Menu } from '../../../../Menu';
import { ToggleButton } from '../ToggleButton';

const i18nKeyMap = {
  [LanguageType.ENGLISH]: 'english',
  [LanguageType.FAKE]: 'fake',
};

const makeOptions = ({ i18n, t }) => {
  const updateLanguage = language => () => {
    i18n.changeLanguage(language);
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language);
  };

  return Languages.map(language => ({
    label: t(`languages.${i18nKeyMap[language]}`),
    onClick: updateLanguage(language),
    text: t(`languages.${i18nKeyMap[language]}`),
  }));
};

const Language = () => {
  if (Languages.length <= 1) return <div />;

  const component = 'toggles';
  const namespace = 'shared';
  const { i18n, t: originalT } = useTranslation(namespace);
  const t = (key, options) =>
    key && originalT([`${component}.${key}`, key], options);

  return (
    <Menu
      label={t('selectALanguage')}
      menuLabel={t('availableLanguages')}
      menuOptions={{ placement: 'top-end' }}
      options={makeOptions({ i18n, t })}
      tabindex="-1"
    >
      <ToggleButton context={Context.PRIMARY} label={t('selectALanguage')}>
        <FaLanguage />
      </ToggleButton>
    </Menu>
  );
};

export { Language };
