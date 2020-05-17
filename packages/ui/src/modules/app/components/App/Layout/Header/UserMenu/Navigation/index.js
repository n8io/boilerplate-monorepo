import { Permission } from '@boilerplate-monorepo/common';
import { A11y } from '@boilerplate-monorepo/ui-common';
import { func } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import SideBar from 'react-sidebar';
import { Button, Context, Size } from 'shared/Button';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Route } from 'types/route';
import { NavLink } from './NavLink';
import { styles as themeStyles } from './theme';

const { Role } = A11y;
const { LINK } = Context;
const TOUCH_HANDLE_DISTANCE = 20;

const StyledNav = styled.nav`
  display: grid;
  grid-area: ${GridTemplateArea.NAV_MOBILE};
  grid-template-rows: 1fr auto;
  height: 100%;
  justify-items: end;
  overflow-y: auto;
  width: 100vw;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;

const Container = styled.div`
  align-content: start;
  display: grid;
  width: 100%;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  justify-content: center;
  white-space: nowrap;
`;

const toNavLink = (authContext, onClick) => (route) => {
  const { isAuthenticated, role } = authContext;
  const { isAuthenticationRequired, requiredPermission } = route;

  if (isAuthenticationRequired && !isAuthenticated) {
    return null;
  }

  if (
    requiredPermission &&
    !Permission.hasPermission(role, requiredPermission)
  ) {
    return null;
  }

  return (
    <NavLink
      data-testid={route.name}
      key={route.name}
      onClick={onClick}
      route={route}
    />
  );
};

const InnerSideBar = ({ onClose, t }) => {
  const commonT = useTranslate({
    component: 'common',
    namespace: 'common',
  });
  const authContext = useAuth();
  const { isAuthenticated } = authContext;
  const authRoute = isAuthenticated ? Route.LOGOUT : Route.LOGIN;
  const routes = Route.filterToNavigation(Route.values);

  const authDisplayText = isAuthenticated
    ? commonT('logout')
    : commonT('login');

  return (
    <StyledNav aria-label="sidebar" role={Role.NAVIGATION}>
      <Container>
        {routes.map(toNavLink(authContext, onClose))}
        {isAuthenticated && (
          <NavLink
            data-testid={Route.USER_ACCOUNT.name}
            onClick={onClose}
            route={Route.USER_ACCOUNT}
            title={t('account')}
          />
        )}
        <NavLink onClick={onClose} route={authRoute} title={authDisplayText} />
      </Container>
      <Button
        context={Context.LINK}
        label={t('tapHereOrSwipeToClose')}
        onClick={onClose}
        size={Size.LARGE}
      >
        <ButtonContainer>
          <MdClose />
          <span>{t('tapHereOrSwipeToClose')}</span>
        </ButtonContainer>
      </Button>
    </StyledNav>
  );
};

InnerSideBar.propTypes = {
  onClose: func.isRequired,
  t: func.isRequired,
};

const HamburgerButton = styled(Button)`
  font-size: calc(${CustomProperty.BASE_UNIT} * 1.5);
  grid-column: 2;
  margin-right: calc(${CustomProperty.BASE_UNIT} * -0.5);
`;

const styles = {
  overlay: {
    zIndex: CustomProperty.Z_INDEX_SIDE_BAR_OVERLAY,
  },
  sidebar: {
    position: 'fixed',
    zIndex: CustomProperty.Z_INDEX_SIDE_BAR,
  },
};

const Navigation = () => {
  const t = useTranslate({
    component: 'nav',
    namespace: 'app',
  });
  const [isOpen, beOpen] = useState(false);
  const onSetOpen = useCallback(beOpen, [beOpen]);
  const onClose = () => onSetOpen(false);

  return (
    <>
      <HamburgerButton
        context={LINK}
        label={t('openNavigation')}
        onClick={() => onSetOpen(true)}
      >
        <GiHamburgerMenu />
      </HamburgerButton>
      <div>
        <SideBar
          open={isOpen}
          onSetOpen={onSetOpen}
          pullRight
          sidebar={<InnerSideBar onClose={onClose} t={t} />}
          styles={styles}
          touchHandleWidth={TOUCH_HANDLE_DISTANCE}
        >
          <></>
        </SideBar>
      </div>
    </>
  );
};

export { Navigation };
