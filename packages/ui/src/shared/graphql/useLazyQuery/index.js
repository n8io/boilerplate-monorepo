import { useLazyQuery } from '@apollo/client';
import { toData } from '../utils/toData';

const customUseLazyQuery = (query, ...args) => {
  const [queryFn, results] = useLazyQuery(query, ...args);

  return [queryFn, toData(results)];
};

export { customUseLazyQuery as useLazyQuery };
