import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';
import { Spacing } from '../spacing';

const domTestId = 'Footer';
const { FOOTER } = GridTemplateArea;
const { border } = Color;
const { COMFORTABLE, COMPACT, DEFAULT } = Layout;

const layoutStyles = theme('layout', {
  [COMFORTABLE]: {
    padding: Spacing[COMFORTABLE],
  },
  [COMPACT]: {
    padding: Spacing[COMPACT],
  },
  [DEFAULT]: {
    padding: Spacing[DEFAULT],
  },
});

const Styled = styled.footer`
  align-items: center;
  border-top: 1px solid ${border};
  display: flex;
  grid-area: ${FOOTER};

  ${layoutStyles}
`;

const Footer = () => <Styled data-testid={domTestId}>Footer</Styled>;

export { domTestId, Footer };
