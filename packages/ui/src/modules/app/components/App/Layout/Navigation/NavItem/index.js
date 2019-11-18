import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Route } from 'types/route';
import { variables as themeVariables } from './theme';

const StyledNavLink = styled(NavLink)`
  ${themeVariables}

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  align-items: center;
  border-bottom: 1px var(--border-color) solid;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 0.25rem;
  height: calc(var(--layout-main-breadcrumb-height) + 1px);
  justify-content: start;
  padding: 0 calc(var(--layout-base-unit) * 0.5);
  text-overflow: hidden;
  white-space: nowrap;
  width: 100%;

  &:focus:not([aria-current='page']),
  &:hover:not([aria-current='page']) {
    background-color: var(--nav-link-background-color-hover);
    color: var(--nav-link-color-hover);
  }

  &[aria-current='page'] {
    background-color: var(--nav-link-color);
    color: var(--nav-link-background-color);
    cursor: default;

    &:focus,
    &:hover {
      background-color: var(--nav-link-color);
      color: var(--nav-link-background-color);
    }
  }
`;

const NavItem = ({ route }) => {
  const t = useTranslate({
    component: 'nav',
    namespace: 'app',
  });

  const { icon: Icon, name, path } = route;

  return (
    <StyledNavLink exact to={path}>
      {Icon && <Icon />}
      {t(name)}
    </StyledNavLink>
  );
};

NavItem.propTypes = {
  route: Route.propTypes.isRequired,
};

export { NavItem };
