import * as ApolloClient from '@apollo/client';
import { useQuery } from '.';

const { gql } = ApolloClient;

describe('useQuery', () => {
  const options = {};
  const query = gql`
    query userSelf {
      userSelf {
        id
      }
    }
  `;
  let useQueryApollo = null;

  beforeEach(() => {
    useQueryApollo = td.replace(ApolloClient, 'useQuery');
  });

  test('ensure we are passing back the proper object', () => {
    const data = {};
    const error = {};
    const loading = false;

    const apolloResult = {
      data: { userSelf: data },
      error: {},
      loading: false,
    };

    const expected = {
      data,
      error,
      loading,
    };

    td.when(useQueryApollo(query, options)).thenReturn(apolloResult);

    const actual = useQuery(query, options);

    expect(actual).toEqual(expected);
  });
});
