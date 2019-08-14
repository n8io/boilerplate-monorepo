import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Font } from 'types/font';
import { Layout } from 'types/layout';
import { Header } from './Header';
import { Main } from './Main';
import { Nav } from './Nav';
import { GridTemplateArea } from './gridTemplateArea';

const domTestId = 'Layout';

const modeStyles = theme('mode', {
  [DisplayMode.DARK]: {
    backgroundColor: Color.black,
    color: Color.white,
  },
  [DisplayMode.LIGHT]: {
    backgroundColor: Color.white,
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
  grid-template-columns: ${Layout.NAV_WIDTH}rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  margin: 0;
  padding: 0;
  transition: color 200ms ease, background-color 200ms ease,
    font-size 200ms ease;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${modeStyles}
`;

const AppLayout = () => (
  <Styled data-testid={domTestId}>
    <Header />
    <Nav />
    <Main />
  </Styled>
);

export { domTestId, AppLayout as Layout };
