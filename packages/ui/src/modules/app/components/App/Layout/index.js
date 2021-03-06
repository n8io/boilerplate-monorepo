import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { GreaterThanMobile } from 'shared/Breakpoints';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { FavIcon } from './FavIcon';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { Meta } from './Meta';
import { Navigation } from './Navigation';
import { styles as themeStyles } from './theme';

const maxMobileBreakpoint = Breakpoint.toPixels(Breakpoint.SMALL);

const Container = styled.div`
  border: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-areas: '${GridTemplateArea.HEADER} ${GridTemplateArea.HEADER}'
    '${GridTemplateArea.MAIN} ${GridTemplateArea.MAIN}'
    '${GridTemplateArea.FOOTER} ${GridTemplateArea.FOOTER}';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  margin: 0;
  padding: 0;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${media.greaterThan(maxMobileBreakpoint)`
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
    <Header />
    <GreaterThanMobile>
      <Navigation />
    </GreaterThanMobile>
    <Main />
    <Footer />
  </Container>
);

export { Layout };
