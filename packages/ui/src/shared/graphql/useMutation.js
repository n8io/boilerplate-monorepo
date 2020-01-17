import { useMutation } from '@apollo/client';
import { toData } from './toData';

const customUseMutation = (query, ...args) => {
  const [mutate, apolloProps] = useMutation(query, ...args);

  return [mutate, toData(apolloProps)];
};

export { customUseMutation as useMutation };
