import { isEmpty } from 'ramda';
import { useForm as useReactHookForm } from 'react-hook-form';

const useForm = options => {
  const formProps = useReactHookForm(options);

  const { formState } = formProps;
  const { dirty: isDirty, isSubmitting, isValid, touched } = formState;
  const isTouched = !isEmpty(touched);

  return {
    ...formProps,
    isDirty,
    isSaveable: (isValid || !isTouched) && !isSubmitting && isDirty,
    isSubmitting,
    isTouched,
  };
};

export { useForm };
