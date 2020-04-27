import { config } from 'config';
import http from 'http';
import https from 'https';
import { make as makeHttpsOptions } from './httpsOptions';
import { make as makeServer } from './server';

const { HTTPS: isHttps } = config;

const make = async ({ app, cache }) => {
  const apolloServer = makeServer({ cache });

  apolloServer.applyMiddleware({ app, cors: false });

  let server = null;

  if (isHttps) {
    const options = await makeHttpsOptions();

    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }

  return server;
};

export { make, makeServer };
