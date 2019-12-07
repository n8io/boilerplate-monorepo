import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import reset from 'styled-reset-advanced';
import { styles as customPropertyDefinitions } from 'types/customProperties';
import { styles as modalityStyles } from '../Modality';
import { styles as elementStyles } from './elements';
import { styles as typographyStyles } from './typography';

const Container = createGlobalStyle`
  ${reset}

  #root {
    height: 100%;
  }

  ${customPropertyDefinitions}
  ${modalityStyles}
  ${elementStyles}
  ${typographyStyles}
 
  @media screen and (prefers-reduced-motion: reduce), (update: slow) {
    * {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`;

const GlobalStyle = () => <Container />;

export { GlobalStyle };
