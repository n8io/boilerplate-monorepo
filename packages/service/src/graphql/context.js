import { Models } from 'models';
import { readAccessToken } from 'types/auth/selectors';

const context = ({ req, res }) => ({
  Models,
  ip: req.ip,
  req,
  res,
  user: readAccessToken(req),
});

export { context };
