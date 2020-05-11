import { date as YupDateSchema } from 'yup';
import { ErrorKeys } from './errorKeys';

export const transform = (value) => Date.parse(value) && new Date(value);

class DateSchema extends YupDateSchema {
  _typeCheck(date) {
    return super._typeCheck(date);
  }

  limits({ max, min }, message = ErrorKeys.RANGE_DATE) {
    return this.max(max, message).min(min, message);
  }

  required(message = ErrorKeys.REQUIRED) {
    return super.required(message);
  }
}

export const date = () => new DateSchema().transform(transform);
