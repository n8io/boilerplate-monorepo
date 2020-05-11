import { ErrorKeys as PasswordErrorKeys } from '../../constants/password';
import { ErrorKeys as UserErrorKeys } from '../../constants/user';
import { Validation } from '../validation';

const { object, string } = Validation;

const Limits = {
  email: {
    max: 250,
    min: 3,
    required: true,
  },
  familyName: {
    max: 50,
    min: 2,
  },
  givenName: {
    max: 50,
    min: 2,
  },
};

const validationSchema = object().shape({
  email: string().email().required().limits(Limits.email),
  familyName: string().trim().required().limits(Limits.familyName),
  givenName: string().trim().required().limits(Limits.givenName),
});

const isValid = validationSchema.isValid.bind(validationSchema);

const ErrorKeys = {
  ...PasswordErrorKeys,
  ...UserErrorKeys,
};

export { ErrorKeys, Limits, isValid, validationSchema };
