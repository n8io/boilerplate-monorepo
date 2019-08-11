import { node } from 'prop-types';
import React from 'react';
import { FontLoader } from './FontLoader';
import { GlobalStyle } from './GlobalStyles';
import { Modality } from './Modality';
import { Theme } from './Theme';

const AppProviders = ({ children }) => (
  <Theme>
    <>
      <FontLoader />
      <GlobalStyle />
      <Modality />
      {children}
    </>
  </Theme>
);

AppProviders.propTypes = {
  children: node.isRequired,
};

export { AppProviders };
