import { UserRecoveryNotifyMethod } from 'types/userRecoveryNotifyMethod';
import { ErrorKeys } from '../../constants/account';
import { Validation } from '../validation';

const { object, string } = Validation;

const validationSchema = object().shape({
  id: string().required(),
  notificationMethod: string()
    .trim()
    .oneOf(UserRecoveryNotifyMethod.values)
    .required(),
});

const isValid = validationSchema.isValid.bind(validationSchema);

export { ErrorKeys, isValid, validationSchema };
