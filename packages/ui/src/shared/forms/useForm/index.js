import { useForm as useReactHookForm } from 'react-hook-form';

const ValidationMode = {
  ON_BLUR: 'onBlur',
  ON_CHANGE: 'onChange',
};

const useForm = options => {
  const formProps = useReactHookForm({
    defaultValues: {},
    mode: ValidationMode.ON_BLUR,
    ...options,
  });

  const { formState } = formProps;
  const { dirty, isSubmitting, isValid, touched } = formState;

  return {
    ...formProps,
    isDirty: dirty,
    isSaveable: !((isSubmitting || !isValid) && !touched),
    isTouched: touched,
  };
};

export { ValidationMode, useForm };
