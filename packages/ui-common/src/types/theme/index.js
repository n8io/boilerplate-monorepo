import { initial } from './creation';
import { example } from './examples';
import { displayMode } from './selectors';
import { Enumeration } from './typedef';

export const Theme = {
  ...Enumeration,
  displayMode,
  example,
  initial,
};
