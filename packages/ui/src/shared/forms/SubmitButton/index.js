import { isEmpty } from 'ramda';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Context, Type } from '../../Button';

const { PRIMARY } = Context;

const SubmitButton = props => {
  const { formState } = useFormContext();

  const { isSubmitting, isValid, touched } = formState;
  const isTouched = !isEmpty(touched);
  const isSaveable = (isValid || !isTouched) && !isSubmitting;

  return (
    <Button
      {...props}
      disabled={!isSaveable}
      context={PRIMARY}
      type={Type.SUBMIT}
    />
  );
};

export { SubmitButton };
