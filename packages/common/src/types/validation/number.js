import { number as YupNumberSchema } from 'yup';
import { ErrorKeys } from './errorKeys';

const transformNumber = value => (Number.isNaN(value) ? 0 : value);

class NumberSchema extends YupNumberSchema {
  _typeCheck(number) {
    return super._typeCheck(number);
  }

  limits({ max, min }, message = ErrorKeys.RANGE_NUMERIC) {
    return this.max(max, message).min(min, message);
  }

  required(message = ErrorKeys.REQUIRED) {
    return super.required(message);
  }
}

export const number = () => new NumberSchema().transform(transformNumber);
