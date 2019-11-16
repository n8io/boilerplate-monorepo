import { node, string } from 'prop-types';
import React from 'react';
import { Body } from './Body';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';
import { domId as mainContentDomId, Header } from './Header';

const domTestId = 'Content';

const Content = ({ children, 'data-testid': dataTestId }) => (
  <div data-testid={dataTestId}>{children}</div>
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
