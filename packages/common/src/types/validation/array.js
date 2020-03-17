import { array as YupArraySchema } from 'yup';
import { ErrorKeys } from './errorKeys';

class ArraySchema extends YupArraySchema {
  _typeCheck(array) {
    return super._typeCheck(array);
  }

  requiredAllowEmpty(message = ErrorKeys.REQUIRED) {
    return this.test('field is required', message, value =>
      Array.isArray(value)
    );
  }
}

export const array = () => new ArraySchema().requiredAllowEmpty();
