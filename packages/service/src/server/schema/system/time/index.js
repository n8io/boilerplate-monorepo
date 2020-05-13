import { gql } from 'apollo-server-express';
import { logFactory } from 'log/logFactory';

const debugLog = logFactory({ method: 'time', module: 'resolvers/system' });

const resolver = () => {
  debugLog('👾 SystemTime');

  return new Date();
};

const typeDefs = gql`
  type Query {
    "Returns the current system time"
    systemTime: DateTime!
  }
`;

export { resolver, typeDefs };
