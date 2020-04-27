import { FileSystem } from 'types/fileSystem';

jest.mock('fs', () => ({
  readFile: jest.fn().mockName('readFile'),
}));

describe('FileSystem selectors', () => {
  describe('with readFile', () => {
    test('returns a promise', () => {
      const actual = FileSystem.readFile('path/to/file');

      expect(typeof actual.then).toEqual('function');
    });
  });
});
