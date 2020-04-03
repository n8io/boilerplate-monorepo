import cors from 'cors';
import { isNil, pipe, reject, split } from 'ramda';

const toUnique = array => [...new Set(array)].filter(x => x);

const toAllowHosts = pipe(split(','), reject(isNil));

const corsOptions = {
  credentials: true, // <-- REQUIRED backend setting
  origin: toUnique([
    // eslint-disable-next-line no-process-env
    ...toAllowHosts(process.env.UI_HOST_URI || ''),
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]),
};

const middleware = cors(corsOptions);

export { middleware };
