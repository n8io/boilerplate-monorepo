import { connect, migrate } from 'db';
import express from 'express';
import 'reflect-metadata';
import { makeServer } from 'server';
import { ProcessEnvKeys } from 'types/processEnv';
import { middlewares } from './middleware';
import { router } from './router';

const PORT = process.env[ProcessEnvKeys.PORT] || 4000;
let app = express();

const start = async () => {
  app.use(middlewares);
  app.use(router);

  await connect();
  await migrate();
  await makeServer(app);

  app.listen(PORT, () => {
    console.log(`🚀 GraphQL server started @ http://localhost:${PORT}`);
  });
};

export { app, start };
