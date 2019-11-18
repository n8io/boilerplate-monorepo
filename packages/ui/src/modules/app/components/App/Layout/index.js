import React from 'react';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { Font } from 'types/font';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { FavIcon } from './FavIcon';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { Meta } from './Meta';
import { Nav } from './Navigation';
import { styles as themeStyles } from './theme';

const Styled = styled.div`
  border: 0;
  box-sizing: border-box;
  display: grid;
  font-family: ${Font.familyName};
  grid-template-areas: '${GridTemplateArea.HEADER} ${GridTemplateArea.HEADER}'
    '${GridTemplateArea.NAV} ${GridTemplateArea.MAIN}'
    '${GridTemplateArea.NAV} ${GridTemplateArea.FOOTER}';
  grid-template-columns: var(--layout-nav-width) 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  margin: 0;
  padding: 0;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${media.lessThan('medium')`
    grid-template-areas: '${GridTemplateArea.HEADER} ${GridTemplateArea.HEADER}'
      '${GridTemplateArea.MAIN} ${GridTemplateArea.MAIN}'
      '${GridTemplateArea.FOOTER} ${GridTemplateArea.FOOTER}';
  `}
  ${themeStyles}
`;

const Layout = () => (
  <Styled>
    <Meta />
    <FavIcon />
    <Header />
    <Nav />
    <Main />
    <Footer />
  </Styled>
);

export { Layout };
