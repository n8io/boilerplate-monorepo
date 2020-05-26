import { LocalStorage } from '@boilerplate-monorepo/ui-common';
import { AnonymousId } from '.';

jest.mock('cuid', () => () => 'CUID');

describe('AnonymousId', () => {
  const anonymousId = 'anonymous-CUID';

  describe('read', () => {
    test('tries to fetch the key from storage', () => {
      AnonymousId.read();

      expect(localStorage.getItem).toHaveBeenCalledWith(
        LocalStorage.ANONYMOUS_ID
      );
    });

    describe('when no id is set', () => {
      test('should generate a new one in storage', () => {
        AnonymousId.read();

        expect(localStorage.__STORE__[LocalStorage.ANONYMOUS_ID]).toEqual(
          anonymousId
        );
      });
    });
  });

  test('set updates the value in storage', () => {
    AnonymousId.set();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LocalStorage.ANONYMOUS_ID,
      'anonymous-CUID'
    );
  });

  test('set returns the new id', () => {
    const id = AnonymousId.set();

    expect(id).toEqual('anonymous-CUID');
  });

  test('clear removes the key from storage', () => {
    AnonymousId.clear();

    expect(localStorage.removeItem).toHaveBeenCalledWith(
      LocalStorage.ANONYMOUS_ID
    );
  });
});
