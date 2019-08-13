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

const Styled = styled.div`
  border-bottom: 1px solid ${border};
  font-size: 1.75rem;

  ${layoutStyles}
`;

const Header = ({ children, title }) => (
  <Styled data-testid={domTestId}>
    {children ? children : <h1>{title}</h1>}
  </Styled>
);

const checkChildrenOrTitle = ({ children, title }) => {
  if (children || title) return;

  throw new Error('Either children or a title is required');
};

Header.propTypes = {
  children: checkChildrenOrTitle,
  title: checkChildrenOrTitle,
};

export { domTestId, Header };
