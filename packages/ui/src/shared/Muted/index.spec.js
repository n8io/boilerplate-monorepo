import React from 'react';
import { render } from 'testHelpers';
import { Muted } from '.';

describe('<Muted/>', () => {
  const defaultProps = {
    children: 'CHILDREN',
  };

  const renderComponent = overrides =>
    render(<Muted {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
