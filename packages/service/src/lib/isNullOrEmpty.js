import { either, isEmpty, isNil } from 'ramda';

const isNullOrEmpty = either(isNil, isEmpty);

export { isNullOrEmpty };
