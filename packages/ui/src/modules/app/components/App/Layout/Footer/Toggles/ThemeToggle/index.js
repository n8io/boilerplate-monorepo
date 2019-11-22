import { noop } from '@puttingpoker/common';
import { bool, func } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useLongPress } from 'shared/useLongPress';
import { useTheme } from 'shared/useTheme';
import { useTimeout } from 'shared/useTimeout';
import { useTranslate } from 'shared/useTranslate';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';
import { ToggleButton } from '../ToggleButton';

const domTestId = 'ToggleTheme';

/* eslint complexity: ["warn", 6] */
const ThemeToggle = ({ isDarkMode, onToggle }) => {
  const t = useTranslate({
    component: 'toggles',
    namespace: 'shared',
  });
  const [isEnabled, beEnabled] = useState(true);
  const { clearTheme } = useTheme();
  const onLongPressed = useCallback(() => {
    clearTheme();
    beEnabled(false);
  }, [clearTheme]);
  const { isLongPressing, ...longPressProps } = useLongPress(
    onLongPressed,
    1000
  );

  useTimeout(isEnabled ? noop : () => beEnabled(true), isEnabled ? 0 : 3000);

  const onToggleProxy = isLongPressing ? noop : onToggle;

  const i18nkey = `${Theme.PROP_NAME}.${
    isDarkMode ? DisplayMode.LIGHT : DisplayMode.DARK
  }`;

  return (
    <ToggleButton
      {...longPressProps}
      data-testid={domTestId}
      disabled={!isEnabled}
      label={t(i18nkey)}
      onClick={onToggleProxy}
    >
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </ToggleButton>
  );
};

ThemeToggle.propTypes = {
  isDarkMode: bool.isRequired,
  onToggle: func.isRequired,
};

export { ThemeToggle, domTestId };
