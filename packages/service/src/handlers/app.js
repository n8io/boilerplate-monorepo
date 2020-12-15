import { make as start } from 'start';

/**
 * Keep in-memory cache of app, cache, dbConnection, and schema because
 * serverless functions will reuse them on cold starts
 * */
let lambdaCache = {};

const main = async () => {
  // eslint-disable-next-line require-atomic-updates
  lambdaCache = await start(lambdaCache);

  return lambdaCache.server.createHandler({
    cors: {
      credentials: false,
      origin: '*',
    },
    endpointURL: '/graphql',
  });
};

export { main as graphqlHandler };
