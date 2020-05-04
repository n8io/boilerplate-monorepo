import { read } from './read';
import { readRaw } from './readRaw';
import { recoveryFind } from './recoveryFind';
import { register } from './register';
import { revokeRefreshTokens } from './revokeRefreshTokens';
import { save } from './save';

const user = {
  read,
  readRaw,
  recoveryFind,
  register,
  revokeRefreshTokens,
  save,
};

export { user };
