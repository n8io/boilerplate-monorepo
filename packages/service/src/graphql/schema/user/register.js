import { gql } from 'apollo-server-express';
import { hash } from 'bcryptjs';
import cuid from 'cuid';
import { userRead } from 'db/user/userRead';
import { userRegister } from 'db/user/userRegister';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import {
  DatabaseError,
  RegisterUserAlreadyExistsError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { PasswordSalt } from 'types/passwordSalt';
import { RateLimit } from 'types/rateLimit';
import { UserRole } from 'types/userRole';

const MUTATION_NAME = 'userRegister';

const debugLog = logFactory({
  method: 'userRegister',
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { input }, context) => {
  const {
    email,
    familyName,
    givenName,
    password: clearTextPassword,
    role = UserRole.USER,
    username,
  } = input;

  const salt = await PasswordSalt.generate();
  const passwordHash = await hash(clearTextPassword, salt);
  let user = null;

  debugLog('👾 UserRegister', {
    email,
    familyName,
    givenName,
    password: '*** redacted ***',
    role,
    username,
  });

  try {
    user = await userRead({ email, username }, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
      error,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (user) {
    log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
      existing: Auth.toSafeLog(user),
      mutation: MUTATION_NAME,
      requested: { email, username },
    });

    throw new RegisterUserAlreadyExistsError({ email, username });
  }

  const id = cuid();

  try {
    await userRegister(
      {
        email,
        familyName,
        givenName,
        id,
        passwordHash,
        role,
        username,
      },
      context
    );
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
      email,
      error,
      familyName,
      givenName,
      mutation: MUTATION_NAME,
      username,
    });
  }

  debugLog(`✅ User registered successfully`, { email, id, username });

  return true;
};

const { USER_REGISTER } = RateLimit.Map;
const { burst: Burst, window: Window } = USER_REGISTER;

const typeDefs = gql`
  "The user register input"
  input UserRegisterInput {
    "The user provided email address"
    email: String!
    "The user provided last name"
    familyName: String!
    "The user provided first name"
    givenName: String!
    "The user provided clear text password"
    password: String!
    "The user provided username"
    username: String!
  }

  "Mutations"
  type Mutation {
    "The user register mutation"
    userRegister(input: UserRegisterInput!): Boolean
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
