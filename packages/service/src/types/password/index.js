import { compare, hash } from './selectors';
import { Enumeration } from './typedef';

export const Password = {
  ...Enumeration,
  compare,
  hash,
};
