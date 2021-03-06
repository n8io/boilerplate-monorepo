import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Tablet } from 'shared/Breakpoints';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled, { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Route } from 'types/route';
import { styles as themeStyles } from '../AuthLink/theme';

const sharedStyles = css`
  ${themeStyles}

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  align-items: center;
  border-bottom: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  cursor: pointer;
  display: grid;
  /* grid-area: ${GridTemplateArea.NAV_LINK}; */
  grid-auto-flow: column;
  grid-column-gap: 0.25rem;
  height: calc(${CustomProperty.LAYOUT_MAIN_BREADCRUMB_HEIGHT} + 1px);
  justify-content: start;
  padding: 0 calc(${CustomProperty.BASE_UNIT} * 0.5);
  user-select: none;
  width: 100%;
`;

const StyledNavLink = styled(RouterNavLink)`
  ${sharedStyles}

  &[aria-current='page'] {
    cursor: default;
    pointer-events: none;
  }
`;

const NavLink = ({ route, ...props }) => {
  const t = useTranslate({
    component: 'nav.links',
    namespace: 'app',
  });

  const { icon: Icon, name, path } = route;

  return (
    <StyledNavLink exact title={t(name)} to={path} {...props}>
      {Icon && <Icon />}
      <Tablet>
        <EllipsiedText>{t(name)}</EllipsiedText>
      </Tablet>
    </StyledNavLink>
  );
};

NavLink.propTypes = {
  route: Route.propTypes.isRequired,
};

export { NavLink };
