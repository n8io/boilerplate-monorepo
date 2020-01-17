export const useForm = () => ({
  errors: {},
  handleSubmit: () => jest.fn().mockName('handleSubmit(fn)'),
  register: jest.fn().mockName('register'),
});
