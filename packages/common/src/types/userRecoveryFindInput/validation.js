import { regexToInputPattern } from 'types/utils/regexToInputPattern';
import { ErrorKeys, REGEX as ACCOUNT_REGEX } from '../../constants/account';
import { Validation } from '../validation';

const { object, string } = Validation;

const Limits = {
  account: {
    min: 3,
    pattern: regexToInputPattern(ACCOUNT_REGEX),
    required: true,
  },
};

const validationSchema = object().shape({
  account: string()
    .trim()
    .limits(Limits.account)
    .required(),
});

const isValid = validationSchema.isValid.bind(validationSchema);

export { ErrorKeys, Limits, isValid, validationSchema };
