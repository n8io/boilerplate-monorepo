import {
  encryptAccessToken,
  generateResetToken,
  isUserActive,
  readAccessToken,
  readRefreshToken,
  writeRefreshToken,
} from './selectors';

const Auth = {
  encryptAccessToken,
  generateResetToken,
  isUserActive,
  readAccessToken,
  readRefreshToken,
  writeRefreshToken,
};

export { Auth };
