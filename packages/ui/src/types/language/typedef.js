import { isNil, reject, values as ramdaValues } from 'ramda';

export const Enumeration = {
  ENGLISH: 'en',
  // eslint-disable-next-line no-warning-comments
  // TODO: Uncomment once your app is prod ready
  // FAKE: config.isDevelopment || config.isTest ? 'dev' : undefined,
  FAKE: 'dev',
};

export const values = reject(isNil, ramdaValues(Enumeration));
