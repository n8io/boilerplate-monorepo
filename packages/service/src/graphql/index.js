import { Utils } from '@boilerplate-monorepo/common';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import https from 'https';
import { join } from 'path';
import { FileSystem } from 'types/file';
import { ProcessEnvKeys } from 'types/processEnv';
import { context } from './context';
import { formatError } from './formatError';

// eslint-disable-next-line no-process-env
const { [ProcessEnvKeys.HTTPS]: HTTPS } = process.env;

const makeOptions = async () => {
  const certDir = join(__dirname, '../../../../.ini/certs');
  const certFilePath = join(certDir, 'cert.pem');
  const keyFilePath = join(certDir, 'key.pem');

  const [cert, key] = await Promise.all([
    FileSystem.readFile(certFilePath),
    FileSystem.readFile(keyFilePath),
  ]);

  return { cert, key };
};

const make = async (app, cache, schema) => {
  const apolloServer = new ApolloServer({
    cache,
    context,
    // debug is enabled on purpose to have more verbose logging in Apollo
    // Graphql Monitor. DO NOT CHANGE!!!
    debug: true,
    formatError,
    ...schema,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const isHttps = Utils.toBool(HTTPS);
  let server = null;

  if (isHttps) {
    const options = await makeOptions();

    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }

  return server;
};

export { make };
