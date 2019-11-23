import { Breakpoint } from '@boilerplate-monorepo/ui-common';
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
import { Navigation } from './Navigation';
import { SkipToContentLink } from './SkipToContentLink';
import { styles as themeStyles } from './theme';

const Container = styled.div`
  border: 0;
  box-sizing: border-box;
  display: grid;
  font-family: ${Font.familyName};
  grid-template-areas: '${GridTemplateArea.HEADER} ${GridTemplateArea.HEADER}'
      '${GridTemplateArea.MAIN} ${GridTemplateArea.MAIN}'
      '${GridTemplateArea.FOOTER} ${GridTemplateArea.FOOTER}';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  margin: 0;
  padding: 0;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${media.greaterThan(Breakpoint.MOBILE)`
    grid-template-areas: '${GridTemplateArea.HEADER} ${GridTemplateArea.HEADER}'
      '${GridTemplateArea.NAV} ${GridTemplateArea.MAIN}'
      '${GridTemplateArea.NAV} ${GridTemplateArea.FOOTER}';
  `}
  ${themeStyles}
`;

const Layout = () => (
  <Container>
    <Meta />
    <FavIcon />
    <SkipToContentLink />
    <Header />
    <Navigation />
    <Main />
    <Footer />
  </Container>
);

export { Layout };
