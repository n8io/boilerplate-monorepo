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

const Input = ({
  'aria-label': ariaLabel,
  formatError,
  label,
  max,
  min,
  name,
  t: parentT,
  ...props
}) => {
  const commonT = useTranslate({
    component: 'common',
    namespace: 'common',
  });

  const { errors, register } = useFormContext();
  const t = parentT || commonT;
  const error = errors[name]?.message;
  const errorTranslated = formatError
    ? formatError(error, { max, min })
    : t(error, { max, min });

  return (
    <StyledLabel htmlFor={name}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInput
        aria-label={ariaLabel || label}
        aria-invalid={Boolean(error)}
        {...props}
        id={name}
        name={name}
        ref={register}
      />
      <ValidationError message={errorTranslated} />
    </StyledLabel>
  );
};

Input.defaultProps = {
  'aria-label': undefined,
  formatError: undefined,
  max: undefined,
  min: undefined,
  t: undefined,
  type: InputType.TEXT,
};

Input.propTypes = {
  'aria-label': string,
  formatError: func,
  label: string.isRequired,
  max: number,
  min: number,
  name: string.isRequired,
  t: func,
  type: oneOf(InputType.values),
};

export { Input };
