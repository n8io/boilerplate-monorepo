import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { Menu, MenuDisclosure, MenuItem, useMenuState } from 'reakit/Menu';
import { Context, Size, styles } from 'shared/Button';
import styled from 'styled-components/macro';
import { Language } from 'types/language';
import { LanguageDisplay } from 'types/languageDisplay';
import { LocalStorage } from 'types/localStorage';
import * as ThemeStyles from './theme';

const StyledDisclosure = styled(MenuDisclosure)`
  ${styles}
`;

const StyledMenu = styled(Menu)`
  background-color: var(--grayscale-white);
  border: 1px solid var(--color-type-primary);
  z-index: 1000;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${ThemeStyles.menu}
`;

const StyledMenuItem = styled(MenuItem)`
  background-color: var(--grayscale-white);
  color: var(--color-type-primary);
  display: block;
  padding: calc(var(--layout-base-unit) * 0.5);
  width: 100%;

  &[tabindex='0'] {
    background-color: var(--color-type-primary);
    color: var(--grayscale-white);
    cursor: pointer;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${ThemeStyles.menuItem}
`;

const LanguageToggle = () => {
  const menu = useMenuState({ placement: 'top-end' });
  const component = 'toggles';
  const namespace = 'shared';
  const { i18n, t: originalT } = useTranslation(namespace);
  const t = (key, options) =>
    key && originalT([`${component}.${key}`, key], options);

  const onLanguageClick = language => {
    i18n.changeLanguage(language);
    localStorage.setItem(LocalStorage.LANGUAGE, language);
    menu.hide();
  };

  if (Language.values.length <= 1) return null;

  return (
    <div>
      <StyledDisclosure
        {...menu}
        aria-label={t('chooseALanguage')}
        context={Context.PRIMARY}
        size={Size.SMALL}
      >
        <MdLanguage />
      </StyledDisclosure>
      <StyledMenu
        {...menu}
        aria-label={t('chooseALanguage')}
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-modal={undefined} // Fixes a11y violation (invalid aria attribute on role="menu")
      >
        {Language.values.map(language => (
          <StyledMenuItem
            {...menu}
            aria-label={t('setLanguages', {
              language: LanguageDisplay[language],
            })}
            key={language}
            onClick={() => onLanguageClick(language)}
          >
            {LanguageDisplay[language]}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export { LanguageToggle };
