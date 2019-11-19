import { node } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import MediaQuery from 'react-responsive';
import SideBar from 'react-sidebar';
import { Button, Context } from 'shared/Button';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { defaultBreakpoints, pxToRem } from 'styled-media-query';
import { A11y } from 'types/a11y';
import { BreakPoint } from 'types/breakpoint';
import { GridTemplateArea } from 'types/gridTemplateArea';

const { Role } = A11y;
const { LINK } = Context;
const { [BreakPoint.MOBILE]: breakpoint } = pxToRem(defaultBreakpoints, 16);

const StyledNav = styled.nav`
  align-items: center;
  box-shadow: 1px 0 0 0 var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.NAV_MOBILE};
  justify-items: end;
`;

const Menu = ({ children }) => (
  <StyledNav role={Role.NAVIGATION}>{children}</StyledNav>
);

Menu.propTypes = {
  children: node.isRequired,
};

const styles = {
  overlay: {
    zIndex: 'var(--z-index-side-bar-overlay)',
  },
  sidebar: {
    backgroundColor: 'var(--grayscale-white)',
    position: 'fixed',
    width: '75vw',
    zIndex: 'var(--z-index-side-bar)',
  },
};

const Navigation = ({ children }) => {
  const t = useTranslate({
    component: 'nav',
    namespace: 'app',
  });
  const [isOpen, beOpen] = useState(false);
  const onSetOpen = useCallback(beOpen, [beOpen]);

  return (
    <MediaQuery maxWidth={breakpoint}>
      <Button
        context={LINK}
        label={t('openNavigation')}
        onClick={() => onSetOpen(true)}
      >
        <GiHamburgerMenu />
      </Button>
      <div>
        <SideBar
          sidebar={<Menu>{children}</Menu>}
          open={isOpen}
          onSetOpen={onSetOpen}
          pullRight
          styles={styles}
        >
          {' '}
        </SideBar>
      </div>
    </MediaQuery>
  );
};

Navigation.propTypes = {
  children: node.isRequired,
};

export { Navigation };
