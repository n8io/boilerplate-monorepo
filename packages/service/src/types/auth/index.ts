import {
  generateAccessToken,
  generateRefreshToken,
  isAuthenticated,
} from './selectors';
import { Enumeration } from './typedef';

const Auth = {
  ...Enumeration,
  generateAccessToken,
  generateRefreshToken,
  isAuthenticated,
};

export { Auth };
