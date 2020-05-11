import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import * as UseMediaQuery from 'shared/useMediaQuery';
import { render } from 'testHelpers';
import { Desktop } from '.';

const { anything } = td.matchers;

describe('<Desktop/>', () => {
  const mediaQuery = { minWidth: Breakpoint.LARGE };
  const text = 'CHILDREN';
  const defaultProps = {
    children: text,
  };

  const renderComponent = (overrides) =>
    render(<Desktop {...defaultProps} {...overrides}></Desktop>);

  let useMediaQuery = null;

  beforeEach(() => {
    useMediaQuery = td.replace(UseMediaQuery, 'useMediaQuery');
  });

  // eslint-disable-next-line jest/expect-expect
  test('is using the proper media query', () => {
    renderComponent();

    td.verify(useMediaQuery(mediaQuery));
  });

  test('shows children when is desktop', () => {
    td.when(useMediaQuery(anything())).thenReturn(true);

    const { getByText } = renderComponent();

    expect(getByText(text)).not.toBeEmpty();
  });

  test('renders nothing when not desktop', () => {
    td.when(useMediaQuery(anything())).thenReturn(false);

    const { container } = renderComponent();

    expect(container).toBeEmpty();
  });
});
