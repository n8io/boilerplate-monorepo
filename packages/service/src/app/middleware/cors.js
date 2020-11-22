import { Utils } from '@boilerplate-monorepo/common';
import { config } from 'config';
import cors from 'cors';
import { defaultTo, pipe, reject, split } from 'ramda';

const { UI_HOST_URI } = config;
const toUnique = (array) => [...new Set(array)].filter(Boolean);

const toAllowHosts = pipe(
  defaultTo(''),
  split(','),
  reject(Utils.isNullOrEmpty)
);

const origin = toUnique([
  ...toAllowHosts(UI_HOST_URI),
  'https://local.host:3000',
]);

const corsOptions = {
  credentials: true, // <-- REQUIRED backend setting
  origin,
};

const middleware = cors(corsOptions);

export { middleware };
