import { client } from 'db';
import { Auth } from 'types/auth';
import { loaders } from './loaders';

const make = overrides => ({ req, res }) => ({
  db: client,
  ip: req.ip,
  loaders,
  req,
  res,
  user: Auth.readAccessToken(req),
  ...overrides,
});

export { make };
