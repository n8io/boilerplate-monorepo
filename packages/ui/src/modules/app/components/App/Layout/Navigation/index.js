import React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components/macro';
import { defaultBreakpoints, pxToRem } from 'styled-media-query';
import { A11y } from 'types/a11y';
import { BreakPoint } from 'types/breakpoint';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { SkipToDestination } from 'types/skipToDestination';
import { routes } from '../../routes';
import { NavLink } from './NavLink';

const { Role } = A11y;
const { [BreakPoint.MOBILE]: breakpoint } = pxToRem(defaultBreakpoints, 16);

const Container = styled.nav`
  align-content: start;
  box-shadow: 1px 0 0 0 var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.NAV};
  overflow-y: auto;
  width: max-content;
`;

const toNavLink = (route, index) => {
  const id = index === 0 ? SkipToDestination.NAVIGATION : undefined;

  return <NavLink id={id} key={route.name} route={route} />;
};

const Navigation = () => (
  <MediaQuery minWidth={breakpoint}>
    <Container role={Role.NAVIGATION}>{routes.map(toNavLink)}</Container>
  </MediaQuery>
);

export { Navigation };
