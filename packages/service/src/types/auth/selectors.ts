import { sign, verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../context';
import { ProcessEnvKeys } from '../processEnv';
import { Enumeration } from './typedef';

const UNAUTHORIZED = 'Not authorized';

const toToken = ({ email, id }: any) => ({ email, id });

const generateAccessToken = (user: User) =>
  sign(toToken(user), process.env[ProcessEnvKeys.ACCESS_TOKEN_SECRET]!, {
    expiresIn: process.env[ProcessEnvKeys.ACCESS_TOKEN_EXPIRY],
  });

const generateRefreshToken = (user: User) =>
  sign(toToken(user), process.env[ProcessEnvKeys.REFRESH_TOKEN_SECRET]!, {
    expiresIn: process.env[ProcessEnvKeys.REFRESH_TOKEN_EXPIRY],
  });

const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  const bearerToken = context.req.headers[Enumeration.AUTHORIZATION_HEADER];

  if (!bearerToken) {
    throw new Error(UNAUTHORIZED);
  }

  try {
    const [, token] = (bearerToken as string).split(' ');

    const payload = verify(
      token,
      process.env[ProcessEnvKeys.ACCESS_TOKEN_SECRET]!
    );

    context.payload = payload as any;
  } catch (err) {
    console.error(err);

    throw new Error(UNAUTHORIZED);
  }

  return next();
};

export { generateAccessToken, generateRefreshToken, isAuthenticated };
