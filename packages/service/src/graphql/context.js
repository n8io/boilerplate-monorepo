import { Models } from 'models';
import { readAccessToken } from 'types/auth/selectors';

const context = ({ req, res }) => ({
  Models,
  req,
  res,
  user: readAccessToken(req),
});

export { context };
