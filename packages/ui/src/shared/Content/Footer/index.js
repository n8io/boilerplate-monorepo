import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { bottomStyles as fadeBottomStyles } from '../fade';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Footer';

const Styled = styled.footer`
  align-items: center;
  border-top: 1px solid ${Color.border};
  display: flex;
  grid-area: ${GridTemplateArea.FOOTER};
  height: ${Layout.MAIN_FOOTER_HEIGHT}rem;
  padding: 0 1rem;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${fadeBottomStyles}
`;

const Footer = ({ children }) => (
  <Styled data-testid={domTestId}>{children}</Styled>
);

Footer.propTypes = {
  children: node.isRequired,
};

export { domTestId, Footer };
