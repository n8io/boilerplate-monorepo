import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { GridTemplateArea } from './gridTemplateArea';

const domTestId = 'Content';

const Styled = styled.div`
  display: grid;
  grid-template-areas: 
    '${GridTemplateArea.HEADER}' 
    '${GridTemplateArea.BODY}' 
    '${GridTemplateArea.FOOTER}';
  grid-template-rows: auto 1fr auto;
`;

const Content = ({ children }) => (
  <Styled data-testid={domTestId}>{children}</Styled>
);

Content.propTypes = {
  children: node.isRequired,
};

export { Body } from './Body';
export { Footer } from './Footer';
export { GridTemplateArea } from './gridTemplateArea';
export { Header, domId as mainContentDomId } from './Header';
export { Content, domTestId };
