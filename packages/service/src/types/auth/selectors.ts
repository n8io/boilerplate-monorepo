import { User } from 'entity/User';
import { Request, Response } from 'express';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { log } from 'logger';
import { MiddlewareFn } from 'type-graphql';
import { AccessToken } from 'types/accessToken';
import { AuthError, PublicError } from 'types/error';
import { RefreshToken } from 'types/refreshToken';
import { Context } from '../context';
import { ProcessEnvKeys } from '../processEnv';
import { Enumeration } from './typedef';

const toRefreshToken = ({ email, id, tokenVersion, username }: User) =>
  ({ email, id, tokenVersion, username } as RefreshToken);

const toAccessToken = ({ email, id, username }: User) =>
  ({ email, id, username } as AccessToken);

const encryptAccessToken = (user: User) =>
  sign(toAccessToken(user), process.env[ProcessEnvKeys.ACCESS_TOKEN_SECRET]!, {
    expiresIn: process.env[ProcessEnvKeys.ACCESS_TOKEN_EXPIRY],
  });

const encryptRefreshToken = (user: User) =>
  sign(
    toRefreshToken(user),
    process.env[ProcessEnvKeys.REFRESH_TOKEN_SECRET]!,
    {
      expiresIn: process.env[ProcessEnvKeys.REFRESH_TOKEN_EXPIRY],
    }
  );

const decryptAccessToken = (token: string): AccessToken =>
  verify(
    token,
    process.env[ProcessEnvKeys.ACCESS_TOKEN_SECRET]!
  ) as AccessToken;

const decryptRefreshToken = (token: string): RefreshToken =>
  verify(
    token,
    process.env[ProcessEnvKeys.REFRESH_TOKEN_SECRET]!
  ) as RefreshToken;

const readAccessToken = (req: Request): AccessToken | null => {
  const bearerToken = req.headers[Enumeration.AUTHORIZATION_HEADER];

  if (!bearerToken) {
    log.error(AuthError.ACCESS_TOKEN_NOT_PROVIDED);

    return null;
  }

  try {
    const [, token] = (bearerToken as string).split(' ');

    return decryptAccessToken(token);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      log.error(AuthError.ACCESS_TOKEN_EXPIRED);
    } else {
      log.error(AuthError.GENERIC, error);
    }

    return null;
  }
};

const readRefreshToken = (req: Request) => {
  const token = req.cookies[Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME];

  if (!token) {
    log.error(AuthError.REFRESH_TOKEN_COOKIE_NOT_FOUND);

    return null;
  }

  try {
    return decryptRefreshToken(token);
  } catch (error) {
    log.error(AuthError.FAILED_TO_DECRYPT_REFRESH_TOKEN);
  }

  return null;
};

const writeRefreshToken = (res: Response, user: User) => {
  const token = encryptRefreshToken(user);

  res.cookie(Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
  });
};

const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  const { req } = context;

  try {
    const token = readAccessToken(req);

    if (token) {
      context.token = token;
    } else {
      throw new Error(PublicError.UNAUTHORIZED);
    }
  } catch (error) {
    throw new Error(PublicError.UNAUTHORIZED);
  }

  return next();
};

export {
  encryptAccessToken,
  isAuthenticated,
  readAccessToken,
  readRefreshToken,
  writeRefreshToken,
};
