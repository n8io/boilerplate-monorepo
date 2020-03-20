import { bool, func, node, string } from 'prop-types';
import React from 'react';
import { FormContext as ReactHookFormContext } from 'react-hook-form';

const Form = ({
  children,
  className,
  handleSubmit,
  isDisabled,
  onSubmit,
  ...props
}) => (
  <ReactHookFormContext {...props}>
    <fieldset disabled={isDisabled}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </fieldset>
  </ReactHookFormContext>
);

Form.defaultProps = {
  className: undefined,
  isDisabled: false,
};

Form.propTypes = {
  children: node.isRequired,
  className: string,
  handleSubmit: func.isRequired,
  isDisabled: bool,
  onSubmit: func.isRequired,
};

export { Form };
