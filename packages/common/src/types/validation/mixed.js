import { mixed as YupMixedSchema } from 'yup';
import { ErrorKeys } from './errorKeys';

class MixedSchema extends YupMixedSchema {
  required(message = ErrorKeys.REQUIRED) {
    return super.required(message);
  }
}

export const mixed = () => new MixedSchema();
