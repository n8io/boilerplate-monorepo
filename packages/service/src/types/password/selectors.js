import {
  compare as bcryptCompare,
  genSalt,
  hash as bCryptHash,
} from 'bcryptjs';
import { config } from 'config';

const hash = async (clearTextPassword) => {
  const salt = await genSalt();

  return bCryptHash(clearTextPassword, salt);
};

const compare = (clearTextPassword, passwordHash) => {
  if (config.isDevelopment && !config.isTest) return true;

  return bcryptCompare(clearTextPassword, passwordHash);
};

export { compare, hash };
