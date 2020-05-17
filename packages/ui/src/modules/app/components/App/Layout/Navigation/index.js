import { Permission } from '@boilerplate-monorepo/common';
import { A11y, SkipToDestination } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { useAuth } from 'shared/useAuth';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { navRoutes } from '../../../../routes';
import { AuthLink } from './AuthLink';
import { NavLink } from './NavLink';

const { Role } = A11y;

const Container = styled.nav`
  box-shadow: 1px 0 0 0 ${CustomProperty.CUSTOM_BORDER_COLOR};
  display: grid;
  grid-area: ${GridTemplateArea.NAV};
  grid-template-areas: '${GridTemplateArea.NAV_LINK}' '${GridTemplateArea.NAV_AUTH}';
  grid-template-rows: 1fr auto;
  overflow-y: auto;
  position: relative;
  width: max-content;
`;

// eslint-disable-next-line complexity
const toNavLink = (authContext) => (route, index) => {
  const id = index === 0 ? SkipToDestination.NAVIGATION : undefined;
  const { isAuthenticated, role } = authContext;
  const { isAuthenticationRequired, requiredPermission } = route;

  if (isAuthenticationRequired && !isAuthenticated) {
    return null;
  }

  if (
    requiredPermission &&
    !Permission.hasPermission(role, requiredPermission)
  ) {
    return null;
  }

  return (
    <NavLink data-testid={route.name} id={id} key={route.name} route={route} />
  );
};

const NavLinks = styled.div`
  align-content: start;
  display: grid;
  grid-area: ${GridTemplateArea.NAV_LINK};
`;

const Navigation = () => {
  const authContext = useAuth();

  return (
    <Container role={Role.NAVIGATION}>
      <NavLinks>{navRoutes.map(toNavLink(authContext))}</NavLinks>
      <AuthLink />
    </Container>
  );
};

export { Navigation };
