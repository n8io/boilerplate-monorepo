import { UserRegisterInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import cuid from 'cuid';
import { userRead } from 'db/user/userRead';
import { userRegister } from 'db/user/userRegister';
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

  let user = null;

  try {
    user = await userRead({ email, includeDeleted: true, username }, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (user) {
    log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
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
    await userRegister(newUser, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
      error,
      input,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  debugLog(`✅ User registered successfully`, { email, id, username });

  return true;
};

const { USER_REGISTER } = RateLimit.Map;
const { burst: Burst, window: Window } = USER_REGISTER;

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