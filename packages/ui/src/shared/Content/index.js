import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Body } from './Body';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = ({ children }) => <Container>{children}</Container>;

Content.propTypes = {
  children: node.isRequired,
};

export { Body, Breadcrumb, Breadcrumbs, Content, Header };
