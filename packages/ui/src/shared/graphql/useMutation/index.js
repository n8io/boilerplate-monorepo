import { useMutation } from '@apollo/client';
import { toData } from '../utils/toData';

const customUseMutation = (query, ...args) => {
  const [mutate, apolloProps] = useMutation(query, ...args);

  return [mutate, toData(apolloProps)];
};

export { customUseMutation as useMutation };
