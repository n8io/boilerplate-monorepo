import * as ApolloClient from '@apollo/client';
import { useLazyQuery } from '.';

const { gql } = ApolloClient;

describe('useLazyQuery', () => {
  const options = {};
  const query = gql`
    query userSelf {
      userSelf {
        id
      }
    }
  `;
  let useLazyQueryApollo = null;

  beforeEach(() => {
    useLazyQueryApollo = td.replace(ApolloClient, 'useLazyQuery');
  });

  test('ensure we are passing back the proper object', () => {
    const called = false;
    const data = {};
    const error = {};
    const loading = false;

    const apolloResult = {
      called,
      data: { userSelf: data },
      error: {},
      loading: false,
    };

    const queryFn = jest.fn().mockName('query');

    const expected = [
      queryFn,
      {
        called,
        data,
        error,
        loading,
      },
    ];

    td.when(useLazyQueryApollo(query, options)).thenReturn([
      queryFn,
      apolloResult,
    ]);

    const actual = useLazyQuery(query, options);

    expect(actual).toEqual(expected);
  });
});
