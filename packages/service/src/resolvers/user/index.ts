import { UserDelete } from './delete';
import { UserLogin } from './login';
import { UserLogout } from './logout';
import { UserRegister } from './register';
import { UserRevokeRefreshTokens } from './revokeRefreshTokens';
import { UserSelf } from './self';
import { UserSelfUpdate } from './selfUpdate';
import { Users } from './users';

const resolvers = [
  UserLogin,
  UserLogout,
  UserRegister,
  UserRevokeRefreshTokens,
  UserSelf,
  UserDelete,
  UserSelfUpdate,
  Users,
];

export { resolvers };
