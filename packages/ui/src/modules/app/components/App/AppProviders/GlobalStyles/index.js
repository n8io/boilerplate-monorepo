import React, { useContext } from 'react';
import { createGlobalStyle, ThemeContext } from 'styled-components/macro';
import reset from 'styled-reset-advanced';

const GlobalStyle = () => {
  const { site } = useContext(ThemeContext);

  const Styled = createGlobalStyle`
  ${reset}

  :root {
    --site-background-color: ${site.backgroundColor};
    --site-font-color: ${site.color};
    --site-font-family: ${site.fontFamily};
    --site-font-family-numerals: ${site.fontFamilyNumerals};
  }

  html,body {
    background-color: var(--site-background-color);
    color: var(--site-font-color);
    font-family: var(--site-font-family);
    height: 100vh;
    width: 100vw;
  }
`;

  return <Styled />;
};

export { GlobalStyle };
