import { UnsafeProps, Utils } from '@boilerplate-monorepo/common';
import { map, pipe, unless } from 'ramda';

const toSafeLog = unless(
  Utils.isNullOrEmpty,
  pipe(...map(Utils.redactPropDeep, UnsafeProps), JSON.stringify)
);

export { toSafeLog };
