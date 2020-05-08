import {
  UserRecovery,
  UserRecoveryFindInput,
} from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { pick, pipe } from 'ramda';
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
  const { db } = context;

  debugLog(`👾 ${QUERY_NAME}`, account);

  await UserRecoveryFindInput.validationSchema.validate(input);

  let user = null;

  try {
    user = await db.user.recoveryFind({
      email: account,
      includeDeleted: true,
      username: account,
    });
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

  const toPropsOfInterest = pick(['email', 'id']);
  const transform = pipe(UserRecovery.apiToMasked, toPropsOfInterest);

  return transform(user);
};

const { burst: Burst, window: Window } = RateLimit.USER_ACCOUNT_RECOVERY_FIND;

const typeDefs = gql`
  "The user recovery type"
  type UserRecovery {
    "The user's masked email. E.g. n***@****l.com"
    email: String!
    "The user's id"
    id: ID!
  }

  type Query {
    "Find a given user to recover their account"
    ${QUERY_NAME}(
      "The user's email address or username"
      account: String!
    ): UserRecovery
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
