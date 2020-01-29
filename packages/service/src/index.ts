import { start } from 'app';
import 'reflect-metadata';
import { RedisCache } from 'apollo-server-cache-redis';
import { Connection } from 'typeorm';
import { GraphQLSchema } from 'graphql';

// Keep these in memory because lamda will reuse them on cold starts
let app: any;
let cache: RedisCache | undefined;
let connection: Connection | undefined;
let schema: GraphQLSchema | undefined;

const main = async () => {
  ({ app, cache, connection, schema } = await start({
    currentApp: app,
    currentCache: cache,
    currentConnection: connection,
    currentSchema: schema,
  }));
};

main();
