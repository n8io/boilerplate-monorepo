import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { Spacing } from '../spacing';

const domTestId = 'Header';
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

const Styled = styled.header`
  border-bottom: 1px solid ${border};
  font-size: 1.75rem;

  ${layoutStyles}
`;

const Header = () => <Styled data-testid={domTestId}>Header</Styled>;

export { domTestId, Header };
