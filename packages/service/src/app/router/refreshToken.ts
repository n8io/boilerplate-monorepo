import { User } from 'entity/User';
import { Request, Response } from 'express';
import { Auth } from 'types/auth';

const FAILED_TO_DECRYPT_REFRESH_TOKEN = '🛑 Refresh token is invalid';

const sendResponse = (res: Response, token: string = '') =>
  res.send({ ok: Boolean(token), token });

const sendAuthorizedResponse = (res: Response, token: string) =>
  sendResponse(res, token);

const sendUnauthorizedResponse = (res: Response) => sendResponse(res);

const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies[Auth.JWT_REFRESH_TOKEN_COOKIE_NAME];

  if (!token) {
    return sendUnauthorizedResponse(res);
  }

  let payload: any = null;

  try {
    payload = Auth.decryptRefreshToken(token);
  } catch {
    console.error(FAILED_TO_DECRYPT_REFRESH_TOKEN);

    return sendUnauthorizedResponse(res);
  }

  const user = await User.findOne({ id: payload.id });

  if (!user) {
    return sendUnauthorizedResponse(res);
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return sendUnauthorizedResponse(res);
  }

  // Regenerate and append refresh token cookie
  Auth.appendRefreshTokenToResponse(res, Auth.generateRefreshToken(user));

  return sendAuthorizedResponse(res, Auth.generateAccessToken(user));
};

export { refreshToken };
