import { PaginationInput } from 'types/paginationInput';

const { isValid } = PaginationInput;

describe('user input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = PaginationInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });
});
