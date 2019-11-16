import { Enumeration, propTypes, values } from './typedef';

const PROP_NAME = 'size';

export const Size = {
  ...Enumeration,
  PROP_NAME,
  propTypes,
  values,
};
