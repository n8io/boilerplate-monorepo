import { Utils } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { defaultTo, pipe, reject, split } from 'ramda';

const { HTTPS, UI_HOST_URI, isDevelopment } = config;
const toUnique = (array) => [...new Set(array)].filter(Boolean);

const toAllowHosts = pipe(
  defaultTo(''),
  split(','),
  reject(Utils.isNullOrEmpty)
);

const allowedLocalHosts =
  isDevelopment && HTTPS ? ['https://local.host:3000'] : [];

const origin = toUnique([...toAllowHosts(UI_HOST_URI), ...allowedLocalHosts]);

const Cors = Object.freeze({
  OPTIONS: {
    credentials: true,
    origin,
  },
});

export { Cors };
