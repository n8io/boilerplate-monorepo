import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { propTypes } from 'types/routes';

const StyledListItem = styled.li`
  align-items: center;
  display: grid;
  justify-items: center;
  width: 100%;
`;

const Styled = styled(NavLink)`
  align-items: center;
  border-bottom: 1px ${Color.border} solid;
  display: grid;
  height: ${Layout.MAIN_BREADCRUMB_HEIGHT}rem;
  padding: 0 0.5rem;
  width: 100%;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${Color.navLinkStyles}
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
