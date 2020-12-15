import serverlessHttp from 'serverless-http';
import { start } from 'start';

/**
 * Keep in-memory cache of app, cache, dbConnection, and schema because
 * serverless functions will reuse them on cold starts
 * */
let lambdaCache = {};

const main = async (event, context) => {
  // eslint-disable-next-line require-atomic-updates
  lambdaCache = await start(lambdaCache);

  const { app } = lambdaCache;

  const handler = serverlessHttp(app);

  console.log(app);

  return handler(event, context);
};

export { main as graphqlHandler };
