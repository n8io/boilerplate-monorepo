import { start } from 'start';

/**
 * Keep in-memory cache of app, cache, dbConnection, and schema because
 * serverless functions will reuse them on cold starts
 * */
let lambdaCache = {};

const main = async () => {
  // eslint-disable-next-line require-atomic-updates
  lambdaCache = await start(lambdaCache);
};

main();
