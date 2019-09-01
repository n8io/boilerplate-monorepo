import { map, pipe, prop, sortBy } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';
import { Language as LanguageType, Languages } from 'types/language';
import { LocalStorage } from 'types/localStorage';
import { Menu } from '../../../../Menu';
import { ToggleButton } from '../ToggleButton';

const domTestId = 'Language';

const i18nKeyMap = {
  [LanguageType.ENGLISH]: 'en',
  [LanguageType.FAKE]: 'dev',
  [LanguageType.FRENCH]: 'fr',
  [LanguageType.SPANISH]: 'es',
};

const makeOptions = ({ i18n, t }) => {
  const updateLanguage = language => () => {
    i18n.changeLanguage(language);
    localStorage.setItem(LocalStorage.LANGUAGE, language);
  };

  const languageToOption = language => ({
    label: t(`languages.${i18nKeyMap[language]}`),
    onClick: updateLanguage(language),
    text: t(`languages.${i18nKeyMap[language]}`),
  });

  return pipe(
    map(languageToOption),
    sortBy(prop('label'))
  )(Languages);
};

const Language = () => {
  if (Languages.length <= 1) return null;

  const component = 'toggles';
  const namespace = 'shared';
  const { i18n, t: originalT } = useTranslation(namespace);
  const t = (key, options) =>
    key && originalT([`${component}.${key}`, key], options);

  return (
    <Menu
      data-testid={domTestId}
      label={t('chooseALanguage')}
      menuLabel={t('availableLanguages')}
      menuOptions={{ placement: 'top-end' }}
      options={makeOptions({ i18n, t })}
      tabindex="-1"
    >
      <ToggleButton label={t('chooseALanguage')}>
        <FaLanguage />
      </ToggleButton>
    </Menu>
  );
};

export { Language, domTestId };
