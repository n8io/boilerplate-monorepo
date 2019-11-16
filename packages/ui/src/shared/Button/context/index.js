import { Enumeration, propTypes, values } from './typedef';

const PROP_NAME = 'context';

export const Context = {
  ...Enumeration,
  PROP_NAME,
  propTypes,
  values,
};
