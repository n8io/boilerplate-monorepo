import React from 'react';
import { render } from 'testHelpers';
import { Page } from '.';

describe('<Page/>', () => {
  const defaultProps = {
    children: <x-child />,
  };

  const renderComponent = overrides =>
    render(<Page {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
