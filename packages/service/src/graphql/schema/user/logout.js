import { gql } from 'apollo-server-express';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import { RateLimit } from 'types/rateLimit';

const QUERY_NAME = 'userLogout';
const debugLog = logFactory({ method: QUERY_NAME, module: 'resolvers/user' });

const resolver = (_parent, _args, context) => {
  const { res, user } = context;

  if (user) {
    debugLog(`👾 ${QUERY_NAME}`, { username: user.username });
  }

  Auth.writeRefreshToken(res);

  if (user) {
    debugLog(`✅ User logged out successfully`, { username: user.username });
  }

  return true;
};

const { USER_LOGOUT } = RateLimit.Map;
const { burst: Limits } = USER_LOGOUT;

const typeDefs = gql`
  "Mutations"
  type Mutation {
    "Logs the active user out (kills refresh 🍪)"
    ${QUERY_NAME}: Boolean!
      @rateLimitBurst(limit: ${Limits.limit}, duration: ${Limits.duration})
  }
`;

export { resolver, typeDefs };
