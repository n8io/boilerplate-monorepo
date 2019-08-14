import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Body';

const FIXED_LAYOUT_HEIGHT =
  Layout.HEADER_HEIGHT + Layout.MAIN_HEADER_HEIGHT + Layout.MAIN_FOOTER_HEIGHT;

const Styled = styled.section`
  grid-area: ${GridTemplateArea.BODY};
  height: calc(100vh - ${FIXED_LAYOUT_HEIGHT}rem);
  overflow-y: auto;
  padding: 0.5rem 1rem;
`;

const Body = ({ children }) => (
  <Styled data-testid={domTestId}>{children}</Styled>
);

Body.propTypes = {
  children: node.isRequired,
};

export { Body };
