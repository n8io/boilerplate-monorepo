import { node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { styles as themeStyles } from './theme';

const StyledLink = styled.a`
  user-select: none;
  width: fit-content;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  &.active {
    pointer-events: none;

    &:focus,
    &:hover {
      text-decoration: none;
    }
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;

const ExternalLink = (props) => (
  <StyledLink {...props} rel="noopener noreferrer" target="_external" />
);

ExternalLink.propTypes = {
  children: node.isRequired,
  href: string.isRequired,
};

export { ExternalLink };
