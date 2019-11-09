import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import reset from 'styled-reset-advanced';
import { styles as modalityStyles } from '../Modality';
import { styles as elementStyles } from './elements';
import { styles as typographyStyles } from './typography';
import { styles as variables } from './variables';

const Styled = createGlobalStyle`
  ${reset}

  #root {
    height: 100%;
  }

  ${variables}
  ${modalityStyles}
  ${elementStyles}
  ${typographyStyles}
`;

const GlobalStyle = () => <Styled />;

export { GlobalStyle };
