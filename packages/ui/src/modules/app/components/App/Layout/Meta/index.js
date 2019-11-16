import React from 'react';
import Helmet from 'react-helmet';
import { Color } from 'types/color';

const Meta = () => (
  <Helmet>
    <meta name="theme-color" content={Color.PRIMARY} />
  </Helmet>
);

export { Meta };
