import { config } from 'config';
import { isNil, reject, values } from 'ramda';

export const Language = {
  ENGLISH: 'en',
  FAKE: config.isDevelopment ? 'dev' : undefined,
};

export const Languages = reject(isNil, values(Language));
