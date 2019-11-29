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
import { SkipToContentLink } from './SkipToContentLink';

const { Role } = A11y;
const Container = styled.div`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  grid-template-areas: '. ${GridTemplateArea.NAV_MOBILE} ${GridTemplateArea.AVATAR}';
  grid-template-columns: 1fr auto auto;
  height: ${CustomProperty.LAYOUT_HEADER_HEIGHT};
  padding: 0 ${CustomProperty.BASE_UNIT};
`;

const StyledHeader = styled.header`
  align-items: center;
  box-shadow: 0 1px 0 0 ${CustomProperty.CUSTOM_BORDER_COLOR};
  font-size: calc(${CustomProperty.BASE_UNIT} * 2);
  grid-area: ${GridTemplateArea.HEADER};
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

  const { isAuthenticated, logout, user } = useAuth();
  const email = prop('email', user);

  return (
    <StyledHeader role={Role.BANNER} title={Site.name}>
      <SkipToContentLink />
      <Container>
        <EllipsiedText>{Site.name}</EllipsiedText>
        <Navigation />
        <GreaterThanMobile>
          {isAuthenticated && (
            <ImageButton
              context={Context.LINK}
              label={t('logOut')}
              onClick={logout}
            >
              <Avatar email={email} />
            </ImageButton>
          )}
        </GreaterThanMobile>
      </Container>
    </StyledHeader>
  );
};

export { Header };
