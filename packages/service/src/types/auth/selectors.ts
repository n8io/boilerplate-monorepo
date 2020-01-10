import { AuthenticationError } from 'apollo-server-express';
import { isAfter } from 'date-fns';
import 'dotenv/config';
import { User } from 'entity/User';
import { Request, Response } from 'express';
import { JsonWebTokenError, sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { log } from 'log';
import { AuthChecker } from 'type-graphql';
import { Context } from 'types/context';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ProcessEnvKeys } from 'types/processEnv';
import { RefreshToken } from 'types/refreshToken';
import { UserContext } from 'types/userContext';
import { UserRole } from 'types/userRole';
import { Enumeration } from './typedef';

const isPast = (date: Date) => isAfter(new Date(), date);

const toRefreshToken = ({
  email,
  id,
  role,
  tokenVersion,
  username,
}: User): RefreshToken => ({ email, id, role, tokenVersion, username });

const toAccessToken = ({ email, id, role, username }: User): UserContext => ({
  email,
  id,
  role,
  username,
});

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

const decryptAccessToken = (token: string): UserContext =>
  verify(
    token,
    process.env[ProcessEnvKeys.ACCESS_TOKEN_SECRET]!
  ) as UserContext;

const decryptRefreshToken = (token: string): RefreshToken =>
  verify(
    token,
    process.env[ProcessEnvKeys.REFRESH_TOKEN_SECRET]!
  ) as RefreshToken;

const readAccessToken = (req: Request): UserContext | null => {
  const bearerToken = req.headers[Enumeration.AUTHORIZATION_HEADER];

  if (!bearerToken) {
    return null;
  }

  try {
    const [, token] = (bearerToken as string).split(' ');

    return decryptAccessToken(token);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      log.error(InternalErrorMessage.ACCESS_TOKEN_EXPIRED);
    } else if (error instanceof JsonWebTokenError) {
      log.error(InternalErrorMessage.ACCESS_TOKEN_READ_ISSUE, error.message);
    }
    else {
      log.error(InternalErrorMessage.GENERIC, error);
    }

    return null;
  }
};

const readRefreshToken = (req: Request) => {
  const token = req.cookies[Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME];

  if (!token) {
    log.error(InternalErrorMessage.REFRESH_TOKEN_COOKIE_NOT_FOUND);

    return null;
  }

  try {
    return decryptRefreshToken(token);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_DECRYPT_REFRESH_TOKEN);
  }

  return null;
};

const writeRefreshToken = (res: Response, user: User) => {
  const token = encryptRefreshToken(user);

  res.cookie(Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
  });
};

const authChecker: AuthChecker<Context, UserRole> = ({ context }, roles) => {
  const { user } = context;

  if (!user) {
    // No user present, restrict access
    throw new AuthenticationError(PublicErrorMessage.UNAUTHORIZED);
  }

  if (roles.length === 0) {
    // Valid user and no role restrictions, grant access
    return true;
  }

  if (roles.includes(user.role)) {
    // Grant access if the roles overlap
    return true;
  }

  // No roles matched, restrict access
  throw new AuthenticationError(PublicErrorMessage.UNAUTHORIZED);
};

const isUserActive = (user: User) => !user.deletedAt || !isPast(user.deletedAt);

export { authChecker, encryptAccessToken, isUserActive, readAccessToken, readRefreshToken, writeRefreshToken, };
