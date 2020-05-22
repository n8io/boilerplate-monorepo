import { FeatureFlag, FeatureFlagValue } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import * as UseFeatureFlagHook from '../useFeatureFlag';
import { Feature } from '.';

describe('<Feature/>', () => {
  const flag = FeatureFlag.WEB_FEATURE_ANNOUNCEMENTS;
  const testId = 'child';

  const defaultProps = {
    children: <x-Child data-testid={testId} />,
    flag,
  };

  const renderComponent = (overrides) =>
    render(<Feature {...defaultProps} {...overrides} />);

  describe('when loading', () => {
    describe('and there is data', () => {
      beforeEach(() => {
        const useFeatureFlag = td.replace(UseFeatureFlagHook, 'useFeatureFlag');

        td.when(useFeatureFlag(flag)).thenReturn({
          data: FeatureFlagValue.ON,
          isLoading: true,
        });
      });

      test('renders children', () => {
        const { queryByTestId } = renderComponent();

        expect(queryByTestId(testId)).not.toBeNull();
      });
    });

    describe('and there is no data', () => {
      beforeEach(() => {
        const useFeatureFlag = td.replace(UseFeatureFlagHook, 'useFeatureFlag');

        td.when(useFeatureFlag(flag)).thenReturn({
          data: undefined,
          isLoading: true,
        });
      });

      test('does not render children', () => {
        const { queryByTestId } = renderComponent();

        expect(queryByTestId(testId)).toBeNull();
      });
    });
  });

  describe('when a flag is enabled', () => {
    beforeEach(() => {
      const useFeatureFlag = td.replace(UseFeatureFlagHook, 'useFeatureFlag');

      td.when(useFeatureFlag(flag)).thenReturn({
        data: FeatureFlagValue.ON,
        error: undefined,
        isLoading: false,
      });
    });

    test('renders children', () => {
      const { getByTestId } = renderComponent();

      expect(getByTestId(testId)).not.toBeNull();
    });
  });

  describe('when a flag is NOT enabled', () => {
    beforeEach(() => {
      const useFeatureFlag = td.replace(UseFeatureFlagHook, 'useFeatureFlag');

      td.when(useFeatureFlag(flag)).thenReturn({
        data: FeatureFlagValue.OFF,
        error: undefined,
        isLoading: false,
      });
    });

    test('does not render children', () => {
      const { queryByTestId } = renderComponent();

      expect(queryByTestId(testId)).toBeNull();
    });
  });
});
