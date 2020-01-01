import { User } from 'entity/User';
import { Request, Response } from 'express';
import { Auth } from 'types/auth';
import { AuthError } from 'types/error';

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
    console.error(`🛑 ${AuthError.USER_DOES_NOT_EXIST}`, refreshToken.id);

    return sendUnauthorizedResponse(res);
  }

  if (user.tokenVersion !== refreshToken.tokenVersion) {
    console.error(`🛑 ${AuthError.REFRESH_TOKEN_VERSION_MISMATCH}`, {
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
