import { FeatureFlagValue } from 'types/featureFlagValue';
import { FeatureFlag } from '.';

describe('FeatureFlag selectors', () => {
  describe('isEnabled', () => {
    const tests = [
      { expected: false, input: FeatureFlagValue.CONTROL },
      { expected: false, input: FeatureFlagValue.OFF },
      { expected: true, input: FeatureFlagValue.ON },
    ];

    tests.forEach((t) => {
      test(`returns ${t.expected} when ${t.input}`, () => {
        expect(FeatureFlag.isEnabled(t.input)).toEqual(t.expected);
      });
    });
  });
});
