import { useQuery } from '@apollo/client';
import { toData } from '../utils/toData';

const customUseQuery = (query, ...args) => toData(useQuery(query, ...args));

export { customUseQuery as useQuery };
