import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { Menu, MenuDisclosure, MenuItem, useMenuState } from 'reakit/Menu';
import { Context, Size, styles } from 'shared/Button';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Languages } from 'types/language';
import { LanguageDisplay } from 'types/languageDisplay';
import { LocalStorage } from 'types/localStorage';

const menuItemStyles = theme('mode', {
  [DisplayMode.DARK]: {
    backgroundColor: Color.black,
  },
  [DisplayMode.LIGHT]: {
    backgroundColor: Color.white,
  },
});

const StyledDisclosure = styled(MenuDisclosure)`
  ${styles}
`;

const StyledMenu = styled(Menu)`
  background-color: var(--grayscale-white);
  border: 1px solid var(--color-type-primary);
  z-index: 1000;
`;

const StyledMenuItem = styled(MenuItem)`
  display: block;
  padding: calc(var(--layout-base-unit) * 0.5);
  width: 100%;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${menuItemStyles}

  &[tabindex='0'] {
    background-color: var(--color-type-primary);
    color: var(--grayscale-white);
    cursor: pointer;
  }
`;

const Language = () => {
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

  if (Languages.length <= 1) return null;
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
      <StyledMenu {...menu} aria-label={t('chooseALanguage')}>
        {Languages.map(language => (
          <StyledMenuItem
            {...menu}
            aria-label={t('setLanguage', {
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

export { Language };
