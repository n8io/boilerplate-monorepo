import { isEmpty } from 'ramda';
import { useForm as useReactHookForm } from 'react-hook-form';

const useForm = options => {
  const formProps = useReactHookForm(options);

  const { formState } = formProps;
  const { dirty: isDirty, isSubmitting, isValid, touched } = formState;
  const isTouched = !isEmpty(touched);

  return {
    ...formProps,
    isSaveable: (isValid || !isTouched) && !isSubmitting && isDirty,
  };
};

export { useForm };
