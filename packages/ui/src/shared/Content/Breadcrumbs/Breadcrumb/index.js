import { bool, string } from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { styles as themeStyles } from './theme';

const StyledListItem = styled.li`
  & + & {
    ::before {
      content: '/';
      left: calc(${CustomProperty.BASE_UNIT} * -0.25);
      position: relative;
      transform: translateX(-50%);
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  user-select: none;

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

const Breadcrumb = ({ isEnd, text, ...props }) => (
  <StyledListItem>
    {isEnd ? (
      <span>{text}</span>
    ) : (
      <StyledNavLink {...props}>{text}</StyledNavLink>
    )}
  </StyledListItem>
);

Breadcrumb.defaultProps = {
  isEnd: false,
};

Breadcrumb.propTypes = {
  isEnd: bool,
  text: string.isRequired,
};

export { Breadcrumb };
