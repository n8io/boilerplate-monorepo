import { make as makeApp } from 'app';
import { make as makeCache } from 'cache';
import { config } from 'config';
import { makeConnection } from 'db';
import { once } from 'events';
import { make as makeGraphqlServer } from 'server';
import { addListeners as addServerStopListeners } from 'stop';
import { Telemetry } from 'types/telemetry';

const { PORT } = config;

const make = (ApolloServer) => async ({ app, cache, connection }) => {
  Telemetry.init();

  const makeExpressGraphql = makeGraphqlServer(ApolloServer);
  const actualConnection = connection || (await makeConnection(connection));
  const actualCache = cache || makeCache();
  const actualApp = app || makeApp();

  const graphqlServer = await makeExpressGraphql({
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
    server: expressServer,
  };
};

export { make };
