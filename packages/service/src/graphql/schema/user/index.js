import * as UserDelete from './delete';
import * as UserLogin from './login';
import * as UserLogout from './logout';
import * as UserRegister from './register';
import * as UserRevokeRefreshTokens from './revokeRefreshTokens';
import * as UserSelf from './self';
import * as UserSelfUpdate from './selfUpdate';
import * as Users from './users';

const resolver = {
  Mutation: {
    userDelete: UserDelete.resolver,
    userLogin: UserLogin.resolver,
    userLogout: UserLogout.resolver,
    userRegister: UserRegister.resolver,
    userRevokeRefreshTokens: UserRevokeRefreshTokens.resolver,
    userSelfUpdate: UserSelfUpdate.resolver,
  },
  Query: {
    userSelf: UserSelf.resolver,
    users: Users.resolver,
  },
};

const typeDefs = [
  UserDelete.typeDefs,
  UserLogin.typeDefs,
  UserLogout.typeDefs,
  UserRegister.typeDefs,
  UserRevokeRefreshTokens.typeDefs,
  UserSelf.typeDefs,
  UserSelfUpdate.typeDefs,
  Users.typeDefs,
];

export { resolver, typeDefs };
