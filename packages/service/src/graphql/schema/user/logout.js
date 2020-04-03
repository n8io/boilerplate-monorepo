import { gql } from 'apollo-server-express';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';

const debugLog = logFactory({ method: 'userLogout', module: 'resolvers/user' });

const resolver = (_parent, _args, context) => {
  const { res, user } = context;

  if (user) {
    debugLog('👾 UserLogout', { username: user.username });
  }

  Auth.writeRefreshToken(res);

  if (user) {
    debugLog(`✅ User logged out successfully`, { username: user.username });
  }

  return true;
};

const typeDefs = gql`
  "Mutations"
  type Mutation {
    "Logs the active user out (kills refresh 🍪)"
    userLogout: Boolean
  }
`;

export { resolver, typeDefs };
