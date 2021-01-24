import { toSafeLog } from 'log/toSafeLog';
import { omit } from 'ramda';
import serverlessHttp from 'serverless-http';
import { start } from 'start';
import { addListeners as addServerStopListeners } from 'stop';
import { origin } from 'types/cors';

const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': origin,
};

const omitPoweredBy = omit(['x-powered-by'])

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
    ...omitPoweredBy(response.headers),
    ...corsHeaders,
  };

  // eslint-disable-next-line no-console
  console.log(toSafeLog({ response }));

  return response;
};

export { main as graphqlHandler };
