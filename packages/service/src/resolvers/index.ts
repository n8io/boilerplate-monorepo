import { Login } from './user/login';
import { Me } from './user/me';
import { Register } from './user/register';
import { Users } from './user/users';
import { RevokeRefreshTokens } from './user/revokeRefreshTokens';

const resolvers = [Login, Me, Register, RevokeRefreshTokens, Users];

export { resolvers };
