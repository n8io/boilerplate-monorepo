import 'reflect-metadata';
import express from 'express';
import { router } from './router';
import { makeServer } from '../server';
import { connect } from '../db';

const { PORT = 4000 } = process.env;
let app = express();

const start = async () => {
  app.use(router);

  await connect();
  await makeServer(app);

  app.listen(PORT, () => {
    console.log(`🚀 GraphQL server started @ http://localhost:${PORT}`);
  });
};

export { app, start };
