import { isEmpty } from 'ramda';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Mode } from '../Form';

const useForm = options => {
  const formProps = useReactHookForm({
    mode: Mode.ON_BLUR,
    ...options,
  });

  const { formState } = formProps;
  const { dirty: isDirty, isSubmitting, isValid, touched } = formState;
  const isTouched = !isEmpty(touched);

  return {
    ...formProps,
    isSaveable: (isValid || !isTouched) && !isSubmitting && isDirty,
  };
};

export { useForm };
