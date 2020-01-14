import { UserDelete } from './delete';
import { UserLogin } from './login';
import { UserLogout } from './logout';
import { Me } from './me';
import { UserRegister } from './register';
import { UserRevokeRefreshTokens } from './revokeRefreshTokens';
import { Users } from './users';

const resolvers = [
  Me,
  UserLogin,
  UserLogout,
  UserRegister,
  UserRevokeRefreshTokens,
  UserDelete,
  Users,
];

export { resolvers };
