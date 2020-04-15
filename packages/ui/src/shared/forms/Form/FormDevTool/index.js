import { config } from 'config';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';
import styled from 'styled-components';

const { isDebug } = config;

const Container = styled.div`
  ${({ isLoaded }) => `display: ${isLoaded ? 'block' : 'none'}`}
`;

const FormDevTool = () => {
  const { control } = useFormContext();
  const [isLoaded, beLoaded] = useState();

  useEffect(() => {
    const timer = setTimeout(() => beLoaded(true), 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isDebug) return null;

  return (
    <Container isLoaded={isLoaded}>
      <DevTool control={control} visible={false} />
    </Container>
  );
};

export { FormDevTool };
