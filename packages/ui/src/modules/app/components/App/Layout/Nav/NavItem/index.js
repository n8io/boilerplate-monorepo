import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { propTypes } from 'types/route';

const listItemPadding = 0.125;

const StyledListItem = styled.li`
  align-items: center;
  display: grid;
  justify-items: center;
  padding: ${listItemPadding}rem;
  width: 100%;
`;

const Styled = styled(NavLink)`
  align-items: center;
  display: grid;
  height: calc(${Layout.MAIN_HEADER_HEIGHT}rem - ${listItemPadding * 2}rem);
  padding: 0 0.5rem;
  width: 100%;

  &.active {
    background-color: ${Color.black};
    color: ${Color.white};
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
