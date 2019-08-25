import { lighten } from 'polished';
import { bool, string } from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';

const activeLinkStyles = theme('mode', {
  [DisplayMode.DARK]: {
    color: lighten(0.1, Color.muted),
  },
  [DisplayMode.LIGHT]: {
    color: Color.muted,
  },
});

const dividerStyles = theme('mode', {
  [DisplayMode.DARK]: {
    color: lighten(0.1, Color.muted),
  },
  [DisplayMode.LIGHT]: {
    color: Color.muted,
  },
});

const StyledLi = styled.li`
  & + & {
    ::before {
      content: '/';
      left: -0.25rem;
      position: relative;
      transform: translateX(-50%);

      /* stylelint-disable-next-line order/properties-alphabetical-order */
      ${dividerStyles}
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

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${activeLinkStyles}

    &:focus, &:hover {
      text-decoration: none;
    }
  }
`;

const StyledEnd = styled.span`
  ${activeLinkStyles}
`;

const Breadcrumb = ({ isEnd, text, ...props }) => (
  <StyledLi>
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

export { Breadcrumb };
