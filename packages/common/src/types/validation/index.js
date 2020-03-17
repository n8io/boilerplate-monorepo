import { boolean, lazy, object, ref, ValidationError } from 'yup';
import { array } from './array';
import { date } from './date';
import { ErrorKeys as ValidationErrorKeys } from './errorKeys';
import { mixed } from './mixed';
import { number } from './number';
import { string } from './string';

const Validation = {
  array,
  boolean,
  date,
  lazy,
  mixed,
  number,
  object,
  ref,
  string,
};

export { Validation, ValidationError, ValidationErrorKeys };
