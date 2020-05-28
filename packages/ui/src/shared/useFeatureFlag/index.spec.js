import { FeatureFlag } from '@boilerplate-monorepo/common';
import { SplitContext } from '@splitsoftware/splitio-react';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { useFeatureFlag } from '.';

describe('useFeatureFlag', () => {
  const flag = FeatureFlag.WEB_FEATURE_ANNOUNCEMENTS;
  const options = { option: 'OPTION' };

  const defaultContext = {
    client: {
      getTreatment: jest.fn().mockName('getTreatment'),
    },
    isReady: false,
    isTimedout: false,
  };

  const defaultPayload = {
    data: undefined,
    error: undefined,
    isLoading: true,
  };

  let useContext = null;

  beforeEach(() => {
    useContext = td.replace(React, 'useContext');
  });

  describe('on initial load', () => {
    test('should return the expected payload', () => {
      td.when(useContext(SplitContext)).thenReturn(defaultContext);

      const { result } = renderHook(() => useFeatureFlag(flag, options));

      expect(result.current).toEqual(defaultPayload);
    });
  });

  describe('when sdk is ready', () => {
    const isReady = true;

    test('should return the expected payload', async () => {
      td.when(useContext(SplitContext)).thenReturn({
        ...defaultContext,
        isReady,
      });

      const { result } = renderHook(() => useFeatureFlag(flag, options));

      await act(() => Promise.resolve());

      expect(result.current).toEqual({ ...defaultPayload, isLoading: false });
    });

    describe('and the flag data is returned', () => {
      const data = 'DATA';

      const client = {
        getTreatment: () => Promise.resolve(data),
      };

      test('should return the expected payload', async () => {
        td.when(useContext(SplitContext)).thenReturn({
          ...defaultContext,
          client,
          isReady,
        });

        const { result } = renderHook(() => useFeatureFlag(flag, options));

        await act(() => Promise.resolve());

        expect(result.current).toEqual({
          ...defaultPayload,
          data,
          isLoading: false,
        });
      });
    });

    describe('and times out', () => {
      const isTimedout = true;

      test('should return the expected payload', async () => {
        td.when(useContext(SplitContext)).thenReturn({
          ...defaultContext,
          isReady,
          isTimedout,
        });

        const { result } = renderHook(() => useFeatureFlag(flag, options));

        await act(() => Promise.resolve());

        expect(result.current).toEqual({
          ...defaultPayload,
          error: new Error('SplitIO connection timed out'),
          isLoading: false,
        });
      });
    });
  });
});
