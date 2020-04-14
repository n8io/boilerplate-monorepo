import * as UserDelete from './delete';
import * as UserLogin from './login';
import * as UserLogout from './logout';
import * as UserPasswordReset from './passwordReset';
import * as UserPasswordResetRequest from './passwordResetRequest';
import * as UserPasswordResetTokenValidate from './passwordResetTokenValidate';
import * as UserRecoveryFind from './recoveryFind';
import * as UserRegister from './register';
import * as UserRevokeRefreshTokens from './revokeRefreshTokens';
import * as UserSelf from './self';
import * as UserSelfSecurityUpdate from './selfSecurityUpdate';
import * as UserSelfUpdate from './selfUpdate';
import * as Users from './users';

const resolver = {
  Mutation: {
    userDelete: UserDelete.resolver,
    userLogin: UserLogin.resolver,
    userLogout: UserLogout.resolver,
    userPasswordReset: UserPasswordReset.resolver,
    userPasswordResetRequest: UserPasswordResetRequest.resolver,
    userRegister: UserRegister.resolver,
    userRevokeRefreshTokens: UserRevokeRefreshTokens.resolver,
    userSelfSecurityUpdate: UserSelfSecurityUpdate.resolver,
    userSelfUpdate: UserSelfUpdate.resolver,
  },
  Query: {
    userPasswordResetTokenValidate: UserPasswordResetTokenValidate.resolver,
    userRecoveryFind: UserRecoveryFind.resolver,
    userSelf: UserSelf.resolver,
    users: Users.resolver,
  },
};

const typeDefs = [
  UserDelete.typeDefs,
  UserLogin.typeDefs,
  UserLogout.typeDefs,
  UserPasswordReset.typeDefs,
  UserPasswordResetRequest.typeDefs,
  UserPasswordResetTokenValidate.typeDefs,
  UserRecoveryFind.typeDefs,
  UserRegister.typeDefs,
  UserRevokeRefreshTokens.typeDefs,
  UserSelf.typeDefs,
  UserSelfSecurityUpdate.typeDefs,
  UserSelfUpdate.typeDefs,
  Users.typeDefs,
];

export { resolver, typeDefs };
