import 'reflect-metadata';
import express from 'express';
import { router } from './router';
import { makeServer } from '../server';
import { connect, migrate } from '../db';
import { middlewares } from './middleware';
import { ProcessEnvKeys } from '../types/processEnv';

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
