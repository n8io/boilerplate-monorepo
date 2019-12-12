import React from 'react';
import * as UseMediaQuery from 'shared/useMediaQuery';
import { render } from 'testHelpers';
import { Default } from '.';

const { anything } = td.matchers;

describe('<Default/>', () => {
  const mediaQuery = { minWidth: 0 };
  const text = 'CHILDREN';
  const defaultProps = {
    children: text,
  };

  const renderComponent = overrides =>
    render(<Default {...defaultProps} {...overrides}></Default>);

  let useMediaQuery = null;

  beforeEach(() => {
    useMediaQuery = td.replace(UseMediaQuery, 'useMediaQuery');
  });

  test('is using the proper media query', () => {
    renderComponent();

    td.verify(useMediaQuery(mediaQuery));
  });

  test('shows children when is Default', () => {
    td.when(useMediaQuery(anything())).thenReturn(true);

    const { getByText } = renderComponent();

    expect(getByText(text)).not.toBeEmpty();
  });

  test('renders nothing when not Default', () => {
    td.when(useMediaQuery(anything())).thenReturn(false);

    const { container } = renderComponent();

    expect(container).toBeEmpty();
  });
});
