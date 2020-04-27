import { config } from 'config';
import cuid from 'cuid';
import { isAfter, isDate, parseISO } from 'date-fns';
import { addMinutes } from 'date-fns/fp';
import {
  JsonWebTokenError,
  sign,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import ms from 'ms';
import { pick, tail, unless } from 'ramda';
import { InternalErrorMessage } from 'types/errorMessage';
import { Password } from 'types/password';
import { Route } from 'types/route';
import { Enumeration } from './typedef';

const isPast = date => isAfter(new Date(), unless(isDate, parseISO)(date));

const {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} = config;

const toRefreshToken = pick([
  'email',
  'id',
  'role',
  'tokenVersion',
  'username',
]);

const toAccessToken = pick(['email', 'id', 'role', 'username']);

const encryptAccessToken = user =>
  sign(toAccessToken(user), ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

const generateResetToken = () => tail(cuid());

const generateResetTokenExpiration = () =>
  addMinutes(Password.RESET_TOKEN_EXPIRATION_IN_MINUTES, new Date());

const encryptRefreshToken = user =>
  sign(toRefreshToken(user), REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

const decryptAccessToken = token => verify(token, ACCESS_TOKEN_SECRET);

const decryptRefreshToken = token => verify(token, REFRESH_TOKEN_SECRET);

// eslint-disable-next-line max-statements
const readAccessToken = req => {
  const debugLog = logFactory({
    method: 'readAccessToken',
    module: 'auth',
  });

  const bearerToken = req.headers[Enumeration.AUTHORIZATION_HEADER];

  if (!bearerToken) {
    return null;
  }

  try {
    const [, token] = bearerToken.split(' ');

    return decryptAccessToken(token);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      debugLog('📆 Access token expired');
    } else if (error instanceof JsonWebTokenError) {
      log.error(InternalErrorMessage.ACCESS_TOKEN_READ_ISSUE, error.message);
    } else {
      log.error(InternalErrorMessage.GENERIC, error);
    }

    return null;
  }
};

const readRefreshToken = req => {
  const debugLog = logFactory({
    method: 'readRefreshToken',
    module: 'auth',
  });

  const token = req.cookies[Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME];

  if (!token) {
    debugLog('🤷‍♂️ Refresh token not provided');

    return null;
  }

  try {
    return decryptRefreshToken(token);
  } catch (error) {
    log.error(InternalErrorMessage.AUTH_REFRESH_TOKEN_DECRYPT_FAILED, error);
  }

  return null;
};

const writeRefreshToken = (res, user) => {
  const debugLog = logFactory({
    method: 'writeRefreshToken',
    module: 'auth',
  });

  const maxAge = ms(REFRESH_TOKEN_EXPIRY);

  const options = {
    httpOnly: true,
    maxAge,
    path: Route.REFRESH_TOKEN,
    secure: NODE_ENV === 'production',
  };

  if (!user) {
    debugLog('🔥 Removing refresh token cookie value');
    res.cookie(Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME, '', options);

    return res;
  }

  const token = encryptRefreshToken(user);

  res.cookie(Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME, token, options);

  return res;
};

const isUserActive = user => {
  if (!user) return false;

  /* eslint-disable camelcase */
  const { deleted_at, deletedAt } = user;

  const deletedDate = deleted_at || deletedAt;

  return !deletedDate || !isPast(deletedDate);
  /* eslint-enable camelcase */
};

export {
  decryptAccessToken,
  decryptRefreshToken,
  encryptAccessToken,
  encryptRefreshToken,
  generateResetToken,
  generateResetTokenExpiration,
  isUserActive,
  readAccessToken,
  readRefreshToken,
  writeRefreshToken,
};
