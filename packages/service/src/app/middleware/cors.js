import { config } from 'config';
import cors from 'cors';
import { defaultTo, isNil, pipe, reject, split } from 'ramda';

const { UI_HOST_URI } = config;

const toUnique = array => [...new Set(array)].filter(x => x);

const toAllowHosts = pipe(defaultTo(''), split(','), reject(isNil));

const corsOptions = {
  credentials: true, // <-- REQUIRED backend setting
  origin: toUnique([
    ...toAllowHosts(UI_HOST_URI),
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]),
};

const middleware = cors(corsOptions);

export { middleware };
