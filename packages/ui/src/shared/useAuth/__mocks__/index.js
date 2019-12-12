const useAuth = () => ({
  isAuthenticated: true,
  login: jest.fn().mockName('login'),
  logout: jest.fn().mockName('logout'),
});

export { useAuth };
