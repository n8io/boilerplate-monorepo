import React from 'react';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Font } from 'types/font';
import { Header } from './Header';
import { Main } from './Main';
import { Nav } from './Navigation';
import { GridTemplateArea } from './gridTemplateArea';

const modeStyles = theme('mode', {
  [DisplayMode.DARK]: {
    'background-color': Color.black,
    color: Color.white,
  },
  [DisplayMode.LIGHT]: {
    'background-color': Color.white,
    color: Color.black,
  },
});

const Styled = styled.div`
  border: 0;
  box-sizing: border-box;
  display: grid;
  font-family: ${Font.familyName};
  grid-template-areas: '${GridTemplateArea.HEADER} ${GridTemplateArea.HEADER}'
    '${GridTemplateArea.NAV} ${GridTemplateArea.MAIN}';
  grid-template-columns: var(--layout-nav-width) 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  margin: 0;
  padding: 0;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${modeStyles}

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${media.lessThan('medium')`
    grid-template-areas: '${GridTemplateArea.HEADER} ${GridTemplateArea.HEADER}'
      '${GridTemplateArea.MAIN} ${GridTemplateArea.MAIN}';
  `}
`;

const AppLayout = () => (
  <Styled>
    <Header />
    <Nav />
    <Main />
  </Styled>
);

export { AppLayout as Layout };
