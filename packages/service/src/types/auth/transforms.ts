import { Response } from 'express';
import { Enumeration } from './typedef';
import { User } from '../../entity/User';

const appendRefreshTokenToResponse = (res: Response, token: string) => {
  res.cookie(Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
  });
};

const toSafeLog = ({ email, id, username }: User) => ({ email, id, username });

export { appendRefreshTokenToResponse, toSafeLog };
