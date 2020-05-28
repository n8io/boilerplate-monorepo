import { bool, func, node, oneOf, string, shape } from 'prop-types';
import { values } from 'ramda';
import React from 'react';
import { FormContext as ReactHookFormContext } from 'react-hook-form';
import { Prompt } from 'react-router-dom';
import { useTranslate } from 'shared/useTranslate';
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
  isLeavePromptEnabled,
  mode,
  leavePromptMessage,
  onSubmit,
  ...props
}) => {
  const t = useTranslate();
  const promptMessage = leavePromptMessage || t('dirtyFormPromptMessage');
  const { formState } = props;
  const { dirty: isDirty } = formState;
  const shouldPromptOnLeave = isLeavePromptEnabled && isDirty;

  return (
    <ReactHookFormContext mode={mode} {...props}>
      <fieldset disabled={isDisabled}>
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
          {children}
        </form>
      </fieldset>
      {shouldPromptOnLeave && <Prompt message={promptMessage} />}
      <FormDevTool />
    </ReactHookFormContext>
  );
};

Form.defaultProps = {
  className: undefined,
  isDisabled: false,
  isLeavePromptEnabled: false,
  leavePromptMessage: undefined,
  mode: Mode.ON_BLUR,
};

Form.propTypes = {
  children: node.isRequired,
  className: string,
  formState: shape({
    dirty: bool.isRequired,
  }).isRequired,
  handleSubmit: func.isRequired,
  isDisabled: bool,
  isLeavePromptEnabled: bool,
  leavePromptMessage: string,
  mode: oneOf(values(Mode)),
  onSubmit: func.isRequired,
};

export { Form, Mode };
