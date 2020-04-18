import { UserRecoveryFindInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { userRecoveryFind } from 'db/user/userRecoveryFind';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { InternalErrorMessage } from 'types/errorMessage';
import { RateLimit } from 'types/rateLimit';

const QUERY_NAME = 'userRecoveryFind';

const debugLog = logFactory({
  method: QUERY_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, input, context) => {
  const { account } = input;

  debugLog(`👾 ${QUERY_NAME}`, account);

  await UserRecoveryFindInput.validationSchema.validate(input);

  let user = null;

  try {
    user = await userRecoveryFind(
      { email: account, includeDeleted: true, username: account },
      context
    );
  } catch (error) {
    log.error(InternalErrorMessage.USER_FETCH_FAILED, {
      error,
      query: QUERY_NAME,
    });

    return null;
  }

  if (!user) {
    const errorData = {
      account,
      query: QUERY_NAME,
    };

    log.warn(InternalErrorMessage.USER_FETCH_FAILED, errorData);

    return null;
  }

  return user;
};

const { USER_ACCOUNT_RECOVERY_FIND } = RateLimit.Map;
const { burst: Burst, window: Window } = USER_ACCOUNT_RECOVERY_FIND;

const typeDefs = gql`
  "The user recovery type"
  type UserRecovery {
    email: String!
    id: ID!
  }

  type Query {
    "Find a given user to recover their account"
    ${QUERY_NAME}(account: String!): UserRecovery
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
