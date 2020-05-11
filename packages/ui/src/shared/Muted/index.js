import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { styles as themeStyles } from './theme';

const Container = styled.span`
  ${themeStyles}
`;

const Muted = (props) => <Container {...props} />;

Muted.propTypes = {
  children: node.isRequired,
};

export { Muted };
