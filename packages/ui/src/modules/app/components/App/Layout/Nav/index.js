import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Navigation } from 'types/route';
import { GridTemplateArea } from '../gridTemplateArea';
import { NavItem } from './NavItem';

const Styled = styled.nav`
  box-shadow: 1px 0 0 0 ${Color.border};
  display: grid;
  grid-area: ${GridTemplateArea.NAV};
  overflow-y: auto;
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
