import { UserSnapshot } from '@boilerplate-monorepo/common';
import { client as db } from 'db';
import { log } from 'log';
import { Auth } from 'types/auth';
import { InternalErrorMessage } from 'types/errorMessage';
import { Telemetry } from 'types/telemetry';

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

  const user = await db.user.readRaw({ id: actualToken.id });

  if (!user) {
    log.error(InternalErrorMessage.USER_NOT_FOUND, {
      tags: {
        [Telemetry.Tag.COMPONENT]: Telemetry.Component.REFRESH_TOKEN,
        [Telemetry.Tag.MODULE]: Telemetry.Module.AUTH,
      },
      token: { id: actualToken.id },
    });

    return sendUnauthorizedResponse(res);
  }

  if (user.tokenVersion !== actualToken.tokenVersion) {
    log.error(InternalErrorMessage.AUTH_REFRESH_TOKEN_VERSION_MISMATCH, {
      mismatch: {
        client: actualToken.tokenVersion,
        db: user.tokenVersion,
      },
      tags: {
        [Telemetry.Tag.COMPONENT]: Telemetry.Component.REFRESH_TOKEN,
        [Telemetry.Tag.MODULE]: Telemetry.Module.AUTH,
      },
      user: UserSnapshot.make(user),
    });

    return sendUnauthorizedResponse(res);
  }

  return sendAuthorizedResponse(res, user);
};

export { refreshToken };
