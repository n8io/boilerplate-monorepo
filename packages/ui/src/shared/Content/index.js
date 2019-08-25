import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { GridTemplateArea } from './gridTemplateArea';

const domTestId = 'Content';

const Styled = styled.div`
  display: grid;
  grid-template-areas: 
    '${GridTemplateArea.BREADCRUMBS}' 
    '${GridTemplateArea.HEADER}' 
    '${GridTemplateArea.BODY}' 
    '${GridTemplateArea.FOOTER}';
`;

const Content = ({ children }) => (
  <Styled data-testid={domTestId}>{children}</Styled>
);

Content.propTypes = {
  children: node.isRequired,
};

export { Body } from './Body';
export { Breadcrumb, Breadcrumbs } from './Breadcrumbs';
export { Footer } from './Footer';
export { GridTemplateArea } from './gridTemplateArea';
export { Header, domId as mainContentDomId } from './Header';
export { Content, domTestId };
