import { node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Body } from './Body';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';
import { domId as mainContentDomId, Header } from './Header';

const domTestId = 'Content';

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

export {
  Body,
  Breadcrumb,
  Breadcrumbs,
  Content,
  Header,
  domTestId,
  mainContentDomId,
};
