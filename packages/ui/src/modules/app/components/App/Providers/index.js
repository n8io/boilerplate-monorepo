import { config } from 'config';
import { node } from 'prop-types';
import React from 'react';
import { Router } from 'react-router-dom';
import { Suspense } from 'shared/Suspense';
import { history } from 'types/history';
import { Auth } from './Auth';
import { FontLoader } from './FontLoader';
import { GlobalStyle } from './GlobalStyles';
import { GraphQL } from './GraphQL';
import { InternetConnectivity } from './InternetConnectivity';
import { Logging } from './Logging';
import { Modality } from './Modality';
import { Theme } from './Theme';
import { TranslationSync } from './TranslationSync';

const { PUBLIC_URL: basename } = config;

const Providers = ({ children }) => (
  <Suspense>
    <Logging />
    <Theme>
      <InternetConnectivity>
        <GraphQL>
          <FontLoader />
          <GlobalStyle />
          <Modality />
          <TranslationSync />
          <Router basename={basename} history={history}>
            <Auth>{children}</Auth>
          </Router>
        </GraphQL>
      </InternetConnectivity>
    </Theme>
  </Suspense>
);

Providers.propTypes = {
  children: node.isRequired,
};

export { Providers };
