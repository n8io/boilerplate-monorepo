import { Email } from './index';

describe('apiToMasked', () => {
  describe('when an email is NOT provided', () => {
    test('null returns null', () => {
      expect(Email.apiToMasked(null)).toBeNull();
    });

    test('undefined returns undefined', () => {
      expect(Email.apiToMasked()).toBeUndefined();
    });

    test('empty string returns empty string', () => {
      expect(Email.apiToMasked('')).toEqual('');
    });
  });

  describe('when an email is provided', () => {
    const email = Email.apiExample();

    test('returns a masked email', () => {
      expect(Email.apiToMasked(email)).toEqual('u***@*****n.com');
    });
  });
});
