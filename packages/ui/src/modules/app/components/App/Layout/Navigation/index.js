import React from 'react';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { A11y } from 'types/a11y';
import { GridTemplateArea } from '../gridTemplateArea';
import { NavItem } from './NavItem';
import { Navigation } from './navigation';

const { Role } = A11y;

const StyledNav = styled.nav`
  align-content: start;
  box-shadow: 1px 0 0 0 var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.NAV};
  overflow-y: auto;
  width: var(--layout-nav-width);

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${media.lessThan('medium')`
    width: 0;
  `}
`;

const Nav = () => (
  <StyledNav role={Role.NAVIGATION}>
    {Navigation.map(route => (
      <NavItem key={route.name} route={route} />
    ))}
  </StyledNav>
);

export { Nav };
