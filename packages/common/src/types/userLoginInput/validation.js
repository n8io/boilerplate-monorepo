import { Validation } from '../validation';

const { object, string } = Validation;

const Limits = {
  password: {
    required: true,
  },
  username: {
    required: true,
  },
};

const validationSchema = object().shape({
  password: string().trim().required(),
  username: string().trim().required(),
});

const isValid = validationSchema.isValid.bind(validationSchema);

export { Limits, isValid, validationSchema };
