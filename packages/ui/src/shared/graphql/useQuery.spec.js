import * as ApolloHooks from '@apollo/client';
import { Query } from './query';
import { useQuery } from './useQuery';

describe('useQuery', () => {
  const options = {};
  let useQueryApollo = null;

  beforeEach(() => {
    useQueryApollo = td.replace(ApolloHooks, 'useQuery');
  });

  test('ensure we are passing back the proper object', () => {
    const data = {};
    const error = {};
    const loading = false;
    const apolloResult = {
      data: {
        me: data,
      },
      error: {},
      loading: false,
    };

    const expected = {
      data,
      error,
      loading,
    };

    td.when(useQueryApollo(Query.ME, options)).thenReturn(apolloResult);

    const actual = useQuery(Query.ME, options);

    expect(actual).toEqual(expected);
  });
});
