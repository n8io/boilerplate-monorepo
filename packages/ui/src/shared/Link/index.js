import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { styles as themeStyles } from './theme';

const StyledLink = styled(RouterLink)`
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

const Link = (props) => <StyledLink {...props} />;

export { Link };
