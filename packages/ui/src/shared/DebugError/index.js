import { string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';

const Container = styled.pre`
  background-color: ${CustomProperty.COLOR_ERROR_LIGHT};
  border-radius: calc(${CustomProperty.BASE_UNIT} * 0.25);
  color: ${CustomProperty.COLOR_ERROR};
  font-family: monospace;
  padding: calc(${CustomProperty.BASE_UNIT} * 0.5);
  white-space: normal;

  strong {
    font-weight: bold;
  }
`;

const DebugError = ({ message }) => <Container>{message}</Container>;

DebugError.propTypes = {
  message: string.isRequired,
};

export { DebugError };
