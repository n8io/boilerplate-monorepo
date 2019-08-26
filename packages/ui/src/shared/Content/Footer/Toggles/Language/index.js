import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';
import { LOCAL_STORAGE_LANGUAGE_KEY } from 'modules/app/components/App/Providers/TranslationSync';
import { Context } from '../../../../Button';
import { Menu } from '../../../../Menu';
import { ToggleButton } from '../ToggleButton';

const makeOptions = ({ i18n, t }) => {
  const updateLanguage = language => {
    i18n.changeLanguage(language);
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language);
  };

  return [
    {
      label: t('languages.english'),
      onClick: () => updateLanguage('en'),
      text: t('languages.english'),
    },
    {
      label: t('languages.fake'),
      onClick: () => updateLanguage('dev'),
      text: t('languages.fake'),
    },
  ];
};

const Language = () => {
  const component = 'toggles';
  const namespace = 'shared';
  const { i18n, t: originalT } = useTranslation(namespace);
  const t = (key, options) =>
    key && originalT([`${component}.${key}`, key], options);

  return (
    <Menu
      label={t('selectALanguage')}
      menuLabel={t('availableLanguages')}
      options={makeOptions({ i18n, t })}
    >
      <ToggleButton context={Context.PRIMARY} label={t('selectALanguage')}>
        <FaLanguage />
      </ToggleButton>
    </Menu>
  );
};

export { Language };
