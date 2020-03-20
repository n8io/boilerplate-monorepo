import { isNil } from 'ramda';
import { string as YupStringSchema } from 'yup';
import { ErrorKeys } from './errorKeys';

class StringSchema extends YupStringSchema {
  _typeCheck(string) {
    return super._typeCheck(string);
  }

  email(message = ErrorKeys.INVALID_EMAIL) {
    return super.email(message);
  }

  // eslint-disable-next-line complexity
  limits({ max, min }, message) {
    if (isNil(max) && isNil(min)) return this;

    if (!isNil(max) && !isNil(min)) {
      const newMessage = message || ErrorKeys.RANGE_STRING_LENGTH;

      return this.max(max, newMessage).min(min, newMessage);
    }

    if (!isNil(max)) {
      return this.max(max, message || ErrorKeys.RANGE_STRING_LENGTH_MAX);
    }

    return this.min(min, message || ErrorKeys.RANGE_STRING_LENGTH_MIN);
  }

  required(message = ErrorKeys.REQUIRED) {
    return super.required(message);
  }
}

export const string = () => new StringSchema().trim();
