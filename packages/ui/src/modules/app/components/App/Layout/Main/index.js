import { A11y } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { NotificationManager } from 'shared/NotificationContainer';
import styled from 'styled-components/macro';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Router } from '../../Router';

const { Role } = A11y;

const Container = styled.main`
  display: grid;
  grid-area: ${GridTemplateArea.MAIN};
  grid-template-rows: auto 1fr;
  height: 100%;
`;

const Main = () => (
  <Container role={Role.MAIN}>
    <NotificationManager />
    <Router />
  </Container>
);

export { Main };
