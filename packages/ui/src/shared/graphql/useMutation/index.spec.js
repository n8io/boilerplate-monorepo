import * as ApolloClient from '@apollo/client';
import { useMutation } from '.';

const { gql } = ApolloClient;

describe('useMutation', () => {
  const options = {};
  const mutation = gql`
    mutation userLogin($input: UserLoginInput!) {
      userLogin(input: $input)
    }
  `;
  let useMutationApollo = null;

  beforeEach(() => {
    useMutationApollo = td.replace(ApolloClient, 'useMutation');
  });

  test('ensure we are passing back the proper object', () => {
    const mutationResult = {};
    const error = {};
    const loading = false;
    const mutate = jest.fn().mockName('mutate');
    const apolloResult = [
      mutate,
      {
        data: {
          mutationResult,
        },
        error: {},
        loading: false,
      },
    ];

    const expected = [
      mutate,
      {
        data: mutationResult,
        error,
        loading,
      },
    ];

    td.when(useMutationApollo(mutation, options)).thenReturn(apolloResult);

    const actual = useMutation(mutation, options);

    expect(actual).toEqual(expected);
  });
});
