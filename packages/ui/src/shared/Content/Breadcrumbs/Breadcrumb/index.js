import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const Styled = styled.li`
  color: inherit;
`;

const Breadcrumb = ({ children }) => <Styled>{children}</Styled>;

Breadcrumb.propTypes = {
  children: node.isRequired,
};

export { Breadcrumb };
