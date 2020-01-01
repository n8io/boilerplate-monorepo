import { Login } from './user/login';
import { Register } from './user/register';
import { Users } from './user/users';
import { RevokeRefreshTokens } from './user/revokeRefreshTokens';

const resolvers = [Login, Register, RevokeRefreshTokens, Users];

export { resolvers };
