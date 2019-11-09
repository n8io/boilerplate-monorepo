import React from 'react';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { GridTemplateArea } from '../gridTemplateArea';
import { NavItem } from './NavItem';
import { Navigation } from './navigation';

const Styled = styled.nav`
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

const NavList = styled.ul`
  align-items: start;
  display: flex;
  flex-direction: column;
`;

const Nav = () => (
  <Styled role="navigation">
    <NavList>
      {Navigation.map(route => (
        <NavItem key={route.name} route={route} />
      ))}
    </NavList>
  </Styled>
);

export { Nav };
