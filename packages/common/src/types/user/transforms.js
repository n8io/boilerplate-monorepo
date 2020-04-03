import { isNil, omit, unless } from 'ramda';

const dbToApi = unless(isNil, omit(['passwordHash']));

export { dbToApi };
