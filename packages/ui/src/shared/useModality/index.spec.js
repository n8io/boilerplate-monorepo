import { Modality } from '@boilerplate-monorepo/ui-common';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Provider } from 'types/provider';
import { useModality } from '.';

describe('useModality', () => {
  test('should return the expected payload', () => {
    const modality = Modality.KEYBOARD;

    const context = {
      isEnabled: Boolean(modality),
      modality,
      update: jest.fn().mockName('update'),
    };

    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider.MODALITY value={context}>{children}</Provider.MODALITY>
    );

    const { result } = renderHook(() => useModality(), { wrapper });

    expect(result.current).toEqual(context);
  });
});
