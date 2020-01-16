import { A11y, Site } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { SkipToContentLink } from './SkipToContentLink';
import { UserMenu } from './UserMenu';

const { Role } = A11y;
const Container = styled.div`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  grid-template-areas: '. ${GridTemplateArea.NAV_MOBILE} ${GridTemplateArea.USER_MENU}';
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

const Header = () => (
  <StyledHeader role={Role.BANNER} title={Site.name}>
    <SkipToContentLink />
    <Container>
      <EllipsiedText>{Site.name}</EllipsiedText>
      <UserMenu />
    </Container>
  </StyledHeader>
);

export { Header };
