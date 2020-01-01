import {
  decryptAccessToken,
  decryptRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  isAuthenticated,
} from './selectors';
import { appendRefreshTokenToResponse, toSafeLog } from './transforms';
import { Enumeration } from './typedef';

const Auth = {
  ...Enumeration,
  appendRefreshTokenToResponse,
  decryptAccessToken,
  decryptRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  isAuthenticated,
  toSafeLog,
};

export { Auth };
