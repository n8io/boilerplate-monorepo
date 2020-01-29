import 'dotenv/config';
import { connect } from 'db';
import express from 'express';
import { Server } from 'http';
import { logFactory } from 'log/logFactory';
import { makeServer } from 'server';
import { Connection } from 'typeorm';
import { ProcessEnvKeys } from 'types/processEnv';
import { middlewares } from './middleware';
import { router } from './router';
import { makeSchema } from 'server/schema';
import { makeCache } from 'server/cache';
import { RedisCache } from 'apollo-server-cache-redis';
import { GraphQLSchema } from 'graphql';

let isShuttingDown = false;

const PORT = process.env[ProcessEnvKeys.PORT] || 4000;

const shutdownCache = (cache: RedisCache) =>
  new Promise(res => {
    const debugLog = logFactory({
      method: 'shutdown',
      module: 'cache',
    });

    try {
      cache && cache.client && cache.client.quit();
    } catch {}

    debugLog(`🔌 Cache connection closed successfully`);

    res();
  });

const shutdownDatabase = (connection: Connection) =>
  new Promise(async res => {
    const debugLog = logFactory({
      method: 'shutdown',
      module: 'database',
    });

    try {
      await connection.close();
    } catch {}

    debugLog(`🔌 Database connection closed successfully`);

    res();
  });

const shutdownServer = (server: Server) =>
  new Promise(async res => {
    const debugLog = logFactory({
      method: 'shutdown',
      module: 'server',
    });

    try {
      await server.close();
    } catch {}

    debugLog(`🔌 Server connections closed successfully`);

    res();
  });

const shutdown = async ({
  cache,
  connection,
  server,
}: {
  cache: RedisCache;
  connection: Connection;
  server: Server;
}) => {
  if (isShuttingDown) return;

  isShuttingDown = true;

  const debugLog = logFactory({
    method: 'shutdown',
    module: 'app',
  });

  await Promise.all([
    shutdownCache(cache),
    shutdownDatabase(connection),
    shutdownServer(server),
  ]);

  debugLog(`🏁 App shutdown successfully`);
  process.exit(1);
};

const makeApp = async (cache: RedisCache, schema: GraphQLSchema) => {
  const app = express();

  app.use(middlewares);
  app.use(router);

  await makeServer(app, schema, cache);

  return app;
};

const start = async ({
  currentApp,
  currentCache,
  currentConnection,
  currentSchema,
}: {
  currentApp: any | undefined;
  currentCache: RedisCache | undefined;
  currentConnection: Connection | undefined;
  currentSchema: GraphQLSchema | undefined;
}) => {
  const connection =
    currentConnection && currentConnection.isConnected
      ? currentConnection
      : await connect(currentConnection);

  const cache = currentCache || makeCache();
  const schema = currentSchema || (await makeSchema());
  const app = currentApp || (await makeApp(cache, schema));

  const server = app.listen(PORT, () => {
    const msg = `🚀 GraphQL server started @ http://localhost:${PORT}/graphql`;
    const bookend = '='.repeat(msg.length - 1);

    console.log(`${bookend}\n${msg}\n${bookend}`);
  });

  ['SIGHUP', 'SIGINT', 'SIGTERM'].map((signal: any) => {
    process.on(signal, () => shutdown({ cache, connection, server }));
  });

  return { app, cache, connection, schema };
};

export { start };
