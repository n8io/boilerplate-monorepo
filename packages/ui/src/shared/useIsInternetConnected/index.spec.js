import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Provider } from 'types/provider';
import { useIsInternetConnected } from '.';

describe('useIsInternetConnected', () => {
  test('should return the expected payload', () => {
    const isInternetConnected = true;
    const context = isInternetConnected;

    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider.INTERNET_CONNECTIVITY value={context}>
        {children}
      </Provider.INTERNET_CONNECTIVITY>
    );

    const { result } = renderHook(() => useIsInternetConnected(), { wrapper });

    expect(result.current).toEqual(isInternetConnected);
  });
});
