import { Request, Response } from 'express';
import { UserContext } from 'types/userContext';
import { readAccessToken } from 'types/auth/selectors';

interface Context {
  req: Request;
  res: Response;
  user?: UserContext;
}

const middleware = ({ req, res }: { req: Request; res: Response }) => ({
  req,
  res,
  user: readAccessToken(req),
});

export { Context, middleware };
