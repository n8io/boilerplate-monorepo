import { node } from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { Theme } from '../theme';
import { FontLoader } from './FontLoader';
import { GlobalStyle } from './GlobalStyles';

const AppProviders = ({ children }) => (
  <ThemeProvider theme={Theme.default}>
    <>
      <FontLoader />
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
);

AppProviders.propTypes = {
  children: node.isRequired,
};

export { AppProviders };
