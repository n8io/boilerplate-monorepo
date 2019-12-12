import React from 'react';
import { render } from 'testHelpers';
import { Avatar } from '.';

describe('<Avatar/>', () => {
  const defaultProps = {
    email: 'test@example.com',
  };

  const renderComponent = overrides =>
    render(<Avatar {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
