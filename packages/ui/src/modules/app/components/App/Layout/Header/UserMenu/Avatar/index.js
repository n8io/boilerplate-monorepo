import { url } from 'gravatar';
import { bool, func, object } from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu';
import { Context, Size, styles as buttonStyles } from 'shared/Button';
import { Loader } from 'shared/Loader';
import { Muted } from 'shared/Muted';
import { useUserSelf } from 'shared/graphql';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Route } from 'types/route';
import * as ThemeStyles from './theme';

const Container = styled.div`
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr auto;
`;

const StyledDisclosure = styled(MenuButton)`
  ${buttonStyles}
`;

const StyledMenu = styled(Menu)`
  background-color: ${CustomProperty.GRAYSCALE_WHITE};
  border: 1px solid ${CustomProperty.COLOR_PRIMARY};
  z-index: ${CustomProperty.Z_INDEX_LANGUAGE_TOGGLE};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${ThemeStyles.menu}
`;

const StyledMenuItem = styled(MenuItem)`
  align-items: center;
  background-color: ${CustomProperty.GRAYSCALE_WHITE};
  color: ${CustomProperty.COLOR_PRIMARY};
  display: flex;
  font-size: ${CustomProperty.BASE_UNIT};
  justify-items: start;
  padding: calc(${CustomProperty.BASE_UNIT} * 0.5);
  white-space: nowrap;
  width: 100%;

  &[tabindex='0'] {
    background-color: ${CustomProperty.COLOR_PRIMARY};
    color: ${CustomProperty.GRAYSCALE_WHITE};
    cursor: pointer;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${ThemeStyles.menuItem}
`;

const Image = styled.img`
  border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-radius: 100%;
`;

const StyledMuted = styled(Muted)`
  font-size: ${CustomProperty.BASE_UNIT};
`;

const MenuItemLabel = styled.span`
  margin-left: 0.5rem;
`;

const MeHandle = ({ data, loading, t }) => {
  if (loading) return <Loader />;

  const { email, givenName } = data;
  const hash = url(email, { d: 'identicon', r: 'G', s: 30 });

  return (
    <>
      <StyledMuted>{givenName}</StyledMuted>
      <Image alt={t('avatarForEmail', { email })} src={hash} />
    </>
  );
};

MeHandle.defaultProps = {
  data: undefined,
};

MeHandle.propTypes = {
  data: object,
  loading: bool.isRequired,
  t: func.isRequired,
};

// eslint-disable-next-line max-statements
const Avatar = () => {
  const t = useTranslate({
    component: 'avatar',
    namespace: 'app',
  });
  const history = useHistory();
  const { logout } = useAuth();
  const menu = useMenuState({ gutter: 4, placement: 'bottom-end' });
  const { data, error, loading } = useUserSelf();

  const onLogoutClick = () => {
    logout();
    menu.hide();
    history.push(Route.LOGIN.path);
  };

  const onSettingsClick = () => {
    menu.hide();
    history.push(Route.USER_ACCOUNT.path);
  };

  if (error) {
    return null;
  }

  const { icon: LogoutIcon } = Route.LOGOUT;
  const { icon: ProfileIcon } = Route.USER_ACCOUNT;

  return (
    <>
      <StyledDisclosure
        {...menu}
        aria-label="user menu"
        context={Context.LINK}
        size={Size.SMALL}
      >
        <Container>
          <MeHandle data={data} loading={loading} t={t} />
        </Container>
      </StyledDisclosure>
      <StyledMenu
        {...menu}
        aria-label="user menu"
        aria-modal={undefined} // Fixes a11y violation (invalid aria attribute on role="menu")
      >
        <StyledMenuItem
          {...menu}
          aria-label={t('account')}
          onClick={onSettingsClick}
        >
          <ProfileIcon />
          <MenuItemLabel>{t('account')}</MenuItemLabel>
        </StyledMenuItem>
        <StyledMenuItem
          {...menu}
          aria-label={t('logout')}
          onClick={onLogoutClick}
        >
          <LogoutIcon />
          <MenuItemLabel>{t('logout')}</MenuItemLabel>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export { Avatar };
