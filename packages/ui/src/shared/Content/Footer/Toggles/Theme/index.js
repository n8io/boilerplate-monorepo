import { bool, func } from 'prop-types';
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { DisplayMode } from 'types/displayMode';
import { useTranslate } from '../../../../useTranslate';
import { ToggleButton } from '../ToggleButton';

const domTestId = 'ToggleTheme';

const Theme = ({ isDarkMode, onToggle }) => {
  const t = useTranslate({
    component: 'toggles',
    namespace: 'shared',
  });

  const i18nkey = `modes.${isDarkMode ? DisplayMode.LIGHT : DisplayMode.DARK}`;

  return (
    <ToggleButton data-testid={domTestId} label={t(i18nkey)} onClick={onToggle}>
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </ToggleButton>
  );
};

Theme.propTypes = {
  isDarkMode: bool.isRequired,
  onToggle: func.isRequired,
};

export { Theme, domTestId };
