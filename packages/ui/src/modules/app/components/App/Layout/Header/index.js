import { A11y, Site } from '@boilerplate-monorepo/ui-common';
import { prop } from 'ramda';
import React from 'react';
import { GreaterThanMobile } from 'shared/Breakpoints';
import { Button, Context } from 'shared/Button';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Avatar } from './Avatar';
import { Navigation } from './Navigation';

const { Role } = A11y;
const Container = styled.div`
  align-items: center;
  box-shadow: 0 1px 0 0 ${CustomProperty.CUSTOM_BORDER_COLOR};
  display: grid;
  grid-area: ${GridTemplateArea.HEADER};
  grid-auto-flow: column;
  grid-template-areas: '. ${GridTemplateArea.NAV_MOBILE} ${GridTemplateArea.AVATAR}';
  grid-template-columns: 1fr auto auto;
  padding: 0 ${CustomProperty.BASE_UNIT};
`;

const StyledHeader = styled(EllipsiedText)`
  align-items: center;
  font-size: calc(${CustomProperty.BASE_UNIT} * 2);
  height: ${CustomProperty.LAYOUT_HEADER_HEIGHT};
  justify-content: space-between;
  margin-bottom: 0;
  width: 100%;
`;

const ImageButton = styled(Button)`
  padding: calc(${CustomProperty.BASE_UNIT} * 0.25);
`;

const Header = () => {
  const t = useTranslate({
    component: 'common',
    namespace: 'common',
  });

  const { isAuthenticated, login, logout, user } = useAuth();
  const email = prop('email', user);

  return (
    <Container>
      <StyledHeader as="header" role={Role.BANNER} title={Site.name}>
        {Site.name}
      </StyledHeader>
      <GreaterThanMobile>
        {isAuthenticated ? (
          <ImageButton
            context={Context.LINK}
            label={t('logOut')}
            onClick={logout}
          >
            <Avatar email={email} />
          </ImageButton>
        ) : (
          <Button context={Context.LINK} onClick={login} text={t('logIn')} />
        )}
      </GreaterThanMobile>
      <Navigation />
    </Container>
  );
};

export { Header };
