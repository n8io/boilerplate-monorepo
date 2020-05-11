import React from 'react';
import { render } from 'testHelpers';
import { Loader } from '.';

describe('<Loader/>', () => {
  const defaultProps = {
    children: 'CHILDREN',
  };

  const renderComponent = (overrides) =>
    render(<Loader {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders size', () => {
    const size = 100;
    const { container } = renderComponent({ size });

    expect(container.querySelector(`div[size="${size}"]`)).not.toBeEmpty();
  });
});
