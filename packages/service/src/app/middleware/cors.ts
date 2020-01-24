import cors, { CorsOptions } from 'cors';

const toUnique = (array: (string | undefined)[]): string[] =>
  [...new Set(array)].filter(x => x) as string[];

const corsOptions: CorsOptions = {
  credentials: true, // <-- REQUIRED backend setting
  origin: toUnique([
    process.env.UI_HOST_URI,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]),
};

const middleware = cors(corsOptions);

export { middleware };
