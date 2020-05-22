import { User, UserRole } from '@boilerplate-monorepo/common';

const user = User.uiExample({ role: UserRole.ADMIN });

const useAuth = () => ({
  isAuthenticated: true,
  logout: jest.fn().mockName('logout'),
  role: user.role,
  updateAccessToken: jest.fn().mockName('updateAccessToken'),
  user,
});

export { useAuth };
