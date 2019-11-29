import { func } from 'prop-types';
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Route } from 'types/route';

const StyledNavLink = styled(RouterNavLink)`
  align-items: center;
  border-bottom: 1px ${CustomProperty.CUSTOM_BORDER_COLOR} solid;
  display: grid;
  font-size: calc(${CustomProperty.BASE_UNIT} * 1.5);
  grid-column-gap: 0.25rem;
  grid-template-columns: auto 1fr;
  height: calc(${CustomProperty.LAYOUT_MAIN_BREADCRUMB_HEIGHT} * 2);
  justify-content: start;
  padding: 0 calc(${CustomProperty.BASE_UNIT} * 1);
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
