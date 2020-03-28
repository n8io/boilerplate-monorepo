import express from 'express';
import { middlewares } from './middleware';
import { router } from './router';

const make = () => {
  const app = express();

  app.use(middlewares);
  app.use(router);

  return app;
};

export { make };
