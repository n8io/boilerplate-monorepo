import { Login } from './user/login';
import { Me } from './user/me';
import { Register } from './user/register';
import { RevokeRefreshTokens } from './user/revokeRefreshTokens';
import { UserDelete } from './user/userDelete';
import { Users } from './user/users';

const resolvers = [Login, Me, Register, RevokeRefreshTokens, UserDelete, Users];

export { resolvers };
