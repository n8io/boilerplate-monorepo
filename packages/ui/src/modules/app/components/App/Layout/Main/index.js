import React from 'react';
import styled from 'styled-components/macro';
import { Router } from '../../Router';
import { GridTemplateArea } from '../gridTemplateArea';

const { MAIN } = GridTemplateArea;

const domTestId = 'Main';
const domId = 'main-content';

const Main = () => {
  const Styled = styled.main`
    display: grid;
    grid-area: ${MAIN};
  `;

  return (
    <Styled data-testid={domTestId} id={domId} role="main">
      <Router />
    </Styled>
  );
};

export { domId, domTestId, Main };
