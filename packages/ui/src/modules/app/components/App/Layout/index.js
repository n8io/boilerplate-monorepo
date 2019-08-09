import React from 'react';
import styled from 'styled-components/macro';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

const domTestId = 'Layout';

const Styled = styled.div`
  border: 0;
  box-sizing: border-box;
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
`;

const Layout = () => (
  <Styled data-testid={domTestId}>
    <Header />
    <Main />
    <Footer />
  </Styled>
);

export { domTestId, Layout };
