import { func } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import MediaQuery from 'react-responsive';
import SideBar from 'react-sidebar';
import { Button, Context, Size } from 'shared/Button';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { defaultBreakpoints, pxToRem } from 'styled-media-query';
import { A11y } from 'types/a11y';
import { BreakPoint } from 'types/breakpoint';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Route } from 'types/route';
import { NavLink } from './NavLink';
import { styles as themeStyles } from './theme';

const { Role } = A11y;
const { LINK } = Context;
const routes = Route.navigation(Route.values);
const { [BreakPoint.MOBILE]: breakpoint } = pxToRem(defaultBreakpoints, 16);
const TOUCH_HANDLE_DISTANCE = 15;

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
`;

const InnerSideBar = ({ onClose, t }) => (
  <StyledNav aria-label="sidebar" role={Role.NAVIGATION}>
    <Container>
      {routes.map(route => (
        <NavLink key={route.name} onClick={onClose} route={route} />
      ))}
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

InnerSideBar.propTypes = {
  onClose: func.isRequired,
  t: func.isRequired,
};

const OpenNavButton = styled(Button)`
  font-size: calc(var(--layout-base-unit) * 1.5);
`;

const styles = {
  overlay: {
    zIndex: 'var(--z-index-side-bar-overlay)',
  },
  sidebar: {
    position: 'fixed',
    zIndex: 'var(--z-index-side-bar)',
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
    <MediaQuery maxWidth={breakpoint}>
      <OpenNavButton
        context={LINK}
        label={t('openNavigation')}
        onClick={() => onSetOpen(true)}
      >
        <GiHamburgerMenu />
      </OpenNavButton>
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
    </MediaQuery>
  );
};

export { Navigation };
