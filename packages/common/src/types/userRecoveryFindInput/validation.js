import { max as ramdaMax, min as ramdaMin } from 'ramda';
import { UserRegisterInput } from 'types/userRegisterInput';
import { regexToInputPattern } from 'types/utils/regexToInputPattern';
import { ErrorKeys, REGEX as ACCOUNT_REGEX } from '../../constants/account';
import { Validation } from '../validation';

const { object, string } = Validation;

const { email, username } = UserRegisterInput.Limits;

const max = ramdaMax(email.max, username.max);
const min = ramdaMin(email.min, username.min);

const Limits = {
  account: {
    max,
    min,
    pattern: regexToInputPattern(ACCOUNT_REGEX),
    required: true,
  },
};

const validationSchema = object().shape({
  account: string().trim().limits(Limits.account).required(),
});

const isValid = validationSchema.isValid.bind(validationSchema);

export { ErrorKeys, Limits, isValid, validationSchema };
