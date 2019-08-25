import { node } from 'prop-types';
import { defaultTo } from 'ramda';
import React, { useState } from 'react';
import { useTheme } from 'shared/useTheme';
import { ThemeProvider } from 'styled-components/macro';
import { DisplayMode } from 'types/displayMode';

const LOCAL_STORAGE_KEY = 'theme';

const Theme = ({ children }) => {
  const { provider: ThemeSwitcherProvider } = useTheme();
  const defaultTheme = defaultTo(
    {
      mode: DisplayMode.LIGHT,
    },
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  );

  const [theme, updateTheme] = useState(defaultTheme);

  const updateThemeProxy = newTheme => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTheme));
    updateTheme(newTheme);
  };

  const context = {
    theme,
    updateTheme: updateThemeProxy,
  };

  return (
    <ThemeSwitcherProvider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeSwitcherProvider>
  );
};

Theme.propTypes = {
  children: node.isRequired,
};

export { Theme };
