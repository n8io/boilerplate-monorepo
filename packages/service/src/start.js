import { make as applyMiddleware } from 'app';
import { make as makeCache } from 'cache';
import { makeConnection } from 'db';
import express from 'express';
import { make as makeGraphqlServer } from 'server';
import { Telemetry } from 'types/telemetry';

const start = async ({ app, cache, connection }) => {
  Telemetry.init();

  const actualConnection = connection || (await makeConnection(connection));
  const actualCache = cache || makeCache();
  const actualApp = app || express();

  const graphqlServer = await makeGraphqlServer({
    app: actualApp,
    cache: actualCache,
  });

  app || applyMiddleware(actualApp);

  return {
    app: actualApp,
    cache: actualCache,
    connection: actualConnection,
    server: graphqlServer,
  };
};

export { start };
