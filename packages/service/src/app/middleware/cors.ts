import cors, { CorsOptions } from 'cors';
import { isNil, pipe, reject, split } from 'ramda';

const toUnique = (array: (string | undefined)[]): string[] =>
  [...new Set(array)].filter(x => x) as string[];

const toAllowHosts = pipe(split(','), reject(isNil));

const corsOptions: CorsOptions = {
  credentials: true, // <-- REQUIRED backend setting
  origin: toUnique([
    ...toAllowHosts(process.env.UI_HOST_URI || ''),
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]),
};

const middleware = cors(corsOptions);

export { middleware };
