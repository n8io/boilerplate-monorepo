import { PubSub } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { subscribe as graphqlSubscribe } from 'graphql';
import { has, head, keys, path, pipe, prop, __ } from 'ramda';
import { make as makeServer } from '../server/server';
import { make as makeContext } from './context';

const makeGraphqlClient = context => {
  const server = makeServer({ context });
  const { query, mutate } = createTestClient(server);

  const subscribe = async (subscription, pubsub) => {
    const iterator = await graphqlSubscribe(
      server.schema,
      subscription,
      {},
      { ...context, pubsub }
    );

    if (has('errors', iterator)) return iterator;

    const { value } = await iterator.next();

    return value;
  };

  const whileSubscribed = (subscription, callback) => {
    const pubsub = new PubSub();
    const promise = subscribe(subscription, pubsub);

    callback(pubsub);
    return promise;
  };

  return {
    context,
    execMutation: mutate,
    execQuery: query,
    whileSubscribed,
  };
};

const graphqlClient = makeGraphqlClient(makeContext());

const responseToData = response => {
  expect(response.errors).toBeUndefined();
  expect(response.data).not.toBeNull();

  return pipe(keys, head, prop(__, response.data))(response.data);
};

const responseToErrorCode = path(['errors', 0, 'extensions', 'code']);

export {
  graphqlClient,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
};
