import { string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { styles as themeStyles } from './theme';

const StyledError = styled.div`
  margin-top: calc(0.25 * ${CustomProperty.BASE_UNIT});

  ${themeStyles}
`;

const ValidationError = ({ message }) =>
  message ? (
    <StyledError aria-live="polite" role="alert">
      {message}
    </StyledError>
  ) : null;

ValidationError.defaultProps = {
  message: undefined,
};

ValidationError.propTypes = {
  message: string,
};

export { ValidationError };
