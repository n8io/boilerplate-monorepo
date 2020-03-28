import { client } from 'db';
import { Models } from 'models';
import { readAccessToken } from 'types/auth/selectors';

const context = ({ req, res }) => ({
  Models,
  db: client,
  req,
  res,
  user: readAccessToken(req),
});

export { context };
