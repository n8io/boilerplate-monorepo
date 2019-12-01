import React from 'react';
import { useAuth } from 'shared/useAuth';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Route } from 'types/route';
import { NavLink } from '../NavLink';
import { styles as themeStyles } from './theme';

const StyledNavLink = styled(NavLink)`
  border: none;
  border-top: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  bottom: 0;
  grid-area: ${GridTemplateArea.NAV_AUTH};
  height: ${CustomProperty.LAYOUT_MAIN_FOOTER_HEIGHT};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;

const AuthButton = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const onClickProxy = isAuthenticated ? logout : login;
  const route = isAuthenticated ? Route.LOGOUT : Route.LOGIN;

  return <StyledNavLink onClick={onClickProxy} route={route} />;
};

export { AuthButton };
