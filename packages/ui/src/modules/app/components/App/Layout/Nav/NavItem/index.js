import { lighten } from 'polished';
import { path as rPath, pipe } from 'ramda';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Layout } from 'types/layout';
import { propTypes } from 'types/route';

const StyledListItem = styled.li`
  align-items: center;
  display: grid;
  justify-items: center;
  width: 100%;
`;

const themeConfig = {
  [DisplayMode.DARK]: {
    backgroundColor: Color.white,
    color: Color.primary,
  },
  [DisplayMode.LIGHT]: {
    backgroundColor: Color.primary,
    color: Color.white,
  },
};

const activeStyles = theme('mode', themeConfig);

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
    background-color: ${pipe(
      rPath(['theme', 'mode']),
      mode => {
        return mode === DisplayMode.DARK
          ? Color.primary
          : lighten(0.4, Color.primary);
      }
    )};
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
