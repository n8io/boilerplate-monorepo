import { connect, migrate } from 'db';
import express from 'express';
import { makeServer } from 'server';
import { ProcessEnvKeys } from 'types/processEnv';
import { middlewares } from './middleware';
import { router } from './router';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env[ProcessEnvKeys.PORT] || 4000;
let app = express();

const start = async () => {
  app.use(middlewares);
  app.use(router);

  await connect();
  await migrate();
  await makeServer(app);

  app.listen(PORT, () => {
    const msg = `🚀 GraphQL server started @ http://localhost:${PORT}/graphql`;
    const bookend = '='.repeat(msg.length - 1);

    console.log(`${bookend}\n${msg}\n${bookend}`);
  });
};

export { app, start };
