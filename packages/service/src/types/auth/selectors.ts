import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../context';
import { ProcessEnvKeys } from '../processEnv';
import { Enumeration } from './typedef';

const UNAUTHORIZED = 'Not authorized';

const toRefreshToken = ({ email, id, tokenVersion, username }: any) => ({
  email,
  id,
  tokenVersion,
  username,
});

const toAccessToken = ({ email, id, username }: any) => ({
  email,
  id,
  username,
});

const generateAccessToken = (user: User) =>
  sign(toAccessToken(user), process.env[ProcessEnvKeys.ACCESS_TOKEN_SECRET]!, {
    expiresIn: process.env[ProcessEnvKeys.ACCESS_TOKEN_EXPIRY],
  });

const generateRefreshToken = (user: User) =>
  sign(
    toRefreshToken(user),
    process.env[ProcessEnvKeys.REFRESH_TOKEN_SECRET]!,
    {
      expiresIn: process.env[ProcessEnvKeys.REFRESH_TOKEN_EXPIRY],
    }
  );

const decryptAccessToken = (token: string) =>
  verify(token, process.env[ProcessEnvKeys.ACCESS_TOKEN_SECRET]!);

const decryptRefreshToken = (token: string) =>
  verify(token, process.env[ProcessEnvKeys.REFRESH_TOKEN_SECRET]!);

const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  const bearerToken = context.req.headers[Enumeration.AUTHORIZATION_HEADER];

  if (!bearerToken) {
    throw new Error(UNAUTHORIZED);
  }

  let payload: any = null;
  try {
    const [, token] = (bearerToken as string).split(' ');

    payload = decryptAccessToken(token);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error('🛑 Access token expired');
    } else {
      console.error('🛑', error);
    }

    throw new Error(UNAUTHORIZED);
  }

  context.payload = payload;

  return next();
};

export {
  decryptAccessToken,
  decryptRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  isAuthenticated,
};
