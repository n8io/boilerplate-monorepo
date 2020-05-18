import { Input as InputType } from '@boilerplate-monorepo/ui-common';
import { func, number, oneOf, string } from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { ValidationError } from '../ValidationError';
import { styles as themeStyles } from './theme';

const StyledLabel = styled.label`
  display: grid;
  margin-bottom: ${CustomProperty.BASE_UNIT};
`;

const StyledInputLabel = styled.div`
  font-weight: bold;
  margin-bottom: calc(0.25 * ${CustomProperty.BASE_UNIT});

  ${({ hasError }) => hasError && themeStyles.error}
`;

const StyledInput = styled.input`
  border-radius: 0.125rem;
  font-size: ${CustomProperty.BASE_UNIT};
  height: calc(2.5 * ${CustomProperty.BASE_UNIT});
  margin-bottom: 0;
  padding: 0 1rem;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles.input}
`;

// eslint-disable-next-line complexity
const Input = ({
  'aria-label': ariaLabel,
  formatError,
  label,
  max,
  min,
  name,
  pattern,
  patternDescription,
  placeholder = label,
  t: parentT,
  title = label,
  ...props
}) => {
  const commonT = useTranslate();
  const { errors, register } = useFormContext();
  const t = parentT || commonT;
  const error = errors[name]?.message;
  const errorTranslated = formatError
    ? formatError(error, { max, min })
    : t(error, { max, min });

  const inputProps = {
    'aria-invalid': Boolean(error),
    'aria-label': ariaLabel || label,
    ...props,
    id: name,
    max,
    min,
    name,
    ...(pattern ? { pattern } : {}),
    ...(patternDescription ? { title: patternDescription || title } : {}),
    placeholder,
    ref: register,
  };

  return (
    <StyledLabel htmlFor={name}>
      <StyledInputLabel hasError={Boolean(error)}>{label}</StyledInputLabel>
      <StyledInput {...inputProps} />
      <ValidationError message={errorTranslated} />
    </StyledLabel>
  );
};

Input.defaultProps = {
  'aria-label': undefined,
  formatError: undefined,
  max: undefined,
  min: undefined,
  pattern: undefined,
  patternDescription: undefined,
  placeholder: undefined,
  t: undefined,
  title: undefined,
  type: InputType.TEXT,
};

Input.propTypes = {
  'aria-label': string,
  formatError: func,
  label: string.isRequired,
  max: number,
  min: number,
  name: string.isRequired,
  pattern: string,
  patternDescription: string,
  placeholder: string,
  t: func,
  title: string,
  type: oneOf(InputType.values),
};

export { Input };
