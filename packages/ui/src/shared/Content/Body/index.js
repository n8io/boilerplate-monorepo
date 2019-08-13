import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';
import { Spacing } from '../spacing';

const domTestId = 'Body';

const { COMFORTABLE, COMPACT, DEFAULT } = Layout;

const { BODY } = GridTemplateArea;

const spacerLayoutStyles = theme('layout', {
  [COMFORTABLE]: {
    height: '0.25rem',
  },
  [COMPACT]: {
    height: '0.125rem',
  },
  [DEFAULT]: {
    height: '0.5rem',
  },
});

const Spacer = styled.div`
  height: 0.5rem;
  width: 100%;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${spacerLayoutStyles}
`;

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

const Styled = styled.section`
  grid-area: ${BODY};
  overflow-y: auto;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${layoutStyles}
`;

const Body = ({ children }) => (
  <Styled data-testid={domTestId}>
    <Spacer />
    {children}
    <Spacer />
  </Styled>
);

Body.propTypes = {
  children: node.isRequired,
};

export { Body };
