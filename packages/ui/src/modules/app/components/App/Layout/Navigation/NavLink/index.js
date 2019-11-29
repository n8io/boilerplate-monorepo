import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import MediaQuery from 'react-responsive';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { defaultBreakpoints, pxToRem } from 'styled-media-query';
import { CustomProperty } from 'types/customProperties';
import { Route } from 'types/route';
import { variables as themeVariables } from './theme';

const StyledNavLink = styled(RouterNavLink)`
  ${themeVariables}

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  align-items: center;
  border-bottom: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  color: ${CustomProperty.NAV_LINK_COLOR_HOVER};
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 0.25rem;
  height: calc(${CustomProperty.LAYOUT_MAIN_BREADCRUMB_HEIGHT} + 1px);
  justify-content: start;
  padding: 0 calc(${CustomProperty.BASE_UNIT} * 0.5);
  width: 100%;

  &:focus:not([aria-current='page']),
  &:hover:not([aria-current='page']) {
    background-color: ${CustomProperty.NAV_LINK_BACKGROUND_COLOR_HOVER};
    color: ${CustomProperty.NAV_LINK_COLOR_HOVER};
  }

  &[aria-current='page'] {
    background-color: ${CustomProperty.NAV_LINK_COLOR};
    color: ${CustomProperty.NAV_LINK_BACKGROUND_COLOR};
    cursor: default;
    pointer-events: none;

    &:focus,
    &:hover {
      background-color: ${CustomProperty.NAV_LINK_COLOR};
      color: ${CustomProperty.NAV_LINK_BACKGROUND_COLOR};
      pointer-events: none;
    }
  }
`;

const { [Breakpoint.TABLET]: breakpoint } = pxToRem(defaultBreakpoints, 16);

const NavLink = ({ route, ...props }) => {
  const t = useTranslate({
    component: 'nav.links',
    namespace: 'app',
  });

  const { icon: Icon, name, path } = route;

  return (
    <StyledNavLink exact title={t(name)} to={path} {...props}>
      {Icon && <Icon />}
      <MediaQuery minWidth={breakpoint}>
        <EllipsiedText>{t(name)}</EllipsiedText>
      </MediaQuery>
    </StyledNavLink>
  );
};

NavLink.propTypes = {
  route: Route.propTypes.isRequired,
};

export { NavLink };
