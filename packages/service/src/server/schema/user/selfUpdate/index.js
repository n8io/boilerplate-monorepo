import { UserSnapshot } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError } from 'types/customError';
import { UserSelfUpdateNotFoundError } from 'types/customError/user/selfUpdate';
import { InternalErrorMessage } from 'types/errorMessage';
import { Telemetry } from 'types/telemetry';

const MUTATION_NAME = 'userSelfUpdate';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { input }, context) => {
  const { db, loaders, user } = context;
  const { user: userLoader } = loaders;
  const { id } = user;

  debugLog(`👾 ${MUTATION_NAME}`, input);

  const telemetry = {
    input,
    query: MUTATION_NAME,
    ...Telemetry.contextToLog(context),
    tags: {
      [Telemetry.Tag.COMPONENT]: Telemetry.Component.USER_SELF_UPDATE,
      [Telemetry.Tag.MODULE]: Telemetry.Module.RESOLVER,
    },
  };

  let userSelf = null;

  try {
    userSelf = await db.user.save({ ...input, id });
    userLoader.clear(id);
  } catch (error) {
    log.error(InternalErrorMessage.DATABASE_REQUEST_FAILED, {
      error,
      ...telemetry,
    });

    throw new DatabaseError();
  }

  if (!userSelf) {
    log.error(InternalErrorMessage.USER_SELF_UPDATE_FAILED_NOT_FOUND, {
      id,
      ...telemetry,
    });

    throw new UserSelfUpdateNotFoundError();
  }

  return UserSnapshot.make(userSelf);
};

const typeDefs = gql`
  "The user's self update input"
  input UserSelfUpdateInput {
    "The user provided email address"
    email: EmailAddress!
    "The user provided last name"
    familyName: String
    "The user provided first name"
    givenName: String
  }

  "Mutations"
  type Mutation {
    "The user self update mutation"
    ${MUTATION_NAME}(
      "The input for the user self update mutation"
      input: UserSelfUpdateInput!
    ): UserSnapshot! @isAuthenticated
  }
`;

export { resolver, typeDefs };
