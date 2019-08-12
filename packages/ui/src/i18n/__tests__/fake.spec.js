import { transformFake } from '../fake';

describe('fake translation', () => {
  describe('fake-translating a string', () => {
    test('adds start and end delimiters', () => {
      expect(transformFake('string')).toMatch(/^\[.*\]$/u);
    });

    test('converts characters to similar equivalents', () => {
      expect(transformFake('Abc 123')).toMatch(/Ā𝒃ç ①②③/u);
    });

    test('pads the string length by at least 40%', () => {
      expect(transformFake('1234567890').length).toBeGreaterThanOrEqual(14);
    });

    test('preserves interpolation tags', () => {
      expect(
        transformFake('string {{with}} interpolation {{tags}} embedded')
      ).toMatch(/\{\{with\}\}.*\{\{tags\}\}/u);
    });
  });
});
