import { useContext } from 'react';
import { Context } from 'types/context';

const useIsInternetConnected = () => useContext(Context.INTERNET_CONNECTIVITY);

export { useIsInternetConnected };
