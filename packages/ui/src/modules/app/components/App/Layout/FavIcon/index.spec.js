import React from 'react';
import { render } from 'testHelpers';
import { FavIcon } from '.';

describe('<FavIcon/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<FavIcon {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
