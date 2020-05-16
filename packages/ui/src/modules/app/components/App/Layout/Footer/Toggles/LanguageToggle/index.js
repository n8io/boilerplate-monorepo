import { LocalStorage } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu';
import { Context, Size, styles } from 'shared/Button';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Language } from 'types/language';
import { LanguageDisplay } from 'types/languageDisplay';
import * as ThemeStyles from './theme';

const StyledDisclosure = styled(MenuButton)`
  ${styles}
`;

const StyledMenu = styled(Menu)`
  background-color: ${CustomProperty.GRAYSCALE_WHITE};
  border: 1px solid ${CustomProperty.COLOR_PRIMARY};
  z-index: ${CustomProperty.Z_INDEX_LANGUAGE_TOGGLE};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${ThemeStyles.menu}
`;

const StyledMenuItem = styled(MenuItem)`
  background-color: ${CustomProperty.GRAYSCALE_WHITE};
  color: ${CustomProperty.COLOR_PRIMARY};
  display: block;
  padding: calc(${CustomProperty.BASE_UNIT} * 0.5);
  width: 100%;

  &[tabindex='0'] {
    background-color: ${CustomProperty.COLOR_PRIMARY};
    color: ${CustomProperty.GRAYSCALE_WHITE};
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

  const onLanguageClick = (language) => {
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
        data-testid="language"
        context={Context.PRIMARY}
        size={Size.SMALL}
      >
        <MdLanguage />
      </StyledDisclosure>
      <StyledMenu
        {...menu}
        aria-label={t('chooseALanguage')}
        aria-modal={undefined} // Fixes a11y violation (invalid aria attribute on role="menu")
      >
        {Language.values.map((language) => (
          <StyledMenuItem
            {...menu}
            aria-label={t('setLanguage', {
              language: LanguageDisplay[language],
            })}
            data-testid={language}
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
