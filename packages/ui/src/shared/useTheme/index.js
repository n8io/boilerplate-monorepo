import { createContext, useContext } from 'react';

const ThemeSwitcherContext = createContext();

const useTheme = () => ({
  context: ThemeSwitcherContext,
  provider: ThemeSwitcherContext.Provider,
  ...useContext(ThemeSwitcherContext),
});

export { useTheme };
