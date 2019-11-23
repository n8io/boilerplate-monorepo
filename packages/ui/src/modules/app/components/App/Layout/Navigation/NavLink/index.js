import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import MediaQuery from 'react-responsive';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { defaultBreakpoints, pxToRem } from 'styled-media-query';
import { Route } from 'types/route';
import { variables as themeVariables } from './theme';

const StyledNavLink = styled(RouterNavLink)`
  ${themeVariables}

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  align-items: center;
  border-bottom: 1px var(--border-color) solid;
  display: grid;
  grid-column-gap: 0.25rem;
  grid-template-columns: auto 1fr;
  height: calc(var(--layout-main-breadcrumb-height) + 1px);
  justify-content: start;
  padding: 0 calc(var(--layout-base-unit) * 0.5);
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
