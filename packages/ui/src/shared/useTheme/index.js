import { createContext, useContext } from 'react';

const ThemeSwitcherContext = createContext();

const useTheme = () => ({
  provider: ThemeSwitcherContext.Provider,
  ...useContext(ThemeSwitcherContext),
});

export { useTheme };
