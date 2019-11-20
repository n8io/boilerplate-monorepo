import { func } from 'prop-types';
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Route } from 'types/route';
// import { variables as themeVariables } from './theme';

const StyledNavLink = styled(RouterNavLink)`
  align-items: center;
  border-bottom: 1px var(--border-color) solid;
  display: grid;
  font-size: calc(var(--layout-base-unit) * 3);
  grid-column-gap: 0.25rem;
  grid-template-columns: auto 1fr;
  height: calc(var(--layout-main-breadcrumb-height) * 2);
  justify-content: start;
  padding: 0 calc(var(--layout-base-unit) * 1);
  width: 100%;
`;

const NavLink = ({ onClick, route }) => {
  const t = useTranslate({
    component: 'nav.links',
    namespace: 'app',
  });

  const { icon: Icon, name, path } = route;

  return (
    <StyledNavLink exact onClick={onClick} title={t(name)} to={path}>
      {Icon && <Icon />}
      <EllipsiedText>{t(name)}</EllipsiedText>
    </StyledNavLink>
  );
};

NavLink.propTypes = {
  onClick: func.isRequired,
  route: Route.propTypes.isRequired,
};

export { NavLink };
