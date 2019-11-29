import { A11y, SkipToDestination } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { GreaterThanMobile } from 'shared/Breakpoints';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { routes } from '../../routes';
import { NavLink } from './NavLink';

const { Role } = A11y;

const Container = styled.nav`
  align-content: start;
  box-shadow: 1px 0 0 0 ${CustomProperty.CUSTOM_BORDER_COLOR};
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
  <GreaterThanMobile>
    <Container role={Role.NAVIGATION}>{routes.map(toNavLink)}</Container>
  </GreaterThanMobile>
);

export { Navigation };
