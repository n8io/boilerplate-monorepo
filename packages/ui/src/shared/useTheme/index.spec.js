import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Provider } from 'types/provider';
import { useTheme } from '.';

describe('useTheme', () => {
  test('should return the expected payload', () => {
    const theme = { [Theme.PROP_NAME]: DisplayMode.LIGHT };

    const context = {
      clearTheme: jest.fn().mockName('clearTheme'),
      theme,
      updateTheme: jest.fn().mockName('updateTheme'),
    };

    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider.THEME_SWITCHER value={context}>
        {children}
      </Provider.THEME_SWITCHER>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual(context);
  });
});
