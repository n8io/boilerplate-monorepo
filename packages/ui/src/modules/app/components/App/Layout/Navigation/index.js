import { A11y, SkipToDestination } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { routes } from '../../../../routes';
import { AuthButton } from './AuthButton';
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

const toNavLink = (route, index) => {
  const id = index === 0 ? SkipToDestination.NAVIGATION : undefined;

  return <NavLink id={id} key={route.name} route={route} />;
};

const NavLinks = styled.div`
  align-content: start;
  display: grid;
  grid-area: ${GridTemplateArea.NAV_LINK};
`;

const Navigation = () => (
  <Container role={Role.NAVIGATION}>
    <NavLinks>{routes.map(toNavLink)}</NavLinks>
    <AuthButton />
  </Container>
);

export { Navigation };
