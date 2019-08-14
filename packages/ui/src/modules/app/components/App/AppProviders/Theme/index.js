import { node } from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { DisplayMode } from 'types/displayMode';

const ThemeSwitcherContext = createContext();

const useThemeSwitcher = () => useContext(ThemeSwitcherContext);

const { Provider: ThemeSwitchProvider } = ThemeSwitcherContext;

const Theme = ({ children }) => {
  const [theme, updateTheme] = useState({
    mode: DisplayMode.LIGHT,
  });

  const context = {
    theme,
    updateTheme,
  };

  return (
    <ThemeSwitchProvider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeSwitchProvider>
  );
};

Theme.propTypes = {
  children: node.isRequired,
};

export { Theme, useThemeSwitcher };
