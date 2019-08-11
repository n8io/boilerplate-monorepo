import { node } from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { DisplayMode } from 'types/displayMode';
import { Layout } from 'types/layout';

const { LIGHT } = DisplayMode;
const { DEFAULT } = Layout;

const ThemeSwitcherContext = createContext();

const useThemeSwitcher = () => useContext(ThemeSwitcherContext);

const { Provider: ThemeSwitchProvider } = ThemeSwitcherContext;

const Theme = ({ children }) => {
  const [theme, setTheme] = useState({
    layout: DEFAULT,
    mode: LIGHT,
  });

  const context = {
    theme,
    updateTheme: ({ layout, mode }) => setTheme({ layout, mode }),
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
