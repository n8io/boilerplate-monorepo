import {
  LocalStorage,
  Modality,
  Theme as ThemeType,
} from '@boilerplate-monorepo/ui-common';
import { node } from 'prop-types';
import { defaultTo } from 'ramda';
import React, { useCallback, useState } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { Provider } from 'types/provider';

const Theme = ({ children }) => {
  const defaultTheme = defaultTo(
    {
      [ThemeType.PROP_NAME]: ThemeType.initial,
    },
    JSON.parse(localStorage.getItem(LocalStorage.THEME))
  );
  const [theme, updateTheme] = useState(defaultTheme);
  const [modality, updateModality] = useState();

  const clearTheme = useCallback(() =>
    localStorage.removeItem(LocalStorage.THEME)
  );

  const updateThemeProxy = useCallback(
    nextTheme => {
      localStorage.setItem(LocalStorage.THEME, JSON.stringify(nextTheme));
      updateTheme(nextTheme);
    },
    [updateTheme]
  );

  const updateModalityProxy = useCallback(
    nextModality => {
      document.body.setAttribute(Modality.DOM_ATTRIBUTE, nextModality);
      updateModality(nextModality);
    },
    [updateModality]
  );

  const themeContext = {
    clearTheme,
    theme,
    updateTheme: updateThemeProxy,
  };

  const modalityContext = {
    isEnabled: Boolean(modality),
    modality,
    update: updateModalityProxy,
  };

  return (
    <Provider.MODALITY value={modalityContext}>
      <Provider.THEME_SWITCHER value={themeContext}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider.THEME_SWITCHER>
    </Provider.MODALITY>
  );
};

Theme.propTypes = {
  children: node.isRequired,
};

export { Theme };
