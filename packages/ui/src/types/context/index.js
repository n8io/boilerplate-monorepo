import { createContext } from 'react';

const Context = {
  AUTH: createContext(),
  FEATURE_FLAGS: createContext(),
  INTERNET_CONNECTIVITY: createContext(),
  MODALITY: createContext(),
  THEME_SWITCHER: createContext(),
};

export { Context };
