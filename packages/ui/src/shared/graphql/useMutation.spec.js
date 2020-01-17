import * as ApolloHooks from '@apollo/client';
import { Mutation } from './mutation';
import { useMutation } from './useMutation';

describe('useMutation', () => {
  const options = {};
  const mutation = Mutation.USER_LOGIN;
  let useMutationApollo = null;

  beforeEach(() => {
    useMutationApollo = td.replace(ApolloHooks, 'useMutation');
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
