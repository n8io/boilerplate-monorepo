import { Request, Response } from 'express';
import { AccessToken } from 'types/accessToken';

interface Context {
  req: Request;
  res: Response;
  token?: AccessToken;
}

export { Context };
