import { Utils } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { defaultTo, head, pipe, reject, split } from 'ramda';

const { HTTPS, UI_HOST_URI, isDevelopment } = config;
const toUnique = (array) => [...new Set(array)].filter(Boolean);

const toAllowHosts = pipe(
  defaultTo(''),
  split(','),
  reject(Utils.isNullOrEmpty)
);

const allowedLocalHosts =
  isDevelopment && HTTPS ? ['https://local.host:3000'] : [];

const origin = pipe(
  (hosts) => toUnique([...toAllowHosts(UI_HOST_URI), ...hosts]),
  head
)(allowedLocalHosts);

const Cors = Object.freeze({
  OPTIONS: {
    credentials: true,
    origin,
  },
});

export { Cors };
