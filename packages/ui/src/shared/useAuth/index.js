import { createContext, useContext } from 'react';

const AuthContext = createContext();

const useAuth = () => ({
  provider: AuthContext.Provider,
  ...useContext(AuthContext),
});

export { useAuth };
