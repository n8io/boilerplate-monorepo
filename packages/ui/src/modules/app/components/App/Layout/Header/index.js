import { A11y } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import styled from 'styled-components/macro';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Site } from 'types/site';
import { Navigation } from './Navigation';

const { Role } = A11y;
const Container = styled.div`
  align-items: center;
  box-shadow: 0 1px 0 0 var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.HEADER};
  grid-auto-flow: column;
  grid-template-areas: '. ${GridTemplateArea.NAV_MOBILE} .';
  grid-template-columns: 1fr auto 0;
  padding: 0 var(--layout-base-unit);
`;

const StyledHeader = styled(EllipsiedText)`
  align-items: center;
  font-size: calc(var(--layout-base-unit) * 2);
  height: var(--layout-header-height);
  justify-content: space-between;
  margin-bottom: 0;
  width: 100%;
`;

const Header = () => (
  <Container>
    <StyledHeader as="header" role={Role.BANNER} title={Site.name}>
      {Site.name}
    </StyledHeader>
    <Navigation />
  </Container>
);

export { Header };
