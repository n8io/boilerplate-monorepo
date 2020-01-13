import 'dotenv/config';
import { connect, migrate } from 'db';
import express from 'express';
import { Server } from 'http';
import { logFactory } from 'log/logFactory';
import { makeServer } from 'server';
import { Connection } from 'typeorm';
import { ProcessEnvKeys } from 'types/processEnv';
import { middlewares } from './middleware';
import { router } from './router';

const PORT = process.env[ProcessEnvKeys.PORT] || 4000;

const shutdown = async (server: Server, connection: Connection) => {
  if (!server || !connection) return;

  const debugLog = logFactory({
    method: 'shutdown',
    module: 'app',
  });

  await Promise.all([
    server ? new Promise(res => server!.close(res)) : Promise.resolve(),
    connection ? connection.close() : Promise.resolve(),
  ]);

  debugLog(`🏁 App shutdown successfully`);
  process.exit(1);
};

const start = async () => {
  const app = express();

  app.use(middlewares);
  app.use(router);

  const connection = await connect();

  await migrate();
  await makeServer(app);

  const server = app.listen(PORT, () => {
    const msg = `🚀 GraphQL server started @ http://localhost:${PORT}/graphql`;
    const bookend = '='.repeat(msg.length - 1);

    console.log(`${bookend}\n${msg}\n${bookend}`);
  });

  process.on('SIGTERM', () => shutdown(server, connection));
  process.on('SIGINT', () => shutdown(server, connection));
};

export { start };
