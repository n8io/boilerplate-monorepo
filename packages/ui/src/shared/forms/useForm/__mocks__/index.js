const useForm = () => ({
  handleSubmit: jest.fn().mockName('handleSubmit'),
  isDirty: false,
  isSaveable: true,
  isTouched: false,
});

export { useForm };
