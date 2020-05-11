import { UnsafeProps, Utils } from '@boilerplate-monorepo/common';
import { map, pipe, unless } from 'ramda';

const redactionFns = map(Utils.redactPropDeep, UnsafeProps);
const toSafeData = unless(Utils.isNullOrEmpty, pipe(...redactionFns));
const toSafeLog = pipe(...redactionFns, JSON.stringify);

export { toSafeData, toSafeLog };
