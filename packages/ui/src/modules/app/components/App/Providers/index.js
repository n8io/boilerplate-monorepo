import { config } from 'config';
import { node } from 'prop-types';
import React from 'react';
import { Router } from 'react-router-dom';
import { Suspense } from 'shared/Suspense';
import { history } from 'types/history';
import { Auth } from './Auth';
import { Features } from './Features';
import { FontLoader } from './FontLoader';
import { GlobalStyle } from './GlobalStyles';
import { GraphQL } from './GraphQL';
import { Logging } from './Logging';
import { Modality } from './Modality';
import { Theme } from './Theme';
import { TranslationSync } from './TranslationSync';

const { PUBLIC_URL: basename } = config;

const Providers = ({ children }) => (
  <Suspense>
    <Logging />
    <Theme>
      <GraphQL>
        <FontLoader />
        <GlobalStyle />
        <Modality />
        <TranslationSync />
        <Router basename={basename} history={history}>
          <Features>
            <Auth>{children}</Auth>
          </Features>
        </Router>
      </GraphQL>
    </Theme>
  </Suspense>
);

Providers.propTypes = {
  children: node.isRequired,
};

export { Providers };
