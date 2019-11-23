import { DisplayMode } from '@boilerplate-monorepo/ui-common';

const prefersDarkMode = Boolean(
  window.matchMedia('(prefers-color-scheme: dark)').matches
);

export const initial = prefersDarkMode ? DisplayMode.DARK : DisplayMode.LIGHT;
