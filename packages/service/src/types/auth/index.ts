import {
  encryptAccessToken,
  isAuthenticated,
  readAccessToken,
  readRefreshToken,
  writeRefreshToken,
} from './selectors';
import { toSafeLog } from './transforms';

const Auth = {
  encryptAccessToken,
  isAuthenticated,
  readAccessToken,
  readRefreshToken,
  toSafeLog,
  writeRefreshToken,
};

export { Auth };
