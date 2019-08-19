import { node } from 'prop-types';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'shared/Suspense';
import { FontLoader } from './FontLoader';
import { GlobalStyle } from './GlobalStyles';
import { Modality } from './Modality';
import { Theme } from './Theme';
import { TranslationSync } from './TranslationSync';

const AppProviders = ({ children }) => (
  <Suspense>
    <Theme>
      <>
        <FontLoader />
        <GlobalStyle />
        <Modality />
        <TranslationSync />
        <Router>{children}</Router>
      </>
    </Theme>
  </Suspense>
);

AppProviders.propTypes = {
  children: node.isRequired,
};

export { AppProviders };
