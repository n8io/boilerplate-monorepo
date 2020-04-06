const useForm = () => ({
  handleSubmit: jest.fn().mockName('handleSubmit'),
  isDirty: false,
  isSaveable: true,
  isTouched: false,
  reset: jest.fn().mockName('reset'),
});

export { useForm };
