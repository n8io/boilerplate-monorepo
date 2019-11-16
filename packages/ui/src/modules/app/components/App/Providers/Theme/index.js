import { node } from 'prop-types';
import { defaultTo } from 'ramda';
import React, { useState } from 'react';
import { useTheme } from 'shared/useTheme';
import { ThemeProvider } from 'styled-components/macro';
import { LocalStorage } from 'types/localStorage';
import { Theme as ThemeType } from 'types/theme';

const Theme = ({ children }) => {
  const { provider: ThemeSwitcherProvider } = useTheme();
  const defaultTheme = defaultTo(
    {
      [ThemeType.PROP_NAME]: ThemeType.initial,
    },
    JSON.parse(localStorage.getItem(LocalStorage.THEME))
  );

  const [theme, updateTheme] = useState(defaultTheme);

  const updateThemeProxy = newTheme => {
    localStorage.setItem(LocalStorage.THEME, JSON.stringify(newTheme));
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
