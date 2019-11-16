import { node, string } from 'prop-types';
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
`;

const Content = ({ children, 'data-testid': dataTestId }) => (
  <Styled data-testid={dataTestId}>{children}</Styled>
);

Content.defaultProps = {
  'data-testid': domTestId,
};

Content.propTypes = {
  children: node.isRequired,
  'data-testid': string,
};

export { Body } from './Body';
export { Breadcrumb, Breadcrumbs } from './Breadcrumbs';
export { Header, domId as mainContentDomId } from './Header';
export { Content, GridTemplateArea, domTestId };
