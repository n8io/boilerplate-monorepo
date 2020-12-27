import { Color } from '@boilerplate-monorepo/common';
import React from 'react';
import { Loader } from 'shared/Loader';
import styled from 'styled-components';

const Container = styled.div`
  --color-primary: ${Color.PRIMARY};

  bottom: 0;
  display: grid;
  left: 0;
  place-content: center;
  position: fixed;
  right: 0;
  top: 0;
`;

const LoaderContainer = styled.div`
  display: inline;
  height: 2rem;
  position: relative;
`;

const Message = styled.div`
  display: grid;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
`;

const ColdStart = () => {
  return (
    <Container>
      <Message>Starting up...</Message>
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </Container>
  );
};

export { ColdStart };
