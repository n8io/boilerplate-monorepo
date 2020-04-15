import { bool, func, node, oneOf, string } from 'prop-types';
import { values } from 'ramda';
import React from 'react';
import { FormContext as ReactHookFormContext } from 'react-hook-form';
import { FormDevTool } from './FormDevTool';

const Mode = {
  ON_BLUR: 'onBlur',
  ON_CHANGE: 'onChange',
  ON_SUBMIT: 'onSubmit',
};

const Form = ({
  children,
  className,
  handleSubmit,
  isDisabled,
  mode,
  onSubmit,
  ...props
}) => (
  <ReactHookFormContext mode={mode} {...props}>
    <fieldset disabled={isDisabled}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </fieldset>
    <FormDevTool />
  </ReactHookFormContext>
);

Form.defaultProps = {
  className: undefined,
  isDisabled: false,
  mode: Mode.ON_BLUR,
};

Form.propTypes = {
  children: node.isRequired,
  className: string,
  handleSubmit: func.isRequired,
  isDisabled: bool,
  mode: oneOf(values(Mode)),
  onSubmit: func.isRequired,
};

export { Form, Mode };
