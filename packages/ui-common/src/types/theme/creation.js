import { DisplayMode } from '../displayMode';

const prefersDarkMode = Boolean(
  window &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
);

export const initial = prefersDarkMode ? DisplayMode.DARK : DisplayMode.LIGHT;
