import { ExampleError, makeSafeExample } from '.';

describe('safe example function creator', () => {
  const leafExample = makeSafeExample({
    leaf1: 'LEAF 1',
    leaf2: 'LEAF 2',
  });

  const nestedExample = makeSafeExample({
    leaf: leafExample(),
    nested1: 'NESTED 1',
    nested2: 'NESTED 2',
  });

  const rootExample = makeSafeExample({
    nested: nestedExample(),
    root1: 'ROOT 1',
    root2: 'ROOT 2',
  });

  describe('simple example', () => {
    test('returns defaults with no overrides', () => {
      const leaf = leafExample();

      expect(leaf).toEqual({
        leaf1: 'LEAF 1',
        leaf2: 'LEAF 2',
      });
    });

    test('merges overrides', () => {
      const leaf = leafExample({
        leaf2: 'OVERRIDE',
      });

      expect(leaf).toEqual({
        leaf1: 'LEAF 1',
        leaf2: 'OVERRIDE',
      });
    });

    test('raises error when unknown overrides provided', () => {
      expect(() => leafExample({ unknown: 'UNKNOWN' })).toThrow(ExampleError);
    });
  });

  describe('nested example', () => {
    test('returns deep defaults with no overrides', () => {
      const root = rootExample();

      expect(root).toEqual({
        nested: {
          leaf: {
            leaf1: 'LEAF 1',
            leaf2: 'LEAF 2',
          },
          nested1: 'NESTED 1',
          nested2: 'NESTED 2',
        },
        root1: 'ROOT 1',
        root2: 'ROOT 2',
      });
    });

    test('deep merges overrides', () => {
      const root = rootExample({
        nested: {
          leaf: {
            leaf2: 'OVERRIDE LEAF 2',
          },
          nested1: 'OVERRIDE NESTED 1',
        },
        root1: 'OVERRIDE ROOT 1',
      });

      expect(root).toEqual({
        nested: {
          leaf: {
            leaf1: 'LEAF 1',
            leaf2: 'OVERRIDE LEAF 2',
          },
          nested1: 'OVERRIDE NESTED 1',
          nested2: 'NESTED 2',
        },
        root1: 'OVERRIDE ROOT 1',
        root2: 'ROOT 2',
      });
    });

    test('raises error when unknown nested overrides provided', () => {
      expect(() =>
        rootExample({
          nested: {
            leaf: {
              unknown: 'UNKNOWN',
            },
          },
        })
      ).toThrow(ExampleError);
    });
  });

  describe('special cases', () => {
    test('overrides array', () => {
      const arrayExample = makeSafeExample({ array: [1, 2] });
      const example = arrayExample({ array: [10, 11, 12, 13] });

      expect(example).toEqual({
        array: [10, 11, 12, 13],
      });
    });

    test('overrides dates without deep-merging', () => {
      const override = new Date(2020, 10, 25);
      const dateExample = makeSafeExample({ date: new Date(2019, 3, 15) });
      const example = dateExample({ date: override });

      expect(example).toEqual({
        date: override,
      });
    });

    test('overrides function', () => {
      const functionExample = makeSafeExample({ someFunction: () => null });

      const override = jest.fn().mockName('someFunction');
      const example = functionExample({ someFunction: override });

      expect(example).toEqual({
        someFunction: override,
      });
    });
  });

  describe('when defaults are a function of overrides', () => {
    const derivedExample = makeSafeExample(({ base = 'BASE' }) => ({
      base,
      derived: `${base}-DERIVED`,
    }));

    test('returns derived defaults with no overrides', () => {
      const example = derivedExample();

      expect(example).toEqual({
        base: 'BASE',
        derived: 'BASE-DERIVED',
      });
    });

    test('derives values from overrides', () => {
      const example = derivedExample({
        base: 'OVERRIDE',
      });

      expect(example).toEqual({
        base: 'OVERRIDE',
        derived: 'OVERRIDE-DERIVED',
      });
    });

    test('allows derived props to be overridden', () => {
      const example = derivedExample({
        base: 'BASE_OVERRIDE',
        derived: 'DERIVED_OVERRIDE',
      });

      expect(example).toEqual({
        base: 'BASE_OVERRIDE',
        derived: 'DERIVED_OVERRIDE',
      });
    });
  });
});
