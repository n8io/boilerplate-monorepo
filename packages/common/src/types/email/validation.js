import { Validation } from '../validation';

const { string } = Validation;

const Limits = {
  max: 250,
  min: 3,
  required: true,
};

const validationSchema = string().email().required().limits(Limits);

export { Limits, validationSchema };
