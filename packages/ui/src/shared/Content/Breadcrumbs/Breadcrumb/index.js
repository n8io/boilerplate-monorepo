import { bool, string } from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

const domTestId = 'Breadcrumb';

const StyledLi = styled.li`
  & + & {
    ::before {
      content: '/';
      left: -0.25rem;
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
`;

const StyledEnd = styled.span`
  color: inherit;
`;

const Breadcrumb = ({ isEnd, text, ...props }) => (
  <StyledLi data-testid={domTestId}>
    {isEnd ? (
      <StyledEnd>{text}</StyledEnd>
    ) : (
      <StyledNavLink {...props}>{text}</StyledNavLink>
    )}
  </StyledLi>
);

Breadcrumb.defaultProps = {
  isEnd: false,
};

Breadcrumb.propTypes = {
  isEnd: bool,
  text: string.isRequired,
};

export { Breadcrumb, domTestId };
