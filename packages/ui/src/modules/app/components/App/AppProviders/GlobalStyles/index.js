import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import reset from 'styled-reset-advanced';
import { Color } from 'types/color';

const { focusRing } = Color;

const Styled = createGlobalStyle`
  /* stylelint-disable-next-line selector-type-no-unknown */
  ${reset}

  html,body {
    height: 100vh;
    width: 100vw;
  }

  #root {
    height: 100%;
  }

  body[modality="keyboard"] *:focus {
    outline: 0.375rem solid ${focusRing} !important; /* for non-webkit browsers */
    outline: 0.375rem auto -webkit-focus-ring-color !important;
  }
`;

const GlobalStyle = () => <Styled />;

export { GlobalStyle };
