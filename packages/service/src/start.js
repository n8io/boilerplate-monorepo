import { make as makeApp } from 'app';
import { make as makeCache } from 'cache';
import { makeConnection } from 'db';
import { once } from 'events';
import { make as makeGraphqlServer } from 'graphql';
import { make as makeSchema } from 'graphql/schema';
import { addListeners as addServerStopListeners } from 'stop';
import { ProcessEnvKeys } from 'types/processEnv';

// eslint-disable-next-line no-process-env
const PORT = process.env[ProcessEnvKeys.PORT] || 4000;

const start = async ({ app, cache, connection, schema }) => {
  const actualConnection = connection || (await makeConnection(connection));
  const actualCache = cache || makeCache();
  const actualSchema = schema || (await makeSchema());
  const actualApp = app || makeApp(cache, schema);

  const graphqlServer = await makeGraphqlServer(
    actualApp,
    actualCache,
    actualSchema
  );

  const expressServer = graphqlServer.listen({ port: PORT }, () => {
    const msg = `🚀 GraphQL server started @ http://localhost:${PORT}/graphql`;
    const bookend = '='.repeat(msg.length - 1);

    // eslint-disable-next-line no-console
    console.log([bookend, msg, bookend].join('\n'));
  });

  await once(expressServer, 'listening');

  addServerStopListeners({
    cache: actualCache,
    connection: actualConnection,
  });

  return {
    app: actualApp,
    cache: actualCache,
    connection: actualConnection,
    schema: actualSchema,
  };
};

export { start };
