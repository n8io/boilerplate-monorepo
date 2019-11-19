import React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components/macro';
import { defaultBreakpoints, pxToRem } from 'styled-media-query';
import { A11y } from 'types/a11y';
import { BreakPoint } from 'types/breakpoint';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { routes } from '../../routes';
import { NavLink } from './NavLink';

const { Role } = A11y;
const { [BreakPoint.MOBILE]: breakpoint } = pxToRem(defaultBreakpoints, 16);

const StyledNav = styled.nav`
  align-content: start;
  box-shadow: 1px 0 0 0 var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.NAV};
  overflow-y: auto;
  width: max-content;
`;

const Navigation = () => (
  <MediaQuery minWidth={breakpoint}>
    <StyledNav role={Role.NAVIGATION}>
      {routes.map(route => (
        <NavLink key={route.name} route={route} />
      ))}
    </StyledNav>
  </MediaQuery>
);

export { Navigation };
