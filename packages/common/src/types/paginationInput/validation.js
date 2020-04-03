import { Validation } from '../validation';

const { object, number, string } = Validation;

const Limits = {
  after: {
    required: false,
  },
  first: {
    max: 100,
    min: 1,
    required: false,
  },
};

const validationSchema = object().shape({
  after: string()
    .trim()
    .nullable(),
  first: number()
    .limits(Limits.first)
    .nullable(),
});

const isValid = validationSchema.isValid.bind(validationSchema);

export { Limits, isValid, validationSchema };
