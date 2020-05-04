import { UserRegisterInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import cuid from 'cuid';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Captcha } from 'types/captcha';
import {
  CaptchaError,
  DatabaseError,
  RegisterUserAlreadyExistsError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Password } from 'types/password';
import { RateLimit } from 'types/rateLimit';

const MUTATION_NAME = 'userRegister';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line complexity,max-statements
const resolver = async (_parent, { input }, context) => {
  await UserRegisterInput.validationSchemaServer.validate(input);

  debugLog(`👾 ${MUTATION_NAME}`, input);

  const {
    captchaToken,
    email,
    passwordNew: clearTextPassword,
    username,
  } = input;

  try {
    const {
      'error-codes': errorCodes,
      success: isTokenValid,
    } = await Captcha.isTokenValid(captchaToken);

    if (!isTokenValid) throw new Error(errorCodes.join(','));
  } catch (error) {
    log.error(InternalErrorMessage.CAPTCHA_ERROR, {
      captchaToken,
      email,
      mutation: MUTATION_NAME,
      username,
    });

    throw new CaptchaError({ email, username });
  }

  const { db } = context;

  let user = null;

  try {
    user = await db.user.read({ email, includeDeleted: true, username });
  } catch (error) {
    log.error(InternalErrorMessage.USER_REGISTER_FAILED, {
      error,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (user) {
    log.error(InternalErrorMessage.USER_REGISTER_FAILED, {
      existing: user,
      mutation: MUTATION_NAME,
      requested: input,
    });

    throw new RegisterUserAlreadyExistsError({ email, username });
  }

  const id = cuid();
  const passwordHash = await Password.hash(clearTextPassword);
  const newUser = UserRegisterInput.inputToDb(id, passwordHash, input);

  try {
    await db.user.register(newUser);
  } catch (error) {
    log.error(InternalErrorMessage.USER_REGISTER_FAILED, {
      error,
      input,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  debugLog(`✅ User registered successfully`, { email, id, username });

  return true;
};

const { burst: Burst, window: Window } = RateLimit.USER_REGISTER;

const typeDefs = gql`
  "The user register input"
  input UserRegisterInput {
    "The captcha token"
    captchaToken: String!
    "The user provided email address"
    email: EmailAddress!
    "The user provided last name"
    familyName: String!
    "The user provided first name"
    givenName: String!
    "The user provided clear text password"
    passwordNew: String!
    "The user provided username"
    username: String!
  }

  "Mutations"
  type Mutation {
    "The user register mutation"
    ${MUTATION_NAME}(input: UserRegisterInput!): Boolean!
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
