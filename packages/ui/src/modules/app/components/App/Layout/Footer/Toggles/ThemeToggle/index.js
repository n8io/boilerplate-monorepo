import { bool, func } from 'prop-types';
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTranslate } from 'shared/useTranslate';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';
import { ToggleButton } from '../ToggleButton';

const domTestId = 'ToggleTheme';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  const t = useTranslate({
    component: 'toggles',
    namespace: 'shared',
  });

  const i18nkey = `${Theme.PROP_NAME}.${
    isDarkMode ? DisplayMode.LIGHT : DisplayMode.DARK
  }`;

  return (
    <ToggleButton data-testid={domTestId} label={t(i18nkey)} onClick={onToggle}>
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </ToggleButton>
  );
};

ThemeToggle.propTypes = {
  isDarkMode: bool.isRequired,
  onToggle: func.isRequired,
};

export { ThemeToggle, domTestId };
