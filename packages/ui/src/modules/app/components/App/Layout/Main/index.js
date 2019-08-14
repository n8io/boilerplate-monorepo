import React from 'react';
import styled from 'styled-components/macro';
import { Router } from '../../Router';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Main';

const Main = () => {
  const Styled = styled.main`
    display: grid;
    grid-area: ${GridTemplateArea.MAIN};
    height: 100%;
  `;

  return (
    <Styled data-testid={domTestId} role="main">
      <Router />
    </Styled>
  );
};

export { domTestId, Main };
