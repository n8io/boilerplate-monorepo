import { Input as InputType } from '@boilerplate-monorepo/ui-common';
import { number, oneOfType, string } from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const HiddenInput = ({ name, value, ...props }) => {
  const { register } = useFormContext();

  return (
    <input
      {...props}
      id={name}
      name={name}
      ref={register}
      type={InputType.HIDDEN}
      value={value}
    />
  );
};

HiddenInput.defaultProps = {
  value: '',
};

HiddenInput.propTypes = {
  name: string.isRequired,
  value: oneOfType([string, number]),
};

export { HiddenInput };
