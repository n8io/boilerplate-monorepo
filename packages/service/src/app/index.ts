import { connect, migrate } from 'db';
import 'dotenv/config';
import express from 'express';
import { Server } from 'http';
import { makeServer } from 'server';
import { Connection } from 'typeorm';
import { ProcessEnvKeys } from 'types/processEnv';
import { middlewares } from './middleware';
import { router } from './router';
import { logFactory } from 'log/logFactory';

const PORT = process.env[ProcessEnvKeys.PORT] || 4000;
let app = express();
let server: Server | undefined;
let connection: Connection | undefined;

const shutdown = async () => {
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
  process.exit(0);
};

const start = async () => {
  app.use(middlewares);
  app.use(router);

  connection = await connect();
  await migrate();
  await makeServer(app);

  server = app.listen(PORT, () => {
    const msg = `🚀 GraphQL server started @ http://localhost:${PORT}/graphql`;
    const bookend = '='.repeat(msg.length - 1);

    console.log(`${bookend}\n${msg}\n${bookend}`);
  });

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

export { app, start };
