import { ApolloError } from '@apollo/client';
import { toErrorMessage } from './toErrorMessage';

describe('toErrorMessage', () => {
  const t = (message) => `t(${message})`;

  describe('with an Apollo error', () => {
    const code = 'CODE';

    const makeApolloError = (overrides) =>
      new ApolloError({
        graphQLErrors: [{ extensions: { code } }],
        networkError: { message: 'Network no worky' },
        ...overrides,
      });

    describe('that is a network level error', () => {
      const error = makeApolloError({ graphQLErrors: null });

      test('returns the generic network error key', () => {
        expect(toErrorMessage(t, error)).toEqual(t('GENERIC_NETWORK_ERROR'));
      });
    });

    describe('that is a graphql error', () => {
      const error = makeApolloError({ networkError: null });

      test("returns the error's extension code", () => {
        expect(toErrorMessage(t, error)).toEqual(t(code));
      });
    });
  });

  describe('when not an Apollo error', () => {
    test("returns the error's message", () => {
      const message = 'MESSAGE';

      expect(toErrorMessage(t, new Error(message))).toEqual(message);
    });
  });
});
