import { gql } from '@apollo/client';
import { FetchPolicy } from '@boilerplate-monorepo/common';
import { evolve } from 'ramda';
import { DateTime } from 'types/dateTime';
import { useQuery } from '../useQuery';

export const QUERY_SYSTEM_TIME = gql`
  query systemTime {
    systemTime
  }
`;

const useSystemTime = (options) => {
  const results = useQuery(QUERY_SYSTEM_TIME, {
    fetchPolicy: FetchPolicy.NO_CACHE,
    ...options,
  });

  return evolve({ data: DateTime.apiToUi }, results);
};

export { useSystemTime };
