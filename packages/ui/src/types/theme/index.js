import { initial } from './creation';
import { displayMode } from './selectors';
import { Enumeration } from './typedef';

export const Theme = {
  ...Enumeration,
  displayMode,
  initial,
};
