import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Footer';

const Styled = styled.footer`
  align-items: center;
  box-shadow: 0 -1px 0 0 ${Color.border};
  display: flex;
  grid-area: ${GridTemplateArea.FOOTER};
  height: ${Layout.MAIN_FOOTER_HEIGHT}rem;
  padding: 0 1rem;
`;

const Footer = ({ children }) => (
  <Styled data-testid={domTestId}>{children}</Styled>
);

Footer.propTypes = {
  children: node.isRequired,
};

export { domTestId, Footer };
