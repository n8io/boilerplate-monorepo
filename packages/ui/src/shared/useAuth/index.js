import { useContext } from 'react';
import { Context } from 'types/context';

const useAuth = () => useContext(Context.AUTH);

export { useAuth };
