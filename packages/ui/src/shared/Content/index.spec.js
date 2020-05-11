import React from 'react';
import { render } from 'testHelpers';
import { Content } from '.';

describe('<Content/>', () => {
  const text = 'CHILDREN';
  const defaultProps = {
    children: text,
  };

  const renderComponent = (overrides) =>
    render(<Content {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
