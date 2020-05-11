import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Context, Type } from '../../Button';

const { PRIMARY } = Context;

const SubmitButton = (props) => {
  const { formState } = useFormContext();

  const { dirty: isDirty, isSubmitting } = formState;
  const isSaveable = !isSubmitting && isDirty;

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
