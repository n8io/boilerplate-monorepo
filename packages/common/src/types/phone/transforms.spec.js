import { Phone } from './index';

describe('apiToMasked', () => {
  describe('when an phone number is NOT provided', () => {
    test('null returns null', () => {
      expect(Phone.apiToMasked(null)).toBeNull();
    });

    test('undefined returns undefined', () => {
      expect(Phone.apiToMasked()).toBeUndefined();
    });

    test('empty string returns empty string', () => {
      expect(Phone.apiToMasked('')).toEqual('');
    });
  });

  describe('when an phone number is provided', () => {
    const phone = Phone.apiExample();
    const [plus, countryCode, firstDigit, ...rest] = phone;
    const lastFour = rest.slice(-4).join('');

    test('returns a masked phone', () => {
      expect(Phone.apiToMasked(phone)).toEqual(
        `${plus}${countryCode}(${firstDigit}**)***-${lastFour}`
      );
    });
  });
});
