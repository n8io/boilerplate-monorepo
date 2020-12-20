import { config } from 'config';
import { once } from 'events';
import { start } from 'start';
import { addListeners as addServerStopListeners } from 'stop';

const { HTTPS: isHttps, PORT } = config;

/**
 * Keep in-memory cache of app, cache, dbConnection, and schema because
 * serverless functions will reuse them on cold starts
 * */
let lambdaCache = {};

const main = async () => {
  // eslint-disable-next-line require-atomic-updates
  lambdaCache = await start(lambdaCache);

  const { cache, connection, server } = lambdaCache;

  const expressServer = server.listen({ port: PORT }, () => {
    const protocol = isHttps ? 'https' : 'http';
    const host = 'local.host';
    const pathname = '/graphql';
    const url = new URL(pathname, `${protocol}://${host}`);

    url.port = PORT;

    const msg = `🚀 GraphQL server started @ ${url.href}`;
    const bookend = '='.repeat(msg.length - 1);

    // eslint-disable-next-line no-console
    console.log([bookend, msg, bookend].join('\n'));
  });

  await once(expressServer, 'listening');

  addServerStopListeners({ cache, connection });
};

main();
