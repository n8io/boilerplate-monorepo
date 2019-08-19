import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import reset from 'styled-reset-advanced';
import { styles as modalityStyles } from '../Modality';
import { styles as elementStyles } from './elements';
import { styles as headerStyles } from './headers';

const Styled = createGlobalStyle`
  ${reset}

  html,body {
    height: 100vh;
    width: 100vw;
  }

  #root {
    height: 100%;
  }
  
  ${modalityStyles}
  ${elementStyles}
  ${headerStyles}
`;

const GlobalStyle = () => <Styled />;

export { GlobalStyle };
