import { toSafeLog } from 'log/toSafeLog';
import serverlessHttp from 'serverless-http';
import { start } from 'start';
import { addListeners as addServerStopListeners } from 'stop';

const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
};

/**
 * Keep in-memory cache of app, cache, dbConnection, and schema because
 * serverless functions will reuse them on cold starts
 * */
let lambdaCache = {};

const main = async (event, context) => {
  // eslint-disable-next-line require-atomic-updates
  lambdaCache = await start(lambdaCache);

  const { app, cache, connection } = lambdaCache;
  const handler = serverlessHttp(app);

  addServerStopListeners({ cache, connection });

  // eslint-disable-next-line no-console
  console.log(toSafeLog({ event }));

  const response = await handler(event, context);

  response.headers = {
    ...response.headers,
    ...corsHeaders,
  };

  // eslint-disable-next-line no-console
  console.log(toSafeLog({ response }));

  return response;
};

export { main as graphqlHandler };
