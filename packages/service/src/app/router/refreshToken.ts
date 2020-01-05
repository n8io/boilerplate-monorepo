import { User } from 'entity/User';
import { Request, Response } from 'express';
import { Auth } from 'types/auth';
import { InternalErrorMessage } from 'types/errorMessage';
import { log } from 'log';

const sendResponse = (res: Response, token: string = '') =>
  res.send({ ok: Boolean(token), token });

const sendAuthorizedResponse = (res: Response, token: string) =>
  sendResponse(res, token);

const sendUnauthorizedResponse = (res: Response) => sendResponse(res);

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = Auth.readRefreshToken(req);

  if (!refreshToken) {
    return sendUnauthorizedResponse(res);
  }

  const user = await User.findOne({ id: refreshToken.id });

  if (!user) {
    log.error(InternalErrorMessage.USER_NOT_FOUND, refreshToken.id);

    return sendUnauthorizedResponse(res);
  }

  if (user.tokenVersion !== refreshToken.tokenVersion) {
    log.error(InternalErrorMessage.REFRESH_TOKEN_VERSION_MISMATCH, {
      id: refreshToken.id,
      tokenVersion: {
        dbUser: user.tokenVersion,
        refreshToken: refreshToken.tokenVersion,
      },
      username: refreshToken.username,
    });

    return sendUnauthorizedResponse(res);
  }

  Auth.writeRefreshToken(res, user);

  return sendAuthorizedResponse(res, Auth.encryptAccessToken(user));
};

export { refreshToken };
