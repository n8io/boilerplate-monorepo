import { Color } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import Helmet from 'react-helmet';

const Meta = () => (
  <Helmet>
    <meta name="theme-color" content={Color.PRIMARY} />
  </Helmet>
);

export { Meta };
