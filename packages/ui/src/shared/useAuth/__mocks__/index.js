const useAuth = () => ({
  isAuthenticated: true,
  logout: jest.fn().mockName('logout'),
  role: 'ADMIN',
  updateAccessToken: jest.fn().mockName('updateAccessToken'),
});

export { useAuth };
