import { arrayOf, func, number, oneOfType, shape, string } from 'prop-types';
import { curry } from 'ramda';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Radio, RadioGroup, useRadioState } from 'reakit/Radio';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { ValidationError } from '../ValidationError';

const StyledInputLabel = styled.div`
  font-weight: bold;
  margin-bottom: calc(0.25 * ${CustomProperty.BASE_UNIT});
`;

const StyledRadioGroup = styled(RadioGroup)`
  display: grid;
  gap: 1rem;
  margin-bottom: ${CustomProperty.BASE_UNIT};
`;

const StyledLabel = styled.label`
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-auto-flow: column;
  grid-template-columns: auto 1fr;
  min-height: 2rem;
`;

const StyledRadio = styled(Radio)`
  margin-bottom: 0;

  ${({ className }) => className}
`;

const makeOptionToRadio = curry(
  ({ className, name, radio: radioOptions, register }, { label, value }) => (
    <StyledLabel htmlFor={value} key={value}>
      <StyledRadio
        {...radioOptions}
        id={value}
        name={name}
        ref={register}
        value={value}
      />
      <div className={className}>{label}</div>
    </StyledLabel>
  )
);

const RadioInput = ({
  'aria-label': ariaLabel,
  className,
  initialValue,
  label,
  name,
  options,
  t: parentT,
}) => {
  const commonT = useTranslate({
    component: 'common',
    namespace: 'common',
  });

  const { errors, register } = useFormContext();
  const t = parentT || commonT;
  const error = errors[name]?.message;
  const errorTranslated = t(error);
  const radio = useRadioState({ state: initialValue });

  const optionToRadio = makeOptionToRadio({
    className,
    name,
    radio,
    register,
  });

  return (
    <>
      <StyledInputLabel hasError={false}>{label}</StyledInputLabel>
      <StyledRadioGroup {...radio} aria-label={ariaLabel || label}>
        {options.map(optionToRadio)}
      </StyledRadioGroup>
      <ValidationError message={errorTranslated} />
    </>
  );
};

RadioInput.defaultProps = {
  'aria-label': undefined,
  className: undefined,
  initialValue: undefined,
  t: undefined,
  title: undefined,
};

RadioInput.propTypes = {
  'aria-label': string,
  className: string,
  initialValue: oneOfType([string, number]),
  label: string.isRequired,
  name: string.isRequired,
  options: arrayOf(
    shape({
      label: string.isRequired,
      value: oneOfType([number, string]).isRequired,
    })
  ),
  t: func,
  title: string,
};

export { RadioInput };
