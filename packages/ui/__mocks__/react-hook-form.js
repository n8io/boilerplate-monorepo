import React from 'react';

export const useForm = () => ({
  errors: {},
  formState: {
    isSubmitting: false,
    isValid: true,
  },
  handleSubmit: () => jest.fn().mockName('handleSubmit(fn)'),
  register: jest.fn().mockName('register'),
  reset: jest.fn().mockName('reset'),
  watch: jest.fn().mockName('watch'),
});

export const useFormContext = useForm;

export const FormContext = (props) => {
  const formProps = useFormContext();

  return <x-FormContext {...props} {...formProps} />;
};
