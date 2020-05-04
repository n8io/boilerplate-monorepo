import { client as db } from 'db';
import { log } from 'log';
import { Models } from 'models';
import { Auth } from 'types/auth';
import { InternalErrorMessage } from 'types/errorMessage';

const sendResponse = (res, token = '') =>
  res.send({ ok: Boolean(token), token });

const sendAuthorizedResponse = (res, user) => {
  const token = Auth.encryptAccessToken(user);

  Auth.writeRefreshToken(res, user);

  return sendResponse(res, token);
};

const sendUnauthorizedResponse = res => {
  // Write empty refresh token
  Auth.writeRefreshToken(res, undefined);

  return sendResponse(res);
};

// eslint-disable-next-line max-statements
const refreshToken = async (req, res) => {
  const actualToken = Auth.readRefreshToken(req);

  if (!actualToken) {
    return sendUnauthorizedResponse(res);
  }

  const user = await db.user.read({ id: actualToken.id }, { Models });

  if (!user) {
    log.error(InternalErrorMessage.USER_NOT_FOUND, actualToken.id);

    return sendUnauthorizedResponse(res);
  }

  if (user.tokenVersion !== actualToken.tokenVersion) {
    log.error(InternalErrorMessage.AUTH_REFRESH_TOKEN_VERSION_MISMATCH, {
      id: actualToken.id,
      tokenVersion: {
        dbUser: user.tokenVersion,
        refreshToken: actualToken.tokenVersion,
      },
      username: actualToken.username,
    });

    return sendUnauthorizedResponse(res);
  }

  return sendAuthorizedResponse(res, user);
};

export { refreshToken };
