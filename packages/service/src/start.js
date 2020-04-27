import { make as makeApp } from 'app';
import { make as makeCache } from 'cache';
import { config } from 'config';
import { makeConnection } from 'db';
import { once } from 'events';
import { make as makeGraphqlServer } from 'server';
import { addListeners as addServerStopListeners } from 'stop';

const { PORT } = config;

const start = async ({ app, cache, connection }) => {
  const actualConnection = connection || (await makeConnection(connection));
  const actualCache = cache || makeCache();
  const actualApp = app || makeApp();

  const graphqlServer = await makeGraphqlServer({
    app: actualApp,
    cache: actualCache,
  });

  const expressServer = graphqlServer.listen({ port: PORT }, () => {
    const msg = `🚀 GraphQL server started @ https://local.host:${PORT}/graphql`;
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
  };
};

export { start };
