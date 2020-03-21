import { isEmpty } from 'ramda';
import { useForm as useReactHookForm } from 'react-hook-form';

const useForm = options => {
  const formProps = useReactHookForm({
    defaultValues: {},
    ...options,
  });

  const { formState } = formProps;
  const { dirty, isSubmitting, isValid, touched } = formState;
  const isTouched = !isEmpty(touched);

  return {
    ...formProps,
    isDirty: dirty,
    isSaveable: (isValid || !isTouched) && !isSubmitting,
    isSubmitting,
    isTouched,
  };
};

export { useForm };
