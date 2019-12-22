import { either, isNil, isEmpty } from 'ramda';

const isNullOrEmpty = either(isNil, isEmpty);

export { isNullOrEmpty };
