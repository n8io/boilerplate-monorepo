import { gql } from 'apollo-server-express';
import { userSave } from 'db/user/userSave';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError } from 'types/customError';
import { UserSelfUpdateNotFoundError } from 'types/customError/user/selfUpdate';
import { InternalErrorMessage } from 'types/errorMessage';

const MUTATION_NAME = 'userSelfUpdate';

const debugLog = logFactory({
  method: 'userSelfUpdate',
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { input }, context) => {
  const { user } = context;
  const { id } = user;

  debugLog('👾 UserSelfUpdate', input);

  let userSelf = null;

  try {
    userSelf = await userSave({ ...input, id }, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_DB_REQUEST, {
      error,
      id,
      input,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (!userSelf) {
    log.error(InternalErrorMessage.FAILED_TO_UPDATE_SELF_NOT_FOUND, {
      id,
      input,
    });

    throw new UserSelfUpdateNotFoundError();
  }

  return userSelf;
};

const typeDefs = gql`
  "The user's self update input"
  input UserSelfUpdateInput {
    "The user provided email address"
    email: String!
    "The user provided last name"
    familyName: String
    "The user provided first name"
    givenName: String
  }

  "Mutations"
  type Mutation {
    "The user self update mutation"
    userSelfUpdate(input: UserSelfUpdateInput!): UserSnapshot! @isAuthenticated
  }
`;

export { resolver, typeDefs };
