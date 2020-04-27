import {
  decryptAccessToken,
  encryptAccessToken,
  generateResetToken,
  generateResetTokenExpiration,
  isUserActive,
  readAccessToken,
  readRefreshToken,
  writeRefreshToken,
} from './selectors';

const Auth = {
  decryptAccessToken,
  encryptAccessToken,
  generateResetToken,
  generateResetTokenExpiration,
  isUserActive,
  readAccessToken,
  readRefreshToken,
  writeRefreshToken,
};

export { Auth };
