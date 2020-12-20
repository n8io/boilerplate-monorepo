import { middlewares } from './middleware';
import { router } from './router';

const make = (app) => {
  app.use(middlewares);
  app.use(router);

  return app;
};

export { make };
