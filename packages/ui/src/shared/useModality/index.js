import { createContext, useContext } from 'react';

const ModalityContext = createContext();

const useModality = () => ({
  provider: ModalityContext.Provider,
  ...useContext(ModalityContext),
});

export { useModality };
