import { SkipToDestination } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { render } from 'testHelpers';
import { SkipLink } from '.';

describe('<SkipLink/>', () => {
  const defaultProps = {
    id: SkipToDestination.MAIN,
    text: 'TEXT',
  };

  const renderComponent = overrides =>
    render(<SkipLink {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
