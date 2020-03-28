import { genSalt } from 'bcryptjs';

export const PasswordSalt = {
  generate: genSalt,
};
