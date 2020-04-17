import { Models } from 'models';
import { readAccessToken } from 'types/auth/selectors';
import { loaders } from './loaders';

const context = ({ req, res }) => ({
  Models,
  ip: req.ip,
  loaders,
  req,
  res,
  user: readAccessToken(req),
});

export { context };
