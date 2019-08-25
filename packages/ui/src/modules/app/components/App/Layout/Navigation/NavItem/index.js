import { lighten, rgba } from 'polished';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Layout } from 'types/layout';
import { propTypes } from 'types/routes';

const StyledListItem = styled.li`
  align-items: center;
  display: grid;
  justify-items: center;
  width: 100%;
`;

const activeStyles = theme('mode', {
  [DisplayMode.DARK]: {
    backgroundColor: Color.white,
    color: Color.primary,
  },
  [DisplayMode.LIGHT]: {
    backgroundColor: Color.primary,
    color: Color.white,
  },
});

const hoverStyles = theme('mode', {
  [DisplayMode.DARK]: {
    backgroundColor: rgba(Color.white, 0.5),
    color: lighten(0.5, Color.primary),
  },
  [DisplayMode.LIGHT]: {
    backgroundColor: lighten(0.1, Color.primary),
    color: Color.white,
  },
});

const Styled = styled(NavLink)`
  align-items: center;
  box-shadow: 0 1px 0 0 ${Color.border};
  display: grid;
  height: ${Layout.MAIN_BREADCRUMB_HEIGHT}rem;
  padding: 0 0.5rem;
  transition: background-color 400ms ease;
  width: 100%;

  &:focus,
  &:hover {
    ${hoverStyles}
  }

  &.active {
    ${activeStyles}

    pointer-events: none;
  }
`;

const NavItem = ({ route }) => {
  const t = useTranslate({
    component: 'nav',
    namespace: 'app',
  });

  const { name, path } = route;

  return (
    <StyledListItem>
      <Styled exact to={path}>
        {t(name)}
      </Styled>
    </StyledListItem>
  );
};

NavItem.propTypes = {
  route: propTypes.isRequired,
};

export { NavItem };
