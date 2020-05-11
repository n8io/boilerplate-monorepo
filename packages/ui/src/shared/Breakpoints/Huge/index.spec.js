import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import * as UseMediaQuery from 'shared/useMediaQuery';
import { render } from 'testHelpers';
import { Huge } from '.';

const { anything } = td.matchers;

describe('<Huge/>', () => {
  const mediaQuery = { minWidth: Breakpoint.HUGE };
  const text = 'CHILDREN';
  const defaultProps = {
    children: text,
  };

  const renderComponent = (overrides) =>
    render(<Huge {...defaultProps} {...overrides} />);

  let useMediaQuery = null;

  beforeEach(() => {
    useMediaQuery = td.replace(UseMediaQuery, 'useMediaQuery');
  });

  test('is using the proper media query', () => {
    renderComponent();

    td.verify(useMediaQuery(mediaQuery));
  });

  test('shows children when is Huge', () => {
    td.when(useMediaQuery(anything())).thenReturn(true);

    const { getByText } = renderComponent();

    expect(getByText(text)).not.toBeEmpty();
  });

  test('renders nothing when not Huge', () => {
    td.when(useMediaQuery(anything())).thenReturn(false);

    const { container } = renderComponent();

    expect(container).toBeEmpty();
  });
});
