import { Color } from '@boilerplate-monorepo/ui-common';
import { config } from 'config';
import React from 'react';
import Helmet from 'react-helmet';

const { RELEASE_HASH, RELEASE_VERSION } = config;

const Meta = () => (
  <Helmet>
    <meta name="theme-color" content={Color.PRIMARY} />
    <meta name="version" content={RELEASE_VERSION} />
    <meta name="hash" content={RELEASE_HASH} />
  </Helmet>
);

export { Meta };
