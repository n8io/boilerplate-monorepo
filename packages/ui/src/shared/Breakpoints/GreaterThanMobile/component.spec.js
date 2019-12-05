import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import * as UseMediaQuery from 'shared/useMediaQuery';
import { render } from 'testHelpers';
import { GreaterThanMobile } from '.';

const { anything } = td.matchers;

describe('<GreaterThanMobile/>', () => {
  const mediaQuery = { minWidth: Breakpoint.SMALL };
  const text = 'CHILDREN';
  const defaultProps = {
    children: text,
  };

  const renderComponent = overrides =>
    render(
      <GreaterThanMobile {...defaultProps} {...overrides}></GreaterThanMobile>
    );

  let useMediaQuery = null;

  beforeEach(() => {
    useMediaQuery = td.replace(UseMediaQuery, 'useMediaQuery');
  });

  test('is using the proper media query', () => {
    renderComponent();

    td.verify(useMediaQuery(mediaQuery));
  });

  test('shows children when is GreaterThanMobile', () => {
    td.when(useMediaQuery(anything())).thenReturn(true);

    const { getByText } = renderComponent();

    expect(getByText(text)).not.toBeEmpty();
  });

  test('renders nothing when not GreaterThanMobile', () => {
    td.when(useMediaQuery(anything())).thenReturn(false);

    const { container } = renderComponent();

    expect(container).toBeEmpty();
  });
});
