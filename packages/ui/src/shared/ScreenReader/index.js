import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const ScreenReader = ({ children }) => <Container>{children}</Container>;

ScreenReader.propTypes = {
  children: node.isRequired,
};

export { ScreenReader };
