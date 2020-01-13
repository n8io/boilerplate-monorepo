import { func, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Route } from 'types/route';
import { styles as themeStyles } from './theme';

const StyledLink = styled(Link)`
  align-items: center;
  border-bottom: 1px ${CustomProperty.CUSTOM_BORDER_COLOR} solid;
  display: grid;
  font-size: calc(${CustomProperty.BASE_UNIT} * 1.5);
  grid-column-gap: 0.25rem;
  grid-template-columns: auto 1fr;
  height: calc(${CustomProperty.LAYOUT_MAIN_BREADCRUMB_HEIGHT} * 2);
  justify-content: start;
  padding: 0 calc(${CustomProperty.BASE_UNIT} * 1);
  user-select: none;
  width: 100%;

  &[aria-current='page'] {
    cursor: default;
    pointer-events: none;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;

const NavLink = ({ onClick, route, title, ...props }) => {
  const t = useTranslate({
    component: 'nav.links',
    namespace: 'app',
  });

  const { icon: Icon, name, path } = route;
  const text = title || t(name);

  return (
    <StyledLink {...props} onClick={onClick} title={text} to={path}>
      {Icon && <Icon />}
      <EllipsiedText>{text}</EllipsiedText>
    </StyledLink>
  );
};

NavLink.defaultProps = {
  title: undefined,
};

NavLink.propTypes = {
  onClick: func.isRequired,
  route: Route.propTypes.isRequired,
  title: string,
};

export { NavLink };
