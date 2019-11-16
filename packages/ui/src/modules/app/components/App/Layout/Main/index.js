import React from 'react';
import styled from 'styled-components/macro';
import { A11y } from 'types/a11y';
import { Router } from '../../Router';
import { GridTemplateArea } from '../gridTemplateArea';

const { Role } = A11y;
const domTestId = 'Main';

const Main = () => {
  const Styled = styled.main`
    display: grid;
    grid-area: ${GridTemplateArea.MAIN};
    height: 100%;
  `;

  return (
    <Styled data-testid={domTestId} role={Role.MAIN}>
      <Router />
    </Styled>
  );
};

export { domTestId, Main };
