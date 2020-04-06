import { gql } from 'apollo-server-express';
import { userReadRaw } from 'db/user/userReadRaw';
import { userSave } from 'db/user/userSave';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import {
  DatabaseError,
  UserSelfNotFoundError,
  UserSelfSecurityUpdateMismatchError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Password } from 'types/password';

const MUTATION_NAME = 'userSelfSecurityUpdate';

const debugLog = logFactory({
  method: 'userSelfSecurityUpdate',
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { input }, context) => {
  const { user } = context;
  const { id } = user;
  const {
    passwordCurrent: clearTextPasswordCurrent,
    passwordNew: clearTextPasswordNew,
  } = input;

  debugLog('👾 UserSelfSecurityUpdate', input);

  let userSelf = null;

  try {
    userSelf = await userReadRaw({ id }, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, {
      error,
      query: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (!userSelf) {
    const errorData = {
      id: user.id,
      query: MUTATION_NAME,
      username: user.username,
    };

    log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, errorData);

    throw new UserSelfNotFoundError(errorData);
  }

  const { passwordHash } = userSelf;

  const isCurrentPasswordMatch = await Password.compare(
    clearTextPasswordCurrent,
    passwordHash
  );

  if (!isCurrentPasswordMatch) {
    const errorData = {
      id: user.id,
      query: MUTATION_NAME,
      username: user.username,
    };

    log.error(InternalErrorMessage.PASSWORD_MISMATCH, errorData);

    throw new UserSelfSecurityUpdateMismatchError(errorData);
  }

  const newHashedPassword = await Password.hash(clearTextPasswordNew);

  try {
    await userSave({ id, passwordHash: newHashedPassword }, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_UPDATE_SELF, {
      error,
      query: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  return true;
};

const typeDefs = gql`
  "The user's self security update input"
  input UserSelfSecurityUpdateInput {
    "The user's current password"
    passwordCurrent: String!
    "The user's new password"
    passwordNew: String!
  }

  "Mutations"
  type Mutation {
    "The user self security update mutation"
    userSelfSecurityUpdate(input: UserSelfSecurityUpdateInput!): Boolean!
      @isAuthenticated
  }
`;

export { resolver, typeDefs };
