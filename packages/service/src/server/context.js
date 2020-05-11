import cuid from 'cuid';
import { client } from 'db';
import { Auth } from 'types/auth';
import { loaders } from './loaders';

const make = (overrides) => ({ req, res }) => ({
  db: client,
  ip: req.ip,
  loaders,
  req,
  requestId: cuid(),
  res,
  user: Auth.readAccessToken(req),
  ...overrides,
});

export { make };
