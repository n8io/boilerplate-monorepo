import {
  ValidationErrorKeys,
  UserLoginInput,
} from '@boilerplate-monorepo/common';
import { keys, pick, values } from 'ramda';
import { common } from '.';

describe('common translations', () => {
  test('validation error keys are consistent with the Validation type', () => {
    const errorKeys = keys(ValidationErrorKeys);
    const errorValues = values(ValidationErrorKeys).sort();
    const actual = keys(pick(errorValues, common));

    expect(actual).toEqual(errorKeys);
  });

  test('validation error keys are consistent with the UserLoginInput type', () => {
    const errorKeys = keys(UserLoginInput.ErrorKeys);
    const errorValues = values(UserLoginInput.ErrorKeys).sort();
    const actual = keys(pick(errorValues, common));

    expect(actual).toEqual(errorKeys);
  });
});
