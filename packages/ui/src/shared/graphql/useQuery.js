import { useQuery } from '@apollo/client';
import { toData } from './toData';

const customUseQuery = (query, ...args) => toData(useQuery(query, ...args));

export { customUseQuery as useQuery };
