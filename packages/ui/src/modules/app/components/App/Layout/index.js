import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Font } from 'types/font';
import { Header } from './Header';
import { Main } from './Main';
import { SkipNavLink } from './SkipNavLink';

const domTestId = 'Layout';

const { black, white } = Color;
const { familyName } = Font;
const { DARK, LIGHT } = DisplayMode;

const modeStyles = theme('mode', {
  [DARK]: {
    backgroundColor: black,
    color: white,
  },
  [LIGHT]: {
    backgroundColor: white,
    color: black,
  },
});

const Styled = styled.div`
  border: 0;
  box-sizing: border-box;
  display: grid;
  font-family: ${familyName};
  grid-template-rows: auto 1fr;
  height: 100%;
  margin: 0;
  padding: 0;
  transition: color 200ms ease, background-color 200ms ease,
    font-size 200ms ease;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${modeStyles}
`;

const Layout = () => (
  <Styled data-testid={domTestId}>
    <SkipNavLink />
    <Header />
    <Main />
  </Styled>
);

export { domTestId, Layout };
