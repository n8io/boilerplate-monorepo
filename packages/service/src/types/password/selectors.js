import { compare, genSalt, hash as bCryptHash } from 'bcryptjs';

const hash = async clearTextPassword => {
  const salt = await genSalt();

  return bCryptHash(clearTextPassword, salt);
};

export { compare, hash };
